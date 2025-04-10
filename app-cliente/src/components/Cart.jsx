import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function handleSendToWhatsApp() {
    const msg = cart.map((item, i) => `${i + 1}. ${item.name} - R$ ${item.price.toFixed(2)}`).join('\n');
    const finalMsg = `📦 *Novo Pedido:*\n\n${msg}\n\n💰 Total: R$ ${total.toFixed(2)}`;
    const phone = "5511999999999"; // número da loja
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, "_blank");
  }

  return (
    <div style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <h2>Carrinho</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - R$ {item.price.toFixed(2)} 
            <button onClick={() => removeFromCart(index)}>Remover</button>
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> R$ {total.toFixed(2)}</p>
      <button onClick={handleSendToWhatsApp}>Enviar para WhatsApp</button>
      <button onClick={clearCart}>Limpar carrinho</button>
    </div>
  );
}
