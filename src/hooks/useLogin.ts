import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import api from "../api/book.api";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { fetchUserLogin, setAuth } from "@/redux/auth/authSlice";

import { toast } from "react-toastify";
import { error } from "console";
import { supabase } from "../config/db";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
export default function useLogin() {
  const cookies = new Cookies();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useAppSelector((state) => state.auth);
  //   const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login");
    // dispatch(fetchUserLogin({ email, password }));
    api
      .post("/auth/login", { email, password })
      .then((res) => {
        console.log(res.data.data.user);

        dispatch(setAuth());
        cookies.set("user", res.data.data.session.access_token);
        toast.success("🦄 Login Success.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push("/");
        if (res.data.data.user) {
          console.log("Success");
        } else {
          toast.error("🦄 Login failed. Please try again.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        toast.error("🦄 Something went wrong. Please try again!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
