import React from "react";
import Label from "./Label";

type InputType = "text" | "number";

type Props = {
  label: string;
  type: InputType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MyInput = ({ label, type, value, onChange }: Props) => {
  return (
    <div>
      <Label label={label} />
      <input
        type={type}
        id={label}
        placeholder={`Enter ${label}`}
        value={value}
        onChange={onChange}
        className="border p-2 w-full rounded"
      />
    </div>
  );
};

export default MyInput;
