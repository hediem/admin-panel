"use client";
import React, { useState } from "react";
import { CategoriesType } from "@/utils/types";
import Item from "./Item";
import ColorSchema from "@/public/assets/kits/colors";
import CustomPagination from "../common/Pagination";
const CategoriesTable = ({
  categories,
  currentPage,
  pageCount,
  totalCount,
  handlePageChange,
}: {
  categories: CategoriesType[];
  currentPage: number;
  pageCount: number;
  totalCount: number | null;
  handlePageChange: (newPage: number) => void;
}) => {
  return (
    <div
      style={{
        borderRadius: "2px",
        border: `1px solid ${ColorSchema.theme_light}`,
      }}
    >
      <div
        className="d-flex justify-content-between text-center"
        style={{
          fontWeight: "600",
          fontSize: "14px",
          padding: "11px 12px",
          backgroundColor: ColorSchema.theme_lighter_alt,
          borderBottom: `1px solid ${ColorSchema.grey30}`,
        }}
      >
        <div className="col-4 col-md-5 text-start">Name</div>
        <div className="col-4 col-md-1 d-none d-md-block">Id</div>
        <div className="col-4 col-md-1">Color</div>
        <div className="col-4 col-md-1">Action</div>
      </div>
      <div>
        {categories.map((val) => {
          return <Item item={val} key={val.id} />;
        })}
      </div>
      <div
        className="d-flex justify-content-between"
        style={{
          fontSize: "14px",
          padding: "11px 12px",
        }}
      >
        <div>
          <span style={{ fontWeight: "600", marginRight: "5px" }}>
            {totalCount !== null ? totalCount : 1}
          </span>
          Items
        </div>
        <CustomPagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CategoriesTable;
