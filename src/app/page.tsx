"use client";
import PreviewCard from "@/components/PreviewCard";
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
    dispatch(fetchAsyncBookDetail({ bookId: 1, currentPage: 1 }));
    dispatch(fetchAsyncBookmarks(1));
  }, []);
  const booksList = useAppSelector(getBooksList);

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
