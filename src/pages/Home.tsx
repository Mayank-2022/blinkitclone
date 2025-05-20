import React from "react";
import { Link } from "react-router-dom";

import Banner from "../components/ui/Banner";
import ProductList from "../components/ui/ProductList";
import { useCart } from "../context/CartContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";


const Home: React.FC = () => {
  const { cart } = useCart();

  return (
    <div>
      <Header />
      <Banner />
      <ProductList />
      <Footer />
    </div>
  );
};