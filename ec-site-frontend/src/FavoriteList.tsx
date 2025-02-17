import { Link } from "react-router-dom";
import PropTypes from "prop-types";


function FavoriteList({ products, favorites }) {
	console.log("FavoriteList - products:", products);
	console.log("FavoriteList - favorites:", favorites);
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
FavoriteList.propTypes = {
	products: PropTypes.array.isRequired,
	favorites: PropTypes.array.isRequired,
};
export default FavoriteList;
