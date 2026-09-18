import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Checkout({ cart, onOrderComplete }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'Livraison à domicile',
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis.';
    if (!formData.address.trim()) newErrors.address = "L'adresse est requise.";
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis.';
    } else if (!/^\d{8,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide.';
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setOrderPlaced(true);
    onOrderComplete();
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="container mt-5">
        <p>Ton panier est vide.</p>
        <Link to="/" className="btn btn-primary">Retour à la boutique</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container mt-5">
        <div className="alert alert-success">
          <h4>Commande confirmée !</h4>
          <p>Merci {formData.name}, ta commande sera livrée à : {formData.address}.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Retour à la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Finaliser la commande</h2>

      <div className="row">
        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nom complet</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Adresse de livraison</label>
              <input
                type="text"
                name="address"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Téléphone</label>
              <input
                type="text"
                name="phone"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="0700000000"
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Mode de paiement</label>
              <select
                name="paymentMethod"
                className="form-select"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option>Livraison à domicile</option>
                <option>Mobile Money</option>
                <option>Carte bancaire</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Valider la commande
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <h5>Récapitulatif</h5>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()} FCFA</span>
              </li>
            ))}
          </ul>
          <h5>Total : {total.toLocaleString()} FCFA</h5>
        </div>
      </div>
    </div>
  );
}

export default Checkout;