import { Link } from 'react-router-dom';
function Cart({ cart, onRemoveFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="alert alert-secondary mt-4">
        Ton panier est vide pour l'instant.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3>Mon panier</h3>
      <ul className="list-group mb-3">
        {cart.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {item.name} — {item.price.toLocaleString()} FCFA
            </span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onRemoveFromCart(index)}
            >
              Retirer
            </button>
          </li>
        ))}
      </ul>
      <h5>Total : {total.toLocaleString()} FCFA</h5>
      <Link to="/checkout" className="btn btn-success mt-3">
       Passer la commande
       </Link>
    </div>
  );
}

export default Cart;