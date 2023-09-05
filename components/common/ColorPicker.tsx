import React from "react";
import { ChromePicker } from "react-color";
import { AiOutlineClose } from "react-icons/ai";
import ColorSchema from "@/public/assets/kits/colors";
const ColorPicker = ({
  onChange,
  handleColorClose,
  Color,
  setColor,
}: {
  onChange: (color: { hex: string }) => void;
  handleColorClose: () => void;
  Color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: ColorSchema.white_0,
        border: `1px solid ${ColorSchema.theme_light}`,
        borderRadius: "4px",
      }}
    >
      <div
        style={{ position: "absolute", top: "0px", right: "8px" }}
        onClick={handleColorClose}
      >
        <AiOutlineClose />
      </div>
      <ChromePicker
        color={Color}
        onChangeComplete={onChange}
        onChange={(e) => setColor(e.hex)}
      />
    </div>
  );
};

export default ColorPicker;
