const ProductCard = ({ product }) => {
    return (
      <div>
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
    );
  };
  
  export default ProductCard;