import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders/${encodeURIComponent(user.email)}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (user?.email) {
      console.log("Fetching orders for:", user.email);
      fetchOrders();
    } else {
      console.log("User not ready yet");
    }
  }, [user]);

  return (
    <div>
      <h3>My Orders</h3>
      {orders.length > 0 ? (
        <ol>
          {orders.map((value) => (
            <li key={value._id}>
              {value.email} — ₹{value.orderValue}
            </li>
          ))}
        </ol>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
