"use client";
import PreviewCard from "@/components/PreviewCard";
import { isAuthenticated, setAuth } from "@/redux/auth/authSlice";
import {
  fetchAsyncBookDetail,
  fetchAsyncBookmarks,
  fetchAsyncBooks,
  getBookDetail,
  getBooksList,
} from "@/redux/book/bookSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { useEffect } from "react";
export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAsyncBooks());
    dispatch(fetchAsyncBookmarks(1));
  }, []);
  const booksList = useAppSelector(getBooksList);
  const isAuth = useAppSelector(isAuthenticated);
  console.log("isAuth", isAuth);

  console.log(booksList);

  return (
    <main className="h-full">
      <div className="grid grid-cols-2 w-full  overflow-scroll">
        {booksList.map((book, index) => (
          <PreviewCard key={index} book={book} />
        ))}
      </div>
    </main>
  );
}
