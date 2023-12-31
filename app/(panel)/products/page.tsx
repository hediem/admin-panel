"use client";
import React, { useEffect, useState, useContext, useRef } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import debounce from "lodash.debounce";
import {
  CategoriesType,
  CategoryOptions,
  ProductFormData,
  ProductsType,
} from "@/utils/types";
import ProductsTable from "@/components/products/ProductsTable";
import DeleteModal from "@/components/products/DeleteModal";
import ColorSchema from "@/public/assets/kits/colors";
import AdminPanelContext from "@/context/AdminPanelContext";

import Add from "@/public/assets/icons/Add.svg";
import search from "@/public/assets/icons/Search-icon.svg";
import AddandEdit from "@/components/products/AddandEdit";
import "./products.scss";

type Inputs = {
  name: string;
};

const products = () => {
  const router = useRouter();

  const {
    isModalDeleteOpen,
    selectedProduct,
    setIsModalDeleteOpen,
    setShowBackDrop,
    updater,
    setUpdater,
    setType,
    setSelectedProduct,
    isModalAddandEditOpen,
    setIsModalAddandEditOpen,
    type,
  } = useContext(AdminPanelContext);

  const [products, setProducts] = useState<ProductsType[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<CategoryOptions[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number | null>(0);

  const [productData, setProductData] = useState<ProductFormData>({
    productName: "",
    productPrice: "",
    productCategory: null,
  });

  //false = asc , true = desc
  const [sort, setSort] = useState(false);

  const pageCount = Math.ceil(totalCount !== null ? totalCount / 10 : 1); // Set the total number of pages here

  const getCategories = async () => {
    let cat: CategoryOptions[] = [];
    const responseCategory = await fetch(`http://localhost:8000/categories`, {
      method: "GET",
    });
    const categories = await responseCategory.json();
    categories.map((val: CategoriesType) => {
      cat.push({ label: val.name, value: val.id, data: val });
    });
    setCategoriesOptions(cat);
  };

  const getData = async ({ search = "" } = {}) => {
    const baseUrl = "http://localhost:8000/products";
    let url = baseUrl;
    let payload = `_sort=name&_order=${!sort ? "asc" : "desc"}&_start=${
      (currentPage - 1) * 10
    }&_limit=10`;

    if (search) {
      payload += `&name_like=${search}`;
    }

    const response = await fetch(`${url}?${payload}`, {
      method: "GET",
    });

    const products = await response.json();

    if (products.length === 0 && currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
      return;
    }

    setProducts(products);

    const totalCountHeader = response.headers.get("X-Total-Count");
    const totalItems = totalCountHeader ? parseInt(totalCountHeader) : null;
    setTotalCount(totalItems);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setCurrentPage(newPage);
    }
  };

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/products/${selectedProduct.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Product deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsModalDeleteOpen(false);
        setShowBackDrop(false);
        setUpdater((prev) => !prev);
        setSelectedProduct({
          name: "",
          category: { name: "", color: "", id: 0 },
          price: "0",
          id: 0,
        });
      } else {
        toast.success("Failed to delete product", {
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
    } catch (error) {
      toast.success(`An error occurred ${error}`, {
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

  const debouncedSearch = useRef(
    debounce(async (search: string) => {
      try {
        getData({ search });
      } catch (error) {
        console.error("An error occurred", error);
      }
    }, 300)
  );

  const editProduct = async () => {
    const data = {
      name: productData.productName,
      price: productData.productPrice,
      category: productData.productCategory?.data,
    };

    const response = await fetch(
      `http://localhost:8000/products/${selectedProduct.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      toast.success("Product edit successful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else {
      toast.error("Product edit failed", {
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

  const handleCheckProduct = async (data: Inputs) => {
    const response = await fetch("http://localhost:8000/products");
    const products = await response.json();

    const productExists = products.some(
      (product: ProductsType) =>
        product.name.toLowerCase() === data.name.toLowerCase()
    );
    return productExists;
  };

  const addProduct = async () => {
    const data = {
      name: productData.productName,
      price: productData.productPrice,
      category: productData.productCategory?.data,
    };

    let check = await handleCheckProduct(data);

    if (!check) {
      const response = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Product add successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
      } else {
        toast.error("Product add failed", {
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
      toast.error("Product already exists with that name", {
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

  const reset = () => {
    router.push("/products", { scroll: false });
    setUpdater((prev) => !prev);
    setSelectedProduct({
      name: "",
      category: { name: "", color: "", id: 0 },
      price: "0",
      id: 0,
    });
    setIsModalAddandEditOpen(false);
    setShowBackDrop(false);
    setProductData({
      productName: "",
      productPrice: "",
      productCategory: null,
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      getData({ search: searchTerm });
    } else {
      getData();
    }
  }, [currentPage, updater]);

  return (
    <div className="products">
      <div className="header">
        <div className="title">Products</div>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{
            padding: "6px 20px",
            gap: "8px",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: ColorSchema.theme_primary,
            color: ColorSchema.white_0,
            border: "none",
            borderRadius: "2px",
            cursor: "pointer",
          }}
          onClick={() => {
            setType("add");
            setShowBackDrop(true);
            setIsModalAddandEditOpen(true);
          }}
        >
          <Image src={Add} alt="add" width={16} height={16} />
          <span>New product</span>
        </div>
      </div>
      <div className="search-input col-md-5 col-xl-4">
        <span className="search-icon">
          <Image src={search} alt="search" width={16} height={16} />
        </span>
        <input
          type="text"
          placeholder="Search product name"
          value={searchTerm}
          onChange={(e) => {
            if (e.target.value !== "") {
              debouncedSearch.current(e.target.value);
            } else {
              getData();
            }
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      {products.length !== 0 ? (
        <ProductsTable
          products={products}
          currentPage={currentPage}
          pageCount={pageCount}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          sort={sort}
          setSort={setSort}
        />
      ) : (
        <div>There is no Product!</div>
      )}

      {isModalDeleteOpen && <DeleteModal deleteFunc={deleteItem} />}
      {isModalAddandEditOpen && (
        <AddandEdit
          submit={type === "edit" ? editProduct : addProduct}
          productData={productData}
          setProductData={setProductData}
          categoriesOptions={categoriesOptions}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default products;
