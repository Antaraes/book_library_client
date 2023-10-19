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
export type BookInfo = {
  book: Book;
  author: Author;
  categories: Category;
};

interface PageContent {
  id: number;
  bookId: number;
  content: string;
  page_no: number;
}

export type BookData = {
  book: Book;
  contents: PageContent[];
};
