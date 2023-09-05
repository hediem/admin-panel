"use client";
import { useEffect, useState } from "react";
import AnalysisCard from "@/components/home/AnalysisCard";
import "./home.scss";
export default function Home() {
  const [categoriesNumber, setCategoriesNumber] = useState(0);
  const [productsNumber, setProductsNumber] = useState(0);
  const getCategories = async () => {
    const responseCategory = await fetch(`http://localhost:8000/categories`, {
      method: "GET",
    });
    const categories = await responseCategory.json();
    setCategoriesNumber(categories.length);
  };
  const getProducts = async () => {
    const responseCategory = await fetch(`http://localhost:8000/products`, {
      method: "GET",
    });
    const products = await responseCategory.json();
    setProductsNumber(products.length);
  };
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);
  return (
    <div className="home">
      <div className="cards">
        <AnalysisCard number={productsNumber} text={"Total Products"} />
        <AnalysisCard number={categoriesNumber} text={"Categories"} />
      </div>
    </div>
  );
}
