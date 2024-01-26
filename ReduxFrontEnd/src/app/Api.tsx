import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Product } from "./hook";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/"}),
    endpoints: (builder) => ({
        Products: builder.query<Product[], void>({
            query: () => "products",
        }),
        GetSpecificProducts: builder.query<Product, string>({
            query: (product) => `products/${product}`,
        }),
        addProduct: builder.mutation<void, Product>({
            query: (product) => ({
                url: '/addproduct',
                method: "POST",
                body: product
            })
        }),
        updateProduct: builder.mutation<void, Product>({
            query: ({ProductName, ...rest}) => ({
                url: `products/${ProductName}`,
                method: 'PUT',
                body: rest
            })
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (ProductName) => ({
                url: `/deleteproduct`,
                method: 'POST',
                body: {
                    ProductName: ProductName
                }
            })
        })
    })
})

export const { 
    useProductsQuery, 
    useGetSpecificProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;