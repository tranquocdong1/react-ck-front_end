const WishlistItem = ({ item }) => {
    return (
      <div>
        <h3>{item.name}</h3>
        <p>${item.price}</p>
      </div>
    );
  };
  
  export default WishlistItem;