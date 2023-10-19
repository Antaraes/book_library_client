import Link from "next/link";
import { FC } from "react";
import React from "react";
import { LoginForm } from "../../../components/forms";
import type { Metadata } from "next";
interface pageProps {}
export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
};
const Page: FC<pageProps> = ({}) => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />

        <p className="mt-10 text-center text-sm text-gray-500">
          Dont have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold leading-6 text-gray-900 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
