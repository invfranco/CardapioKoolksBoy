import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setProducts(list);
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Cardápio</h1>

      <div className="w-full max-w-7xl mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-800 p-4 rounded-2xl shadow-md flex flex-col justify-between hover:scale-105 transition-all duration-300"
            >
              <img
                src={product.imagemUrl}
                alt={product.nome}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-1">{product.nome}</h2>
                <p className="text-sm text-zinc-400 mb-2">{product.descricao}</p>
              </div>
              <div>
                <p className="text-yellow-400 font-bold mb-3">
                  R$ {product.preco.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-xl w-full"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
