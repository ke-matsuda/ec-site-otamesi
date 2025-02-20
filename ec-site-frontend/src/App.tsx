import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductList } from "./ProductList";
import { CartScreen } from "./CartScreen";

function App() {
    return (
        <Router>
            <Routes>
                {/* 商品一覧ページ */}
                <Route path="/" element={<ProductList />} />

                {/* カート画面 */}
                <Route path="/cart" element={<CartScreen />} />
                {/* お気に入りリスト画面 */}
                {/* 作り直す */}
            </Routes>
        </Router>
    );
}

export default App;
