import { CartProvider } from "./context/CartContext.jsx"
import Home from "./pages/Home";

function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

export default App;
