import { CategoriesType } from "@/utils/types";
import React from "react";
//@ts-ignore
import Select, { ValueType } from "react-select";

type OptionType = { label: string; value: number; data: CategoriesType }; // Customize this type as needed

interface CustomSelectProps {
  options: OptionType[];
  value: ValueType<OptionType>;
  onChange: (selectedOption: ValueType<OptionType>) => void;
  id: string;
  placeholder: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  id,
  placeholder,
}) => {
  return (
    <Select
      id={id}
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomSelect;
