import { FC } from "react";
import React from "react";
import { ChangeEvent } from "react";
interface InputProps {
  type: string;
  lableId: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  required?: boolean;
}

const Input: FC<InputProps> = ({ children, lableId, type, onChange, value, required = false }) => {
  return (
    <div>
      <label
        htmlFor={lableId}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
      >
        {children}
      </label>
      <div className="mt-2">
        <input
          id={lableId}
          name={lableId}
          type={type}
          autoComplete="text"
          onChange={onChange}
          value={value}
          required={required}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Input;
