"use client";
import React, { useState } from "react";
type ContextType = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
};
const AdminPanelContext = React.createContext<ContextType>({
  show: false,
  setShow: () => {},
  width: 1000,
});
export default AdminPanelContext;

interface AdminPanelProviderProps {
  children: React.ReactNode;
}

export const AdminPanelContextProvider: React.FC<AdminPanelProviderProps> = ({
  children,
}) => {
  const [show, setShow] = useState(false);
  const width = window.innerWidth;
  return (
    <AdminPanelContext.Provider value={{ show, setShow, width }}>
      <div
        id="main"
        className={`${
          show && width > 991 ? "show" : width > 991 ? "fixed" : ""
        }`}
      >
        {children}
      </div>
    </AdminPanelContext.Provider>
  );
};
