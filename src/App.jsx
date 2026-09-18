import Checkout from './Checkout';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import products from './products';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import Cart from './Cart';

function HomePage({ cart, onAddToCart, onRemoveFromCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const categories = ['Toutes', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Toutes' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-5">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm me-2 mb-2 ${
              selectedCategory === cat ? 'btn-dark' : 'btn-outline-dark'
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-muted">Aucun produit ne correspond à ta recherche.</p>
      )}

      <Cart cart={cart} onRemoveFromCart={onRemoveFromCart} />
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  function handleRemoveFromCart(index) {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="container mt-5 d-flex justify-content-between align-items-center">
        <h1>Ma Boutique Mode</h1>
        <span className="badge bg-dark fs-6">
          🛒 Panier : {cart.length} article{cart.length !== 1 ? 's' : ''}
        </span>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cart={cart}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route
          path="/produit/:id"
          element={<ProductDetail onAddToCart={handleAddToCart} />}
        />
        <Route
         path="/checkout"
         element={<Checkout cart={cart} onOrderComplete={() => setCart([])} />}
/>
      </Routes>
      
    </div>
  );
}

export default App;