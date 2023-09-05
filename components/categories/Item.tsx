import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoriesType } from "@/utils/types";
import AdminPanelContext from "@/context/AdminPanelContext";
import Edit from "@/public/assets/icons/Edit.svg";
import Delete from "@/public/assets/icons/Delete.svg";
const Item = ({ item }: { item: CategoriesType }) => {
  const { setIsModalDeleteOpen, setShowBackDrop, setSelectedItem, setType } =
    useContext(AdminPanelContext);
  return (
    <tr
      style={{
        fontSize: "14px",
        // padding: "11px 12px",
        // borderBottom: `1px solid ${ColorSchema.grey30}`,
      }}
      className="category-item"
    >
      <td className="col-name">{item.name}</td>
      <td className="col-id">
        c{item.id < 10 && "0"}
        {item.id}
      </td>
      <td className="col-color">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx={2} fill={item.color} />
        </svg>
      </td>
      <td
        className="d-inline-flex justify-content-center col-action"
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
      </td>
    </tr>
  );
};

export default Item;
