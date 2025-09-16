import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
//import "./Product.css";
export default function Product() {
  const { user, products, setProducts, cart, setCart } = useContext(AppContext);
  // const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products/all`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (id) => {
    !cart[id] && setCart({ ...cart, [id]: 1 });
  };

  return (
    <div>
      <style>{`
  .App-Product-Row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .App-Product-Row div {
    width: 220px;
    background: white;
    padding: 15px;
    margin: 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
  }

  .App-Product-Row div:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }

  .App-Product-Row img {
    width: 100%;
    height: 150px;
    object-fit: contain;
    margin-bottom: 10px;
  }
`}</style>
      <h3>WELCOME {user.name}! </h3>
      <div className="App-Product-Row">
        {products &&
          products.map((value) => (
            <div key={value._id}>
              <img
                src={value.image || "https://via.placeholder.com/150"}
                alt={value.name}
              />
              <h3>{value.name}</h3>
              <h4>{value.price}</h4>
              <button onClick={() => addToCart(value.pid)}>Add to Cart</button>
            </div>
          ))}
      </div>
    </div>
  );
}