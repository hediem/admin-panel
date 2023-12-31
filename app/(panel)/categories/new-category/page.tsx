"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import { CategoriesType, CategoryFormData } from "@/utils/types";
import AdminPanelContext from "@/context/AdminPanelContext";

import AddandEdit from "@/components/categories/AddandEdit";
import "../categories.scss";

type Inputs = {
  name: string;
  color: string;
};

const page = () => {
  const router = useRouter();
  const { setUpdater } = useContext(AdminPanelContext);

  const [categoryData, setCategoryData] = useState<CategoryFormData>({
    categoryName: "",
    selectedColor: { hex: "", default: "" },
  });

  const handleCheckCategory = async (data: Inputs) => {
    const response = await fetch("http://localhost:8000/categories");
    const categories = await response.json();

    const categoryExists = categories.some(
      (category: CategoriesType) =>
        category.name.toLowerCase() === data.name.toLowerCase()
    );
    return categoryExists;
  };

  const addCategory = async () => {
    const data = {
      name: categoryData.categoryName,
      color:
        categoryData.selectedColor.hex !== ""
          ? categoryData.selectedColor.hex
          : categoryData.selectedColor.default,
    };
    let check = await handleCheckCategory(data);

    if (!check) {
      const response = await fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Category add successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/categories", { scroll: false });
        setUpdater((prev) => !prev);
        setCategoryData({
          categoryName: "",
          selectedColor: { hex: "", default: "" },
        });
      } else {
        toast.error("Category add failed", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Category already exists with that name", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <AddandEdit
        submit={addCategory}
        categoryData={categoryData}
        setCategoryData={setCategoryData}
      />
      <ToastContainer />
    </div>
  );
};

export default page;
