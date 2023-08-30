import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import AdminPanelContext from "@/context/AdminPanelContext";
import close from "@/public/assets/icons/close-Icon.svg";
import CustomSelect from "../common/CustomSelect";
//@ts-ignore
import { ValueType } from "react-select";
import { CategoryOptions } from "@/utils/types";
type OptionType = { label: string; value: string }; // Customize this type as needed

const AddandEdit = ({
  submit,
  productName,
  setProductName,
  setProductPrice,
  productCategory,
  setProductCategory,
  categoriesOptions,
}: {
  submit: () => void;
  productName: string;
  setProductName: (name: string) => void;
  setProductPrice: (price: string) => void;
  productCategory: ValueType<OptionType>;
  setProductCategory: (selectedOption: ValueType<OptionType>) => void;
  categoriesOptions: CategoryOptions[];
}) => {
  const {
    type,
    setIsModalAddandEditOpen,
    setShowBackDrop,
    selectedProduct,
    setSelectedProduct,
  } = useContext(AdminPanelContext);
  const [formattedPrice, setFormattedPrice] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^\d]/g, ""); // Remove non-digit characters
    const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas as thousands separators
    setFormattedPrice(formattedValue);
    setProductPrice(inputValue);
  };
  useEffect(() => {
    if (selectedProduct.id !== 0) {
      setProductName(selectedProduct.name);
      setProductPrice(selectedProduct.price);
      setProductCategory({
        label: selectedProduct.category.name,
        value: selectedProduct.category.id,
        data: selectedProduct.category,
      });
    }
  }, []);

  const reset = () => {
    setIsModalAddandEditOpen(false);
    setShowBackDrop(false);
    setSelectedProduct({
      name: "",
      category: { name: "", color: "", id: 0 },
      price: "0",
      id: 0,
    });
    setProductName("");
    setProductPrice("");
    setProductCategory(null);
  };

  return (
    <div className="bottom-modal">
      <div className="modal-content">
        <div
          style={{
            fontSize: "20px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{type === "edit" ? "Edit" : "New"} product</span>
          <Image
            src={close}
            alt="close"
            width={24}
            height={24}
            onClick={reset}
          />
        </div>
        <div className="products">
          <div className="inputs">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Enter product name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="inputs">
            <label htmlFor="category">Category</label>
            <CustomSelect
              id="category"
              options={categoriesOptions}
              value={productCategory}
              onChange={setProductCategory}
              placeholder="Select a category"
            />
          </div>
          <div className="inputs">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              placeholder="Enter price"
              type="text"
              value={formattedPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ gap: "8px", width: "fit-content", alignSelf: "end" }}
        >
          <div className="save-button" onClick={submit}>
            Save
          </div>
          <div className="empty-button" onClick={reset}>
            Cancle
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddandEdit;
