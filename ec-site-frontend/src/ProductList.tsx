import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface User {
    id: number;
    username: string;
    cartItems: number[]; // 商品IDのリスト
}

// ProductListの型定義
export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    //初回のみ実行:ローカルストレージからお気に入りを復元
    useEffect((): void => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            const parsedFavorites = JSON.parse(storedFavorites);
            setFavorites(parsedFavorites);
        }
    }, []);

    // お気に入りの追加・削除
    const handleToggleFavorite = (productId: number): void => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.includes(productId)
                ? prevFavorites.filter((id) => id !== productId)
                : [...prevFavorites, productId];

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            return updatedFavorites;
        });
    };

    // 商品一覧を取得
    useEffect((): void => {
        fetch("http://localhost:8080/api/products")
            .then((response) => response.json())
            .then((data: Product[]) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    // ユーザー情報を取得
    useEffect((): void => {
        fetch("http://localhost:8080/api/user/current")
            .then((response) => response.json())
            .then((data: User) => setUser(data))
            .catch((error) => console.error("Error fetching user:", error));
    }, []);

    // カートから削除する関数
    const handleRemoveFromCart = (userId: number, productId: number): void => {
        if (!userId) {
            alert("ユーザー情報が取得できていません。");
            return;
        }
        fetch(
            `http://localhost:8080/api/products/${productId}/remove-from-cart`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            }
        )
            .then((response) => {
                if (response.ok && user) {
                    setUser({
                        ...user,
                        cartItems: user.cartItems.filter(
                            (item) => item !== productId
                        ),
                    });
                } else {
                    alert("エラーが発生しました。");
                }
            })
            .catch((error) =>
                console.error("Error removing from cart:", error)
            );
    };

    // カートに追加する関数
    const handleAddToCart = (userId: number, productId: number): void => {
        if (!userId) {
            alert("ユーザー情報が取得できていません。");
            return;
        }
        fetch(`http://localhost:8080/api/products/${productId}/add-to-cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        })
            .then((response) => {
                if (response.ok && user) {
                    setUser({
                        ...user,
                        cartItems: [...user.cartItems, productId],
                    });
                } else {
                    alert("エラーが発生しました。");
                }
            })
            .catch((error) => console.error("Error adding to cart:", error));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>商品一覧</h1>
            {user && <h2>ログインユーザー: {user.username}</h2>}

            {/* カート画面へのリンク */}
            <Link to="/cart">
                <button
                    style={{
                        marginBottom: "20px",
                        padding: "10px",
                        backgroundColor: "orange",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    カートを確認する
                </button>
            </Link>
            <Link to="okini">お気に入り一覧</Link>

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
                                    onClick={() =>
                                        alert(`詳細ページは未実装です`)
                                    }
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
                                    onClick={() => {
                                        if (!user) {
                                            alert(
                                                "ユーザー情報が取得できていません。"
                                            );
                                            return;
                                        }

                                        isInCart
                                            ? handleRemoveFromCart(
                                                  user.id,
                                                  product.id
                                              )
                                            : handleAddToCart(
                                                  user.id,
                                                  product.id
                                              );
                                    }}
                                    style={{
                                        padding: "5px 10px",
                                        backgroundColor: isInCart
                                            ? "red"
                                            : "green",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {isInCart
                                        ? "カートから削除"
                                        : "カートに追加"}
                                </button>
                                <button
                                    onClick={() =>
                                        handleToggleFavorite(product.id)
                                    }
                                    style={{
                                        padding: "5px 10px",
                                        backgroundColor: favorites.includes(
                                            product.id
                                        )
                                            ? "black"
                                            : "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {favorites.includes(product.id)
                                        ? "★ お気に入り解除"
                                        : "☆ お気に入りに追加"}
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
