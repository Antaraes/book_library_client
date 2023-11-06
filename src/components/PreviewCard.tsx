"use client";
import { FC, useState } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import BookModal from "./BookModal";
import imageCompression from "browser-image-compression";
type Book = {
  id: number;
  title: string;
  image: string;
  published: string;
  totalPage: number;
};

type Author = {
  id: number;
  name: string;
  description: string;
};

type Category = {
  id: number;
  name: string;
};
type BookInfo = {
  bookId: number;
  Book: Book;
  Author: Author;
  Categories: Category;
};
interface PreviewCardProps {
  book: BookInfo;
}

const PreviewCard: FC<PreviewCardProps> = ({ book }) => {
  const [isModal, setIsModal] = useState(false);
  const [preview, setPreview] = useState("");

  return (
    <>
      <Card className="w-full flex-row m-5" onClick={() => setIsModal(!isModal)}>
        <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
          <img
            src={`data:image/jpeg;base64,${book.Book.image}`}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {book.Categories.name}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {book.Book.title}
          </Typography>
          <Typography color="gray" className="mb-2 font-normal">
            Publisher Date: {book.Book.published}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Author: {book.Author.name}
          </Typography>
          <a href={`book/${book.bookId}/1`} className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>
      {isModal ? <BookModal /> : null}
    </>
  );
};

export default PreviewCard;
