import { useMemo } from "react";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import useAllProducts from "../../../../Hooks/useAllProducts/useAllProducts";
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";



const AdminAllProducts = () => {

    // hooks and custom hooks
    const { allProductsPending, allProducts, refetch } = useAllProducts();
    const axiosSecure = useAxiosSecure();


    const columns = [
        {
            accessorKey: "",
            header: "#",
            cell: row => <p>{row.row.index + 1}</p>
        },
        {
            accessorKey: "_id",
            header: "ID"
        },
        {
            accessorKey: "productName",
            header: "Product"
        },
        {
            accessorKey: "photo",
            header: "Image",
            cell: row => <div className="flex max-w-fit justify-center items-center">
                <img src={row.row.original.photo} alt="product image" className="w-full lg:w-2/6" />
            </div>
        },
        {
            accessorKey: "",
            header: "Update",
            cell: row => <Link to={`updateProduct/${row.row.original._id}`}><button className="bg-main px-2 py-1 hover:bg-sub duration-300 text-[14px] rounded-[2px] text-white font-medium">Update</button></Link>
        },
        {
            accessorKey: "",
            header: "Delete",
            cell: row => <button className="bg-sub px-2 py-1 hover:bg-main duration-300 text-[14px] rounded-[2px] text-white font-medium"
                onClick={() => handleProductDelete(row.row.original._id)}
            >Delete</button>
        },
    ]


    // get the data
    const data = useMemo(() => allProducts ?? [], [allProducts]); // '??' - this is called a coalescing operator. Where, if allProducts is null or undefined then the default value will be []. And if allProducts is availbe the value will be it. I can use ternary opeator also insteady of coalescing operator.



    // tanstack table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })



    // delete a product from all prodcut collection
    const handleProductDelete = id => {
        console.log(id)
        axiosSecure.delete(`/deleteproduct/${id}`)
            .then(res => {
                const data = res.data;
                if (data) {
                    refetch();
                }
            })
            .catch(err => {
                console.log(err.code + "||" + err.message)
            })
    }





    // coditional loading
    if (allProductsPending) {
        return <LoadingAnimation />
    }





    return (
        <div className="lg:min-h-[100vh] p-5 flex flex-col container mx-auto gap-8 justify-start items-center">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main  uppercase">All products</h2>

            {/* table to show all the products */}
            <div className="w-full mt-10">
                <table>
                    <thead>
                        {
                            table.getHeaderGroups().map((headerGroup, index) =>
                                <tr key={index} className="table-row">
                                    {headerGroup.headers.map(header =>
                                        <th key={header?.id} className="table-description text-sub">
                                            {
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </th>)}
                                </tr>
                            )}
                    </thead>

                    <tbody>
                        {
                            table.getRowModel().rows.map((row, index) =>
                                <tr key={index} className="table-row">
                                    {
                                        row.getVisibleCells().map((cell, index) =>
                                            <td key={index} className="text-center table-description">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>)
                                    }
                                </tr>)
                        }
                    </tbody>
                </table>

                {/* pagination buttons */}
                <div className="w-full flex justify-between items-center gap-10 mt-5 font-body font-semibold">
                    <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}
                        className="hover:text-sub duration-300 disabled:text-gray"
                    >Previous</button>
                    <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}
                        className="hover:text-sub duration-300 disabled:text-gray">Next</button>
                </div>
            </div>
        </div>
    );
};


export default AdminAllProducts;