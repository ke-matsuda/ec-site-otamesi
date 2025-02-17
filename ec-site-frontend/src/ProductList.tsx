import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 商品の型
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// ユーザーの型
interface User {
  id: number;
  username: string;
  cartItems: number[]; // 商品IDのリスト
}

// `ProductList` の型定義
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  // 商品一覧を取得
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // ユーザー情報を取得
  useEffect(() => {
    fetch("http://localhost:8080/api/user/current")
      .then((response) => response.json())
      .then((data: User) => setUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  // カートから削除する関数
  const handleRemoveFromCart = (userId: number, productId: number) => {
    if (!userId) {
      alert("ユーザー情報が取得できていません。");
      return;
    }
    fetch(`http://localhost:8080/api/products/${productId}/remove-from-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((response) => {
        if (response.ok && user) {
          setUser({ ...user, cartItems: user.cartItems.filter((item) => item !== productId) });
        } else {
          alert("エラーが発生しました。");
        }
      })
      .catch((error) => console.error("Error removing from cart:", error));
  };

  // カートに追加する関数
  const handleAddToCart = (userId: number, productId: number) => {
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
          setUser({ ...user, cartItems: [...user.cartItems, productId] });
        } else {
          alert("エラーが発生しました。");
        }
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  // お気に入りの追加・削除
  const handleToggleFavorite = (productId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>商品一覧</h1>
      {user && <h2>ログインユーザー: {user.username}</h2>}

      {/* カート画面へのリンク */}
      {/* <Link to="/cart">
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
      </Link> //TODO：あとで直す*/}

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
                      ? handleRemoveFromCart(user!.id, product.id)
                      : handleAddToCart(user!.id, product.id)
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
                <button
                  onClick={() => handleToggleFavorite(product.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: favorites.includes(product.id) ? "black" : "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {favorites.includes(product.id) ? "お気に入りから削除" : "お気に入りに追加"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
