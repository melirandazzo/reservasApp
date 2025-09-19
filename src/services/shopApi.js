import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rtbdBaseUrl = process.env.EXPO_PUBLIC_RTDB_URL

export const shopApi = createApi({
    reducerPath:"shopApi",
    baseQuery: fetchBaseQuery({baseUrl:rtbdBaseUrl}),
    endpoints:(builder)=>({
        getCategories: builder.query({query:()=>'categories.json'}),
        getProductsByCategory: builder.query({
            query:(category)=>`products.json?orderBy="category_id"&equalTo=${category}`,
            transformResponse: (response) => {
            return Object.values(response)
            }
        })
        ,
        getReservationsByProduct: builder.query({
            query: (productId) => `reservations.json?orderBy="productId"&equalTo="${productId}"`,
            transformResponse: (response) => {
                if (!response) return []
                return Object.values(response)
            }
        })
    })
})

export const {useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetReservationsByProductQuery } = shopApi