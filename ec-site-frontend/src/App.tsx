import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import CartScreen from "./CartScreen";
// import FavoriteList from "./FavoriteList";

// 商品の型
// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// }

// // ユーザーの型
// interface User {
//   id: number;
//   username: string;
//   cartItems: number[]; // 商品IDのリスト
// }

function App() {
	// const [favorites, setFavorites] = useState<number[]>([]);
	// const [products, setProducts] = useState<Product[]>([]);
	

	return (
		<Router>
			<Routes>
				{/* 商品一覧ページ */}
				{/* <Route path="/" /> */}
				{/* <Route path="/" element={<ProductList favorites={favorites} setFavorites={setFavorites} />} /> */}

				<Route path="/" element={<ProductList />} />

				{/* カート画面 */}
				<Route path="/cart" element={<CartScreen />} />
				{/* お気に入りリスト画面 */}
				{/* <Route path="/favorites" element={<FavoriteList products={products} favorites={favorites} />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
