import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
    id: number;
    username: string;
    cartItems: number[];
}

// interface Product {
//     productId: number;
//     productName: string;
//     quantity: number;
//     description: string;
//     price: number;
//     image: string;
// }

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface CartItem {
    userId: number;
    quantity: number;
    product: Product;
    productId: number;
}

export const CartScreen: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect((): void => {
        fetch("http://localhost:8080/api/user/cartitems")
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setCartItems(data);
                console.log(cartItems, data);
            })
            .catch((error) => console.error("Error fetching user:", error));
    }, []);

    const handleRemoveFromCart = (productId: number): void => {
        if (!user) {
            alert("ユーザー情報が取得できていません。");
            return;
        }
        if (!cartItems) {
            alert("カート情報が取得できていません。");
            return;
        }
        const userId: number = user.id;

        fetch(
            `http://localhost:8080/api/cart/${productId}/remove-product/${userId}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.ok) {
                    alert("商品がカートから削除されました！");
                    setCartItems(
                        cartItems.filter((item) => item.productId !== productId)
                    );
                } else {
                    alert("エラーが発生しました。");
                }
            })
            .catch((error) =>
                console.error("Error removing from cart:", error)
            );
    };

    const handleUpdateQuantity = (
        productId: number,
        newQuantity: number
    ): void => {
        if (!user) return;

        fetch(`http://localhost:8080/api/cart/${productId}/update-quantity`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                quantity: newQuantity,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    setCartItems(
                        cartItems.map((item) =>
                            item.productId === productId
                                ? { ...item, quantity: newQuantity }
                                : item
                        )
                    );
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
                        <li key={item.productId}>
                            <h3>{item.product.name}</h3>
                            {item.quantity === 1 ? (
                                <button
                                    onClick={() =>
                                        handleRemoveFromCart(item.productId)
                                    }
                                >
                                    🗑️
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        handleUpdateQuantity(
                                            item.productId,
                                            item.quantity - 1
                                        )
                                    }
                                >
                                    −
                                </button>
                            )}
                            数量 {item.quantity}
                            <button
                                onClick={() =>
                                    handleUpdateQuantity(
                                        item.productId,
                                        item.quantity + 1
                                    )
                                }
                            >
                                ＋
                            </button>
                            <br />
                            <br />
                            <a
                                onClick={() =>
                                    handleRemoveFromCart(item.productId)
                                }
                            >
                                削除
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
