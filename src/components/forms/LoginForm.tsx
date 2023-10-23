"use client";
import React from "react";
import { FC } from "react";
import useLogin from "../../hooks/useLogin";
import { Form } from "../forms/index";
interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();
  const config = [
    {
      labelText: "Email ",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
    {
      labelText: "Password ",
      labelId: "password",
      type: "password",
      value: password,
      required: true,
    },
  ];
  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Login"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
