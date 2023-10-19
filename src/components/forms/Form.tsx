import { ChangeEvent, FC } from "react";
import React from "react";
import { FormEvent } from "react";
import { Input } from "./index";
import { Spinner } from "../common";

interface Config {
  labelText: string;
  labelId: string;
  type: string;
  value: string;
  required?: boolean;
}
interface FormProps {
  config: Config[];
  isLoading: boolean;
  btnText: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Form: FC<FormProps> = ({ onSubmit, onChange, config, isLoading, btnText }) => {
  return (
    <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
      {config.map((input, index) => (
        <Input
          key={index}
          lableId={input.labelId}
          type={input.type}
          onChange={onChange}
          value={input.value}
          required={input.required}
        >
          {input.labelText}
        </Input>
      ))}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? <Spinner sm /> : btnText}
        </button>
      </div>
    </form>
  );
};

export default Form;
