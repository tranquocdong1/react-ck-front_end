import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;