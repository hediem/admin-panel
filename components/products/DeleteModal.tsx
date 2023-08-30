import React, { useContext } from "react";
import AdminPanelContext from "@/context/AdminPanelContext";
import Image from "next/image";
import close from "@/public/assets/icons/close-Icon.svg";
const DeleteModal = ({ deleteFunc }: { deleteFunc: () => void }) => {
  const {
    setIsModalDeleteOpen,
    setShowBackDrop,
    selectedProduct,
    setSelectedProduct,
  } = useContext(AdminPanelContext);

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
          <span>Delete product</span>
          <Image
            src={close}
            alt="close"
            width={24}
            height={24}
            onClick={(e) => {
              setIsModalDeleteOpen(false);
              setShowBackDrop(false);
            }}
          />
        </div>
        <p>Are you sure you want to delete the {selectedProduct?.name}?</p>
        <div
          className="d-flex justify-content-between"
          style={{ gap: "8px", width: "fit-content", alignSelf: "end" }}
        >
          <div className="save-button" onClick={deleteFunc}>
            Yes
          </div>
          <div
            className="empty-button"
            onClick={(e) => {
              setIsModalDeleteOpen(false);
              setShowBackDrop(false);
              setSelectedProduct({
                name: "",
                category: { name: "", color: "", id: 0 },
                price: "0",
                id: 0,
              });
            }}
          >
            No
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
