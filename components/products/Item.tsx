import React, { useContext } from "react";
import { ProductsType } from "@/utils/types";
import Edit from "@/public/assets/icons/Edit.svg";
import Delete from "@/public/assets/icons/Delete.svg";
import Image from "next/image";
import AdminPanelContext from "@/context/AdminPanelContext";
import Link from "next/link";
import addCommas from "@/utils/addCommas";
const Item = ({ item }: { item: ProductsType }) => {
  const {
    setIsModalDeleteOpen,
    setIsModalAddandEditOpen,
    setShowBackDrop,
    setSelectedProduct,
    setType,
  } = useContext(AdminPanelContext);
  return (
    <tr
      style={{
        fontSize: "14px",
        // padding: "11px 12px",
        // borderBottom: `1px solid ${ColorSchema.grey30}`,
      }}
      className="product-item"
    >
      <td className="col-name">{item.name}</td>
      <td className="col-id">
        c{item.id < 10 && "0"}
        {item.id}
      </td>
      <td className="col-category">{item.category.name}</td>
      <td className="col-price">${addCommas(item.price)}</td>
      <td
        className="d-inline-flex justify-content-center col-action"
        style={{ gap: "20px" }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            setType("edit");
            setSelectedProduct(item);
            setShowBackDrop(true);
            setIsModalAddandEditOpen(true);
          }}
        >
          <Image src={Edit} alt="edit" width={20} height={20} />
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            setIsModalDeleteOpen(true);
            setShowBackDrop(true);
            setSelectedProduct(item);
          }}
        >
          <Image src={Delete} alt="delete" width={20} height={20} />
        </div>
      </td>
    </tr>
  );
};

export default Item;
