import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import api from "../api/book.api";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { setAuth } from "@/redux/auth/authSlice";

import { toast } from "react-toastify";
import { error } from "console";
import { supabase } from "../config/db";
export default function useLogin() {
  const cookies = new Cookies();
  const router = useRouter();
  const dispatch = useDispatch();
  //   const [login, { isLoading }] = useLoginMutation();
  const [isLoading, setIsloading] = useState(false);
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

    api
      .post("/auth/login", { email, password })
      .then((res) => {
        console.log(res);

        if (res.data.data.user) {
          dispatch(setAuth)();
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
          cookies.set("user", res.data.data.session.access_token);
          router.push("/");
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
