import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coinsApi = createApi({
  reducerPath: "coinsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: ({ perPage, pageNum }) =>
        `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${pageNum}&sparkline=false`,
    }),
    getCoin: builder.query({
      query: (coinId) => `/coins/${coinId}`,
    }),
    getCoinChart: builder.query({
      query: (coinId) =>
        `coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`,
    }),
  }),
});

export const { useGetCoinsQuery, useGetCoinChartQuery, useGetCoinQuery } = coinsApi;
