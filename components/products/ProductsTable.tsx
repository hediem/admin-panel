"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { ProductsType } from "@/utils/types";
import Item from "./Item";
import ColorSchema from "@/public/assets/kits/colors";
import arrow from "@/public/assets/icons/Arrow-up.svg";
import CustomPagination from "../common/Pagination";
import AdminPanelContext from "@/context/AdminPanelContext";
const ProductsTable = ({
  products,
  currentPage,
  pageCount,
  totalCount,
  handlePageChange,
  // getData,
  sort,
  setSort,
}: {
  products: ProductsType[];
  currentPage: number;
  pageCount: number;
  totalCount: number | null;
  handlePageChange: (newPage: number) => void;
  // getData: ({ sort }: { sort?: boolean }) => void;
  sort: boolean;
  setSort: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setUpdater } = useContext(AdminPanelContext);
  return (
    <div
      style={{
        borderRadius: "2px",
        border: `1px solid ${ColorSchema.theme_light}`,
      }}
    >
      <div className="item-list-container">
        <div className="table-responsive table-container">
          <table className="custom-table" style={{ marginBottom: "0px" }}>
            <thead>
              <tr className="header-row">
                <th
                  className="col-name"
                  onClick={() => {
                    setSort((prev) => !prev);
                    setUpdater((prev) => !prev);
                  }}
                >
                  <span>Name</span>

                  <span>
                    <Image
                      src={arrow}
                      alt="arrow"
                      width={20}
                      height={20}
                      style={{
                        transform: sort ? "rotateZ(180deg)" : "",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    />
                  </span>
                </th>
                <th className="col-id">Id</th>
                <th className="col-category">Category</th>
                <th className="col-price">Price</th>
                <th className="col-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((val) => {
                return <Item item={val} key={val.id} />;
              })}
            </tbody>
          </table>
        </div>
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

export default ProductsTable;
