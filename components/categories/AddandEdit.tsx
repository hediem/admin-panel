import Image from "next/image";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import ColorPicker from "@/components/common/ColorPicker";
import checkmark from "@/public/assets/icons/Checkmark.svg";
import arrow from "@/public/assets/icons/Arrow.svg";
import AdminPanelContext from "@/context/AdminPanelContext";
import { ColorObjectType } from "@/utils/types";

const AddandEdit = ({
  submit,
  categoryName,
  selectedColor,
  setCategoryName,
  setSelectedColor,
}: {
  submit: () => void;
  categoryName: string;
  selectedColor: ColorObjectType;
  setCategoryName: (name: string) => void;
  setSelectedColor: (color: ColorObjectType) => void;
}) => {
  const router = useRouter();
  const { selectedItem, type, setSelectedItem } = useContext(AdminPanelContext);

  const defaultColors = [
    {
      id: 1,
      color: "#FFCD56",
    },
    {
      id: 2,
      color: "#FF6384",
    },
    {
      id: 3,
      color: "#4BC0C0",
    },
    {
      id: 4,
      color: "#FF9124",
    },
    {
      id: 5,
      color: "#2B88D8",
    },
    {
      id: 6,
      color: "#C7E0F4",
    },
  ];
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [Color, setColor] = useState("#f0f0f0");
  const handleColorClick = () => {
    setColorPickerVisible(true);
  };
  const handleColorClose = () => {
    setColorPickerVisible(false);
  };
  const handleColorChange = (color: { hex: string }) => {
    console.log("click");

    setSelectedColor({ default: "", hex: color.hex });
    // setColorPickerVisible(false);
  };
  useEffect(() => {
    if (selectedItem.id !== 0) {
      setCategoryName(selectedItem.name);
      setSelectedColor({
        default: selectedItem.color,
        hex: selectedItem.color,
      });
    }
  }, []);

  return (
    <div className="categories">
      <div className="header justify-content-start" style={{ gap: "8px" }}>
        <Image
          style={{ cursor: "pointer" }}
          src={arrow}
          alt="arrow"
          width={24}
          height={24}
          onClick={() => {
            router.push("/categories");
            setSelectedItem({ name: "", color: "", id: 0 });
          }}
        />
        <div className="title">{type === "edit" ? "Edit" : "New"} category</div>
      </div>
      <div className="inputs col-md-6 col-xl-5">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Enter category name"
          type="text"
          // defaultValue={type === "edit" ? selectedItem.name : ""}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      <div
        className="d-flex align-items-end justify-content-start"
        style={{ gap: "8px", position: "relative" }}
      >
        <div
          className="d-flex flex-column"
          style={{ gap: "16px", width: "fit-content" }}
        >
          <div style={{ fontWeight: "600" }}>Color</div>
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            {defaultColors.map((val) => {
              return (
                <div
                  onClick={(e) =>
                    setSelectedColor({ hex: "", default: val.color })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <svg
                    width="28"
                    height="28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {(type === "edit" && selectedItem.color === val.color) ||
                    val.color === selectedColor.default ? (
                      <image
                        href={checkmark.src}
                        x={4}
                        y={4}
                        width="20"
                        height="20"
                      />
                    ) : (
                      ""
                    )}

                    <rect
                      width="28"
                      height="28"
                      rx={2}
                      fill={val.color}
                      opacity={val.color === selectedColor.default ? 0.5 : 1}
                    />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
        <div className="custom-color" onClick={handleColorClick}>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <rect
              width="20"
              height="20"
              rx={2}
              fill={selectedColor.hex === "" ? "#F0F0F0" : selectedColor.hex}
            />
          </svg>
          <span style={{ fontWeight: "600", fontSize: "12px" }}>
            Custom color
          </span>
        </div>
        {colorPickerVisible && (
          <div
            style={{
              position: "absolute",
              bottom: "-300px", // Adjust this value based on your design
              left: "45px",
              zIndex: "2",
            }}
          >
            <ColorPicker
              onChange={handleColorChange}
              handleColorClose={handleColorClose}
              Color={Color}
              setColor={setColor}
            />
          </div>
        )}
      </div>
      <div className="save-button" onClick={submit}>
        save
      </div>
    </div>
  );
};

export default AddandEdit;
