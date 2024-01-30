import { useMemo } from "react";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import useAllListings from "../../../../Hooks/useAllListings/useAllListings";



const AdminAllProducts = () => {

    // hooks and custom hooks
    const { allListingsPending, allListings } = useAllListings();


    const columns = [
        {
            accessorKey: "",
            header: "#",
            cell: row => <p>{row.row.index + 1}</p>
        },
        {
            accessorKey: "carName",
            header: "Car name"
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: row => <div className="flex w-full justify-center items-center">
                <p className="font-semibold text-[#0f0f0f] capitalize rounded-md text-center">${row.row.original.price}</p>
            </div>
        },
        {
            accessorKey: "addingDate",
            header: "Added on"
        },
        {
            accessorKey: "sellerName",
            header: "Seller Name"
        },
        {
            accessorKey: "sellerEmail",
            header: "Seller Email"
        },
        {
            accessorKey: "sellerPhoto",
            header: "Seller",
            cell: row => <div className="flex max-w-fit justify-center items-center">
                <img src={row.row.original.sellerPhoto} alt="product image" className="w-[70px] h-[70px] rounded-[50%]" />
            </div>
        },
        {
            accessorKey: "totalBids",
            header: "Total bids",
            cell: row => <div className="flex w-full justify-center items-center">
                <p className="font-semibold text-xl text-[#000000] capitalize rounded-md text-center">{row.row.original.totalBids || "-"}</p>
            </div>
        },
        {
            accessorKey: "sellStatus",
            header: "Sell status",
            cell: row => <div className="flex w-full justify-center items-center">
                <p className="text-[18px] font-semibold text-[#ff4141] capitalize px-2 py-1 rounded-md bg-[#dddddd] text-center">{row.row.original.sellStatus}</p>
            </div>
        }
    ]


    // get the data
    const data = useMemo(() => allListings ?? [], [allListings]); // '??' - this is called a coalescing operator. Where, if allListings is null or undefined then the default value will be []. And if allListings is availbe the value will be it. I can use ternary opeator also insteady of coalescing operator.



    // tanStack table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })



    // conditional loading
    if (allListingsPending) {
        return <LoadingAnimation />
    }



    return (
        <div className="lg:min-h-[100vh] p-5 flex flex-col container mx-auto gap-8 justify-start items-center">
            <h2 className="text-center text-4xl md:text-5xl font-bold text-main capitalize">All products</h2>

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