"use client";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { ColorObjectType } from "@/utils/types";
import AdminPanelContext from "@/context/AdminPanelContext";

import "../categories.scss";
import { useRouter } from "next/navigation";
import AddandEdit from "@/components/categories/AddandEdit";

const page = () => {
  const router = useRouter();
  const { setUpdater, selectedItem, setSelectedItem } =
    useContext(AdminPanelContext);

  const [categoryName, setCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState<ColorObjectType>({
    hex: "",
    default: "",
  });

  const editCategory = async () => {
    const data = {
      name: categoryName,
      color:
        selectedColor.hex !== "" ? selectedColor.hex : selectedColor.default,
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
