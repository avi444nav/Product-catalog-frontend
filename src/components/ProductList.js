import React, { useState, useEffect } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('http://localhost:8080/api/categories');
      const data = await response.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      const url = selectedCategory
        ? `http://localhost:8080/api/products/category/${selectedCategory}`
        : 'http://localhost:8080/api/products';
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="container">
      <div className="mb-4">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">In stock: {product.stockQuantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}