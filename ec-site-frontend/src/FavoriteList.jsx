import { Link } from "react-router-dom";

function FavoriteList({ products, favorites }) {
  return (
    <div>
      <h1>お気に入りリスト</h1>
      <Link to="/">商品一覧に戻る</Link>
      <ul>
        {products.filter(p => favorites.includes(p.id)).map(product => (
          <li key={product.id}>
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;
