import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import useAllProducts from "../../../../Hooks/useAllProducts/useAllProducts";
import { useReactTable } from "@tanstack/react-table";



const AdminAllProducts = () => {

    // hooks and custom hooks
    const { allProductsPending, allProducts, refetch } = useAllProducts();


    const columns = [
        {
            accessorKey: "productName",
            header: "Product Name"
        },
        {
            accessorKey: "photo",
            header: "Image"
        },
        {
            accessorKey: "",
            header: "Action"
        }
    ]


    // tanstack table
    const table = useReactTable({
        allProducts,
        columns
    })



    // coditional loading
    if (allProductsPending) {
        return <LoadingAnimation />
    }


    console.log(allProducts)




    return (
        <div>
            <h2 className="font-heading text-5xl">All products</h2>
        </div>
    );
};

export default AdminAllProducts;