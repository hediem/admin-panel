"use client";

import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { CategoriesType, ColorObjectType } from "@/utils/types";
import AdminPanelContext from "@/context/AdminPanelContext";

import "../categories.scss";
import { useRouter } from "next/navigation";
import AddandEdit from "@/components/categories/AddandEdit";

type Inputs = {
  name: string;
  color: string;
};

const page = () => {
  const router = useRouter();
  const { setUpdater } = useContext(AdminPanelContext);

  const [categoryName, setCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState<ColorObjectType>({
    hex: "",
    default: "",
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
      name: categoryName,
      color:
        selectedColor.hex !== "" ? selectedColor.hex : selectedColor.default,
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
        categoryName={categoryName}
        selectedColor={selectedColor}
        setCategoryName={setCategoryName}
        setSelectedColor={setSelectedColor}
      />
      <ToastContainer />
    </div>
  );
};

export default page;
