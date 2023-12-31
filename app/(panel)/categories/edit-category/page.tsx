"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import { CategoryFormData } from "@/utils/types";
import AdminPanelContext from "@/context/AdminPanelContext";

import AddandEdit from "@/components/categories/AddandEdit";
import "../categories.scss";

const page = () => {
  const router = useRouter();
  const { setUpdater, selectedItem, setSelectedItem } =
    useContext(AdminPanelContext);

  const [categoryData, setCategoryData] = useState<CategoryFormData>({
    categoryName: "",
    selectedColor: { hex: "", default: "" },
  });

  const editCategory = async () => {
    const data = {
      name: categoryData.categoryName,
      color:
        categoryData.selectedColor.hex !== ""
          ? categoryData.selectedColor.hex
          : categoryData.selectedColor.default,
    };
    const response = await fetch(
      `http://localhost:8000/categories/${selectedItem.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      toast.success("Category edit successful", {
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
      setSelectedItem({ name: "", color: "", id: 0 });
      setCategoryData({
        categoryName: "",
        selectedColor: { hex: "", default: "" },
      });
    } else {
      toast.error("Category edit failed", {
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
    <div className="categories">
      <AddandEdit
        submit={editCategory}
        categoryData={categoryData}
        setCategoryData={setCategoryData}
      />
      <ToastContainer />
    </div>
  );
};

export default page;
