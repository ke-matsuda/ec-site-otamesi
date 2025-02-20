import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Cart from "./Cart"; // カート画面のコンポーネントをインポート
function App() {
  const [products, setProducts] = useState([]);
  // 商品一覧を取得
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  // カートから削除する関数
  const handleRemoveFromCart = (id) => {
    fetch(`http://localhost:8080/api/products/${id}/remove-from-cart`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          alert("商品がカートから削除されました！");
          window.location.reload();
        } else {
          alert("エラーが発生しました。");
        }
      })
      .catch((error) => console.error("Error Remove from cart:", error));
  };
  // カートに追加する関数
  const handleAddToCart = (id) => {
    fetch(`http://localhost:8080/api/products/${id}/add-to-cart`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          alert("商品がカートに追加されました！");
          window.location.reload();
        } else {
          alert("エラーが発生しました。");
        }
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>
            商品一覧
          </Link>
          <Link to="/cart">カート</Link>
        </nav>
        <Routes>
          {/* 商品一覧画面 */}
          <Route
            path="/"
            element={
              <div>
                <h1>商品一覧</h1>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {products.map((product) => (
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
                            product.isInCart
                              ? handleRemoveFromCart(product.id)
                              : handleAddToCart(product.id)
                          }
                          style={{
                            padding: "5px 10px",
                            backgroundColor: product.isInCart ? "red" : "green",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          {product.isInCart ? "カートから削除" : "カートに追加"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
          {/* カート画面 */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;