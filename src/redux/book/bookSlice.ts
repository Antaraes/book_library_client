import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/book.api";
import { RootState } from "../store";
import { BookData } from "@/type";

const initialState = {
  booksList: [],
  bookDetail: {} as BookData,
  bookmarks: [],
  loading: false,
};

export const fetchAsyncBooks = createAsyncThunk("books/fetchAsyncBooks", async () => {
  try {
    const response = await api.get("booksList");
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const fetchAsyncBookDetail = createAsyncThunk(
  "books/fetchAsyncBookDetail",
  async ({ bookId, currentPage }: { bookId: number; currentPage: number }) => {
    try {
      const response = await api.get(`book/${bookId}/${currentPage}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchAsyncBookmarks = createAsyncThunk(
  "books/fetchAsyncBookmarks",
  async (userId: number) => {
    try {
      const response = await api.get(`bookmark/1`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    fetchBooks: (state, { payload }) => {
      state.booksList = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncBooks.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(fetchAsyncBooks.fulfilled, (state, actions) => {
        console.log("Fetch Success");
        return { ...state, booksList: actions.payload, loading: false };
      })
      .addCase(fetchAsyncBooks.rejected, (state) => {
        state.loading = false;
        console.log("Fetch Failed");
      })
      .addCase(fetchAsyncBookDetail.fulfilled, (state, action) => {
        console.log("Fetch Success for BookDetail");
        return { ...state, bookDetail: action.payload, loading: false };
      })
      .addCase(fetchAsyncBookmarks.fulfilled, (state, action) => {
        console.log("Fetch Success for bookmarks");
        return { ...state, bookmarks: action.payload, loading: false };
      });
  },
});

export const { fetchBooks } = bookSlice.actions;
export const getBooksList = (state: RootState) => state.book.booksList;
export const getBookDetail = (state: RootState) => state.book.bookDetail;
export const getBookmarks = (state: RootState) => state.book.bookmarks;
export default bookSlice.reducer;
