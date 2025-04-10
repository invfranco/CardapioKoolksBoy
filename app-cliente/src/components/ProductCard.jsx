import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div style={{
      border: "1px solid #444",
      borderRadius: "12px",
      padding: "1rem",
      background: "#333",
      color: "#fff"
    }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>R$ {product.price.toFixed(2)}</strong><br />
      <button onClick={() => addToCart(product)}>Adicionar</button>
    </div>
  );
}
