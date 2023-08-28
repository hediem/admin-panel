"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { CategoriesType } from "@/utils/types";
type ContextType = {
  width: number | undefined;
  show: boolean;
  showBackDrop: boolean;
  isModalDeleteOpen: boolean;
  selectedItem: CategoriesType;
  updater: boolean;
  type: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBackDrop: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<CategoriesType>>;
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
};
const AdminPanelContext = React.createContext<ContextType>({
  show: false,
  setShow: () => {},
  showBackDrop: false,
  setShowBackDrop: () => {},
  width: 1000,
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: () => {},
  selectedItem: {
    name: "",
    color: "",
    id: 0,
  },
  setSelectedItem: () => {},
  updater: false,
  setUpdater: () => {},
  type: "",
  setType: () => {},
});
export default AdminPanelContext;

interface AdminPanelProviderProps {
  children: React.ReactNode;
}

export const AdminPanelContextProvider: React.FC<AdminPanelProviderProps> = ({
  children,
}) => {
  const [show, setShow] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CategoriesType>({
    name: "",
    color: "",
    id: 0,
  });
  const [updater, setUpdater] = useState(false);
  const [type, setType] = useState("edit");
  const windowSize = useWindowSize();
  const width =
    windowSize.width !== undefined ? windowSize.width : window.innerWidth;
  const path = usePathname();

  return (
    <AdminPanelContext.Provider
      value={{
        width,
        show,
        setShow,
        isModalDeleteOpen,
        setIsModalDeleteOpen,
        showBackDrop,
        setShowBackDrop,
        selectedItem,
        setSelectedItem,
        updater,
        setUpdater,
        type,
        setType,
      }}
    >
      <div
        id="main"
        className={`${
          !path.includes("sign-up") && !path.includes("sign-in")
            ? show && width !== undefined && width > 991
              ? "show"
              : width !== undefined && width > 991
              ? "fixed"
              : ""
            : ""
        }`}
      >
        {children}
      </div>
    </AdminPanelContext.Provider>
  );
};
