import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
	const [products, setProducts] = useState([]);
	const [user, setUser] = useState(null); // ユーザー情報を保持
	const [favorites, setFavorites] = useState([]);


	useEffect(() => {
		fetch("http://localhost:8080/api/products")
			.then((response) => response.json())
			.then((data) => setProducts(data))
			.catch((error) => console.error("Error fetching products:", error));
	}, []);

	useEffect(() => {
		fetch("http://localhost:8080/api/user/current")
			.then((response) => response.json())
			.then((data) => setUser(data))
			.catch((error) => console.error("Error fetching user:", error));
	}, []);

	const handleRemoveFromCart = (userId, productId) => {
		if (!userId) {
			alert("ユーザー情報が取得できていません。");
			return;
		}
		fetch(`http://localhost:8080/api/products/${productId}/remove-from-cart`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId })
		})
			.then((response) => {
				if (response.ok) {
//					alert("商品がカートから削除されました！");
					setUser({ ...user, cartItems: user.cartItems.filter(item => item !== productId) }); // ここで即時更新！

					//window.location.reload();
				} else {
					alert("エラーが発生しました。");
				}
			})
			.catch((error) => console.error("Error removing from cart:", error));
	};

	const handleAddToCart = (userId, productId) => {
		if (!userId) {
			alert("ユーザー情報が取得できていません。");
			return;
		}
		fetch(`http://localhost:8080/api/products/${productId}/add-to-cart`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId })
		})
			.then((response) => {
				if (response.ok) {
//					alert("商品がカートに追加されました！");
					setUser({ ...user, cartItems: [...user.cartItems, productId] }); 

//					window.location.reload();
				} else {
					alert("エラーが発生しました。");
				}
			})
			.catch((error) => console.error("Error adding to cart:", error));
	};
	
	const handleToggleFavorite = (productId) => {
	  if (favorites.includes(productId)) {
	    setFavorites(favorites.filter(id => id !== productId)); // 削除
	  } else {
	    setFavorites([...favorites, productId]); // 追加
	  }
	};


	return (
		<div style={{ padding: "20px" }}>
			<h1>商品一覧</h1>
			{user && <h2>ログインユーザー: {user.username}</h2>}

			{/* カート画面へのリンク */}
			<Link to="/cart">
				<button style={{ marginBottom: "20px", padding: "10px", backgroundColor: "orange", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
					カートを確認する
				</button>
			</Link>

			

			<ul style={{ listStyle: "none", padding: 0 }}>
				{products.map((product) => {
					const isInCart = user?.cartItems?.includes(product.id);

					return (
						<li
							key={product.id}
							style={{
								border: "1px solid #ddd",
								borderRadius: "8px",
								padding: "10px",
								margin: "10px 0",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<div>
								<h2>{product.name}</h2>
								<p>{product.description}</p>
								<p>{product.price}円</p>
							</div>
							<div>
								<img
									src={product.image}
									alt={product.name}
									style={{
										width: "150px",
										height: "150px",
										objectFit: "cover",
										borderRadius: "4px",
									}}
								/>
							</div>
							<div>
								<button
									onClick={() => alert(`詳細ページは未実装です`)}
									style={{
										marginRight: "10px",
										padding: "5px 10px",
										backgroundColor: "blue",
										color: "white",
										border: "none",
										borderRadius: "4px",
										cursor: "pointer",
									}}
								>
									詳細
								</button>
								<button
									onClick={() =>
										isInCart
											? handleRemoveFromCart(user.id, product.id)
											: handleAddToCart(user.id, product.id)
									}
									style={{
										padding: "5px 10px",
										backgroundColor: isInCart ? "red" : "green",
										color: "white",
										border: "none",
										borderRadius: "4px",
										cursor: "pointer",
									}}
								>
									{isInCart ? "カートから削除" : "カートに追加"}
								</button>
								<button onClick={() => handleToggleFavorite(product.id)}
								style={{
																		padding: "5px 10px",
																		backgroundColor: favorites.includes(product.id) ? "black" : "red",
																		color: "white",
																		border: "none",
																		borderRadius: "4px",
																		cursor: "pointer",
																	}}>
								  {favorites.includes(product.id) ? "お気に入りから削除" : "お気に入りに追加"}
								</button>

							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ProductList;
