import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <Link to={`/produit/${product.id}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
        <div className="card-body">
          <Link to={`/produit/${product.id}`} className="text-decoration-none text-dark">
            <h5 className="card-title">{product.name}</h5>
          </Link>
          <p className="card-text text-muted">{product.category}</p>
          <p className="card-text fw-bold">{product.price.toLocaleString()} FCFA</p>
          <button
            className="btn btn-primary w-100"
            onClick={() => onAddToCart(product)}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;