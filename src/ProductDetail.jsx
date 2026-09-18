import { useParams, Link } from 'react-router-dom';
import products from './products';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mt-5">
        <p>Produit introuvable.</p>
        <Link to="/">Retour à la boutique</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        ← Retour à la boutique
      </Link>
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} className="img-fluid rounded" alt={product.name} />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h4 className="fw-bold">{product.price.toLocaleString()} FCFA</h4>
          <button
            className="btn btn-primary"
            onClick={() => onAddToCart(product)}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;