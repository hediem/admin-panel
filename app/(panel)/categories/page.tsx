"use client";
import React, { useEffect, useState, useContext, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import debounce from "lodash.debounce";
import { CategoriesType } from "@/utils/types";
import CategoriesTable from "@/components/categories/CategoriesTable";
import DeleteModal from "@/components/categories/DeleteModal";
import ColorSchema from "@/public/assets/kits/colors";
import AdminPanelContext from "@/context/AdminPanelContext";

import Add from "@/public/assets/icons/Add.svg";
import search from "@/public/assets/icons/Search-icon.svg";
import "./categories.scss";

const categories = () => {
  const {
    isModalDeleteOpen,
    selectedItem,
    setIsModalDeleteOpen,
    setShowBackDrop,
    updater,
    setUpdater,
    setType,
    setSelectedItem,
  } = useContext(AdminPanelContext);

  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number | null>(0);
  //false = asc , true = desc
  const [sort, setSort] = useState(false);

  const pageCount = Math.ceil(totalCount !== null ? totalCount / 10 : 1); // Set the total number of pages here

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/categories/${selectedItem.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Category deleted successfully", {
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
        setSelectedItem({ name: "", color: "", id: 0 });
      } else {
        toast.success("Failed to delete category", {
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
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setCurrentPage(newPage);
    }
  };

  const getData = async ({ search = "" } = {}) => {
    const baseUrl = "http://localhost:8000/categories";
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

    const categories = await response.json();

    if (categories.length === 0 && currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
      return;
    }

    setCategories(categories);

    const totalCountHeader = response.headers.get("X-Total-Count");
    const totalItems = totalCountHeader ? parseInt(totalCountHeader) : null;
    setTotalCount(totalItems);
  };

  const debouncedSearch = useRef(
    debounce(async (search: string) => {
      try {
        getData({ search });
      } catch (error) {
        console.error("An error occurred", error);
      }
    }, 300)
  ); // Debounce time in milliseconds

  useEffect(() => {
    if (searchTerm !== "") {
      getData({ search: searchTerm });
    } else {
      getData();
    }
  }, [currentPage, updater]);

  return (
    <div className="categories">
      <div className="header">
        <div className="title">Categories</div>
        <Link
          href={"/categories/new-category"}
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
          }}
          onClick={() => {
            setType("add");
          }}
        >
          <Image src={Add} alt="add" width={16} height={16} />
          <span>New category</span>
        </Link>
      </div>
      <div className="search-input col-md-5 col-xl-4">
        <span className="search-icon">
          <Image src={search} alt="search" width={16} height={16} />
        </span>
        <input
          type="text"
          placeholder="Search category name"
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
      {categories.length !== 0 ? (
        <CategoriesTable
          categories={categories}
          currentPage={currentPage}
          pageCount={pageCount}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          // getData={getData}
          sort={sort}
          setSort={setSort}
        />
      ) : (
        <div>There is no Category!</div>
      )}

      {isModalDeleteOpen && <DeleteModal deleteFunc={deleteItem} />}
      <ToastContainer />
    </div>
  );
};

export default categories;
