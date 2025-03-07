import { error } from "console";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductList } from "./ProductList";

interface User {
    id: number;
    username: string;
    cartItems: number[];
}

interface Product {
    productId: number;
    productName: string;
    quantity: number;
    description: string;
    price: number;
    image: string;
    id: number;
    name: string;
}

export const OkiniScreen: React.FC = () => {
    const [products, setProduct] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [favorites, setFavorites] = useState<number[]>(() => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    //お気に入りのPIDをもとに商品の情報を取得するAPIが必要か？
    //↑だと面倒だから一旦全部取得して条件に合うものを表示する

    useEffect((): void => {
        fetch("http://localhost:8080/api/products")
            .then((respons) => respons.json())
            .then((data: Product[]) => setProduct(data))
            .catch((error) => console.error("商品の取得でエラー", error));
    }, []);

    const handleRemoveOkini = (ProductID: Number): void => {
        const updatedOkini = favorites.filter((id) => id != ProductID);
        setFavorites(updatedOkini);
        localStorage.setItem("favorites", JSON.stringify(updatedOkini));
    };

    const handleAllRemoveFavorites = (): void => {
        localStorage.removeItem("favorites");
        setFavorites([]);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>お気に入り一覧</h1>
            <Link to="/">
                <button>戻る</button>
            </Link>
            <button onClick={() => alert("まだ")}>
                まとめてカートに入れる
            </button>
            <button onClick={() => handleAllRemoveFavorites()}>
                お気に入りをまとめて削除
            </button>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {products
                    .filter((product) => favorites.includes(product.id)) // お気に入りに登録された商品のみを表示
                    .map((product) => (
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
                                <h3>
                                    {product.name}:{product.price}円
                                </h3>
                                {/* <p>{product.price}円</p> */}
                            </div>

                            <button
                                onClick={() => handleRemoveOkini(product.id)}
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: "black",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                ★ お気に入り解除
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
