"use client";
import Pagination from "@/components/Pagination";
import { usePagination } from "@/hooks/usePagniation";
import { fetchAsyncBookDetail, getBookDetail } from "@/redux/book/bookSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { BookData } from "@/type";
import { Typography } from "@material-tailwind/react";
import { useParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import React from "react";
interface BookContent {
  id: number;
  bookId: number;
  content: string;
  page_no: number;
}
interface PageProps {
  bookContent: BookContent[];
  // Replace 'any[]' with the actual type of your page data
  currentPage: number;
  onPageChange: (page: number) => void;
}

let PageSize = 2;
const Page: FC<PageProps> = ({ bookContent, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const id = useParams();
  const bookId = parseInt(id.bookId, 10);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAsyncBookDetail({ bookId: bookId, currentPage: 1 }));
  }, []);
  const bookDetail: BookData = useAppSelector(getBookDetail);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return bookDetail.contents?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  console.log(bookDetail);

  if (!bookDetail) {
    return <div>Is has no data yet</div>;
  }
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div>
          <Typography color="blue-gray" className="mr-auto font-normal">
            {bookDetail.book?.title}
          </Typography>
        </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={bookDetail.contents?.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <div className="flex ">
        {currentTableData?.map((item, index) => {
          return (
            <tr key={index} className="border border-l-2 border-black">
              <td>{item.content}</td>
            </tr>
          );
        })}
      </div>
    </>
  );
};

export default Page;
