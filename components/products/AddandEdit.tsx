import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import CustomSelect from "../common/CustomSelect";
import { CategoryOptions, ProductFormData } from "@/utils/types";
import addCommas from "@/utils/addCommas";
import AdminPanelContext from "@/context/AdminPanelContext";
import close from "@/public/assets/icons/close-Icon.svg";

const AddandEdit = ({
  submit,
  productData,
  setProductData,
  categoriesOptions,
}: {
  submit: () => void;
  productData: ProductFormData;
  setProductData: React.Dispatch<React.SetStateAction<ProductFormData>>;
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
    setProductData((prevData) => ({
      ...prevData,
      productPrice: inputValue,
    }));
  };
  const reset = () => {
    setIsModalAddandEditOpen(false);
    setShowBackDrop(false);
    setSelectedProduct({
      name: "",
      category: { name: "", color: "", id: 0 },
      price: "0",
      id: 0,
    });
    setProductData({
      productName: "",
      productPrice: "",
      productCategory: null,
    });
  };
  const checkFormFill = () => {
    if (
      productData.productName === "" ||
      productData.productPrice === "" ||
      productData.productCategory === null
    ) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    if (selectedProduct.id !== 0) {
      setProductData({
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
        productCategory: {
          label: selectedProduct.category.name,
          value: selectedProduct.category.id,
          data: selectedProduct.category,
        },
      });
      setFormattedPrice(addCommas(selectedProduct.price));
    }
  }, []);

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
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="products product-modal">
          <div className="inputs">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Enter product name"
              type="text"
              value={productData.productName}
              onChange={(e) =>
                setProductData((prevData) => ({
                  ...prevData,
                  productName: e.target.value,
                }))
              }
            />
          </div>
          <div className="inputs">
            <label htmlFor="category">Category</label>
            <CustomSelect
              id="category"
              options={categoriesOptions}
              value={productData.productCategory}
              onChange={(e) => {
                setProductData((prevData) => ({
                  ...prevData,
                  productCategory: e,
                }));
              }}
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
          <button
            disabled={!checkFormFill()}
            className={`save-button ${!checkFormFill() && "disabled"}`}
            onClick={(e) => {
              if (checkFormFill()) submit();
            }}
          >
            Save
          </button>
          <div className="empty-button" onClick={reset}>
            Cancle
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddandEdit;
