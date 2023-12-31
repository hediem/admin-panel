import React, { useContext } from "react";
import Image from "next/image";
import AdminPanelContext from "@/context/AdminPanelContext";
import close from "@/public/assets/icons/close-Icon.svg";
const DeleteModal = ({ deleteFunc }: { deleteFunc: () => void }) => {
  const {
    setIsModalDeleteOpen,
    setShowBackDrop,
    selectedItem,
    setSelectedItem,
  } = useContext(AdminPanelContext);
  const reset = () => {
    setIsModalDeleteOpen(false);
    setShowBackDrop(false);
    setSelectedItem({ name: "", color: "", id: 0 });
  };
  return (
    <div>
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
            <span>Delete category</span>
            <Image
              src={close}
              alt="close"
              width={24}
              height={24}
              onClick={reset}
              style={{ cursor: "pointer" }}
            />
          </div>
          <p>Are you sure you want to delete the {selectedItem?.name}?</p>
          <div
            className="d-flex justify-content-between"
            style={{ gap: "8px", width: "fit-content", alignSelf: "end" }}
          >
            <div className="save-button" onClick={deleteFunc}>
              Yes
            </div>
            <div className="empty-button" onClick={reset}>
              No
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
