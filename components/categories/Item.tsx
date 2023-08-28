import React, { useContext } from "react";
import { CategoriesType } from "@/utils/types";
import Edit from "@/public/assets/icons/Edit.svg";
import Delete from "@/public/assets/icons/Delete.svg";
import Image from "next/image";
import ColorSchema from "@/public/assets/kits/colors";
import AdminPanelContext from "@/context/AdminPanelContext";
import Link from "next/link";
const Item = ({ item }: { item: CategoriesType }) => {
  const { setIsModalDeleteOpen, setShowBackDrop, setSelectedItem, setType } =
    useContext(AdminPanelContext);
  return (
    <div
      style={{
        fontSize: "14px",
        padding: "11px 12px",
        borderBottom: `1px solid ${ColorSchema.grey30}`,
      }}
      className="d-flex justify-content-between text-center category-item"
    >
      <div className="col-4 col-md-5 text-start">{item.name}</div>
      <div className="d-none d-md-block col-4 col-md-1">
        c{item.id < 10 && "0"}
        {item.id}
      </div>
      <div className="col-4 col-md-1">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx={2} fill={item.color} />
        </svg>
      </div>
      <div
        className="d-flex justify-content-center col-4 col-md-1"
        style={{ gap: "20px" }}
      >
        <Link
          href={"/categories/edit-category"}
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            setSelectedItem(item);
            setType("edit");
          }}
        >
          <Image src={Edit} alt="edit" width={20} height={20} />
        </Link>
        <div
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            setIsModalDeleteOpen(true);
            setShowBackDrop(true);
            setSelectedItem(item);
          }}
        >
          <Image src={Delete} alt="delete" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default Item;
