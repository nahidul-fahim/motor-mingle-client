import { useMemo } from "react";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import useAllProducts from "../../../../Hooks/useAllProducts/useAllProducts";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";



const AdminAllProducts = () => {

    // hooks and custom hooks
    const { allProductsPending, allProducts, refetch } = useAllProducts();


    const columns = [
        {
            accessorKey: "_id",
            header: "ID"
        },
        {
            accessorKey: "productName",
            header: "Product Name"
        },
        {
            accessorKey: "photo",
            header: "Image",
            cell: row => <div className="flex w-full justify-center items-center">
                <img src={row.row.original.photo} alt="product image" className="w-2/6" />
            </div>
        },
        {
            accessorKey: "",
            header: "Update",
            cell: row => <button className="bg-main px-2 py-1 text-[14px] rounded-[5px] text-white"
                onClick={() => console.log(row.row.original._id)}
            >Update</button>
        },
        {
            accessorKey: "",
            header: "Delete",
            cell: row => <button className="bg-main px-2 py-1 text-[14px] rounded-[5px] text-white"
                onClick={() => console.log(row.row.original._id)}
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
    })



    // coditional loading
    if (allProductsPending) {
        return <LoadingAnimation />
    }

    // const headerGroups = table.getHeaderGroups()[0];
    // console.log(headerGroups)

    // const rowsModels = table.getRowModel()
    // console.log(rowsModels)


    return (
        <div className="lg:min-h-[100vh] p-5 flex flex-col container mx-auto gap-8 justify-start items-center">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main  uppercase">All products</h2>

            {/* table to show all the products */}
            <div className="w-full">
                <table>
                    <thead>
                        {
                            table.getHeaderGroups().map((headerGroup, index) =>
                                <tr key={index}>
                                    {headerGroup.headers.map(header =>
                                        <th key={header?.id}>
                                            {
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </th>)}
                                </tr>)
                        }
                    </thead>

                    <tbody>
                        {
                            table.getRowModel().rows.map((row, index) =>
                                <tr key={index}>
                                    {
                                        row.getVisibleCells().map((cell, index) =>
                                            <td key={index}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>)
                                    }
                                </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};


export default AdminAllProducts;