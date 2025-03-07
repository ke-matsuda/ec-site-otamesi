import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
    cartItems: number[];
    productsInCart: Product[];
}

// ProductListの型定義
export const ProductList: React.FC = () => {
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

    const queryClient = useQueryClient();
    //商品の一覧を取得する
    const {
        data: products,
        isLoading: isProductsLoading,
        isError: isProductsError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch("http://localhost:8080/api/products");
            if (!res.ok) throw new Error("商品一覧の取得に失敗しました");
            console.log(res);
            return res.json();
        },
    });
    //ユーザー情報、カートに何を入れているかの情報を取得する。
    const {
        data: user,
        isLoading: isUserLaoding,
        isError: isUserError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await fetch("http://localhost:8080/api/user/current");
            if (!res.ok) throw new Error("user no get sippai...");
            return res.json();
        },
    });

    //商品をカートに追加する
    const addToCartMutation = useMutation({
        mutationFn: async (productId: number) => {
            await fetch(`http://localhost:8080/api/cart/${productId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?.id }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);
        },
    });

    //非推奨の書き方
    // const addToCartMutation = useMutation({
    //     mutationFn:  (productId: number) => {
    //         return fetch("http://localhost:8080/api/cart/${productId}", {
    //             method: "POST",
    //             headers: { "Content-Type": "aplication/json" },
    //             body: JSON.stringify({ userId: user?.id }),
    //         });
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(["user"]);
    //     },
    // });

    //商品をカートから削除する
    const removeFromCartMutation = useMutation({
        mutationFn: async (productId: number) => {
            await fetch(
                `http://localhost:8080/api/cart/${productId}/remove-product/${user?.id}`,
                {
                    method: "DELETE",
                }
            );
        },
        onSuccess: () => queryClient.invalidateQueries(["user"]),
    });

    //ローディングとエラー処理
    if (isProductsLoading || isUserLaoding) return <p>読込中...</p>;
    if (isProductsError || isUserError) return <p>読み込みに失敗(泣)</p>;

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
                {products.map((product: Product) => {
                    //const isInCart = user?.cartItems?.includes(product.id);
                    const isInCart = user?.productsInCart.some(
                        (item: any) => item.id === product.id
                    );

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
                                            ? removeFromCartMutation.mutate(
                                                  product.id
                                              )
                                            : addToCartMutation.mutate(
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

//メモ
// 商品一覧を取得
// useEffect((): void => {
//     fetch("http://localhost:8080/api/products")
//         .then((response) => response.json())
//         .then((data: Product[]) => setProducts(data))
//         .catch((error) => console.error("Error fetching products:", error));
// }, []);

// ユーザー情報を取得
// useEffect((): void => {
//     fetch("http://localhost:8080/api/user/current")
//         .then((response) => response.json())
//         .then((data: User) => setUser(data))
//         .catch((error) => console.error("Error fetching user:", error));
// }, []);

// カートから削除する関数
// const handleRemoveFromCart = (userId: number, productId: number): void => {
//     if (!userId) {
//         alert("ユーザー情報が取得できていません。");
//         return;
//     }
//     fetch(
//         `http://localhost:8080/api/cart/${productId}/remove-product/${userId}`,
//         {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//         }
//     )
//         .then((response) => {
//             if (response.ok && user) {
//                 setUser({
//                     ...user,
//                     cartItems: user.cartItems.filter(
//                         (item) => item !== productId
//                     ),
//                 });
//             } else {
//                 alert("エラーが発生しました。");
//             }
//         })
//         .catch((error) =>
//             console.error("Error removing from cart:", error)
//         );
// };

// カートに追加する関数
// const handleAddToCart = (userId: number, productId: number): void => {
//     if (!userId) {
//         alert("ユーザー情報が取得できていません。");
//         return;
//     }
//     fetch(`http://localhost:8080/api/cart/${productId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//     })
//         .then((response) => {
//             if (response.ok && user) {
//                 setUser({
//                     ...user,
//                     cartItems: [...user.cartItems, productId],
//                 });
//             } else {
//                 alert("エラーが発生しました。");
//             }
//         })
//         .catch((error) => console.error("Error adding to cart:", error));
// };
