import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CartScreen() {
	const [cartItems, setCartItems] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch("http://localhost:8080/api/user/cartitems")
			.then((response) => response.json())
			.then((data) => {
				setUser(data);
				setCartItems(data.cartItems);
			})
			.catch((error) => console.error("Error fetching user:", error));
	}, []);

	const handleRemoveFromCart = (productId) => {
		fetch(`http://localhost:8080/api/products/${productId}/remove-from-cart`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: user.id })
		})
			.then((response) => {
				if (response.ok) {
					alert("商品がカートから削除されました！");
					setCartItems(cartItems.filter(item => item.productId !== productId));
				} else {
					alert("エラーが発生しました。");
				}
			})
			.catch((error) => console.error("Error removing from cart:", error));
	};

	const handleUpdateQuantity = (productId, newQuantity) => {
		if (!user) return;

		fetch(`http://localhost:8080/api/products/${productId}/update-quantity`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: user.id, quantity: newQuantity })
		})
			.then((response) => {
				if (response.ok) {
					setCartItems(cartItems.map(item =>
						item.productId === productId
							? { ...item, quantity: newQuantity }  
							: item  
					));
				} else {
					alert("数量の更新に失敗しました");
					window.location.reload();

				}
			})
			.catch((error) => console.error("Error updating quantity:", error));
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>カートの中身</h1>
			<Link to="/">
				<button>戻る</button>
			</Link>

			{cartItems.length === 0 ? (
				<p>カートは空です</p>
			) : (
				<ul>
					{cartItems.map((item) => (
						<li key={item}>
							<h3> {item.productName}</h3>
							{item.quantity === 1 ? (
								<button onClick={() => handleRemoveFromCart(item.productId)}>🗑️</button>
							) : (
								<button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>−</button>
							)}
							数量 {item.quantity}
							<button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>＋</button>
							<br /><br /><a onClick={() => handleRemoveFromCart(item.productId)}>削除</a>

						</li>
					))}
				</ul>
			)}
		</div>
	);
}



export default CartScreen;
