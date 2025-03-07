import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductList } from "./ProductList";
import { CartScreen } from "./CartScreen";
import { OkiniScreen } from "./OkiniScreen";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* 商品一覧ページ */}
                    <Route path="/" element={<ProductList />} />
                    {/* カート画面 */}
                    <Route path="/cart" element={<CartScreen />} />
                    {/* お気に入りリスト画面 */}
                    <Route path="/okini" element={<OkiniScreen />} />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
