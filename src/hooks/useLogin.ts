import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import api from "../api/book.api";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { error } from "console";
export default function useLogin() {
  const cookies = new Cookies();
  const router = useRouter();
  //   const [login, { isLoading }] = useLoginMutation();
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .post("/auth/login", { username, password })
      .then((res) => {
        if (res.data && res.data.user) {
          cookies.set("user", res.data.user, {
            path: "/",
          });
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
    username,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
