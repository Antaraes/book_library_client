import { FC } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";

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
  book: Book;
  author: Author;
  categories: Category;
};
interface PreviewCardProps {
  book: BookInfo;
}

const PreviewCard: FC<PreviewCardProps> = ({ book }) => {
  return (
    <Card className="w-full flex-row m-5">
      <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {book.categories.name}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {book.book.title}
        </Typography>
        <Typography color="gray" className="mb-2 font-normal">
          Publisher Date: {book.book.published}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          Author: {book.author.name}
        </Typography>
        <a href={`book/${book.book.id}`} className="inline-block">
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
  );
};

export default PreviewCard;
