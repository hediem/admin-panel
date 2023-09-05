"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import useWindowSize from "@/hooks/useWindowSize";
import { CategoriesType, ProductsType, UsersType } from "@/utils/types";
type ContextType = {
  width: number | undefined;
  show: boolean;
  showBackDrop: boolean;
  isModalDeleteOpen: boolean;
  isModalAddandEditOpen: boolean;
  selectedItem: CategoriesType;
  selectedProduct: ProductsType;
  updater: boolean;
  type: string;
  userInfo: UsersType;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBackDrop: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalAddandEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<CategoriesType>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductsType>>;
  setUpdater: React.Dispatch<React.SetStateAction<boolean>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UsersType>>;
  getUserData: (email: string) => void;
};
const AdminPanelContext = React.createContext<ContextType>({
  show: false,
  setShow: () => {},
  showBackDrop: false,
  setShowBackDrop: () => {},
  width: 1000,
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: () => {},
  isModalAddandEditOpen: false,
  setIsModalAddandEditOpen: () => {},
  selectedItem: {
    name: "",
    color: "",
    id: 0,
  },
  selectedProduct: {
    name: "",
    category: { name: "", color: "", id: 0 },
    price: "0",
    id: 0,
  },
  setSelectedItem: () => {},
  setSelectedProduct: () => {},
  updater: false,
  setUpdater: () => {},
  type: "",
  setType: () => {},
  userInfo: {
    id: 0,
    email: "",
    password: "",
    profilePic: "",
    fullname: "",
    birthday: 0,
    gender: "",
  },
  setUserInfo: () => {},
  getUserData: () => {},
});
export default AdminPanelContext;

interface AdminPanelProviderProps {
  children: React.ReactNode;
}

export const AdminPanelContextProvider: React.FC<AdminPanelProviderProps> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState({
    id: 0,
    email: "",
    password: "",
    profilePic: "",
    fullname: "",
    birthday: 0,
    gender: "-1",
  });
  const [show, setShow] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddandEditOpen, setIsModalAddandEditOpen] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CategoriesType>({
    name: "",
    color: "",
    id: 0,
  });
  const [selectedProduct, setSelectedProduct] = useState<ProductsType>({
    name: "",
    category: { name: "", color: "", id: 0 },
    price: "0",
    id: 0,
  });
  const [updater, setUpdater] = useState(false);
  const [type, setType] = useState("edit");
  const windowSize = useWindowSize();
  const width =
    typeof window !== "undefined" && windowSize.width !== undefined
      ? windowSize.width
      : undefined;
  // windowSize.width !== undefined ? windowSize.width : window.innerWidth;
  const path = usePathname();
  const getUserData = async (email: string) => {
    const response = await fetch(
      `http://localhost:8000/users/?email_like=${email}`,
      {
        method: "get", // Use PATCH to update specific fields
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserInfo(data[0]);
  };

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
        selectedProduct,
        setSelectedProduct,
        isModalAddandEditOpen,
        setIsModalAddandEditOpen,
        userInfo,
        setUserInfo,
        getUserData,
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
