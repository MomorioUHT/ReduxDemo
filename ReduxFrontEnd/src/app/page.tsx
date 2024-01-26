import { useProductsQuery, useAddProductMutation, useDeleteProductMutation } from "./Api"
import { useState } from "react";

export const Test1 = () => {

    const { data, error, isLoading, isFetching, isSuccess } = useProductsQuery();

    const [addProduct] = useAddProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const { refetch } = useProductsQuery();

    const [currProductName, setCurrProductName] = useState('')
    const [currProductPrice, setCurrProductPrice] = useState(0)

    const product = {
        "ProductName": currProductName,
        "ProductPrice": currProductPrice, 
     }
 
     const buttonAddProduct = async() => {
         await addProduct(product);
         refetch();
     }

     const buttonDeleteProduct = async() => {
        await deleteProduct(currProductName);
        refetch();
    }

    return (        
        <div>
            <h1>DATA</h1>
            {isLoading && <h2>...Loading</h2>}
            {error && <h2>Something went wrong</h2>}
            {isFetching && <h2>...Fetching</h2>}
            {isSuccess && (
                <div>
                    {data.map(product => {
                        return <div key={product.ProductName}>
                            <span>{product.ProductName} {product.ProductPrice}</span>
                        </div>
                    })}
                </div>
            )
            }
            <br/>
            <span>------------------</span><br/>
            <input placeholder="Add Product Name" onChange={(e) => {setCurrProductName(String(e.target.value))}}></input><br />
            <input placeholder="Add Product Price" onChange={(e) => {setCurrProductPrice(Number(e.target.value))}}></input><br />
            <button onClick={buttonAddProduct}>Add Product</button><br /><br />
            <span>------------------</span><br/>
            <input placeholder="Delete Product" onChange={(e) => {setCurrProductName(String(e.target.value))}}></input><br />
            <button onClick={buttonDeleteProduct}>Delete Product</button><br />
        </div>
    )
}
