import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import CartScreen from "./CartScreen";
import FavoriteList from "./FavoriteList"; // ← 追加

function App() {
  const [favorites, setFavorites] = useState([]); // お気に入りの状態を管理

  return (
    <Router>
      <Routes>
        {/* 商品一覧ページ */}
        <Route path="/" element={<ProductList favorites={favorites} setFavorites={setFavorites} />} />
        {/* カート画面 */}
        <Route path="/cart" element={<CartScreen />} />
        {/* お気に入りリスト画面 */}
        <Route path="/favorites" element={<FavoriteList favorites={favorites} />} />
      </Routes>
    </Router>
  );
}

export default App;
