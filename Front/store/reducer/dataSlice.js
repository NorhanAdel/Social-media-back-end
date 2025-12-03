import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "fce895fdb8msh33a491614c6263ep13e207jsnc07280ee1555",
    "X-RapidAPI-Host": "books-api7.p.rapidapi.com",
  },
};

export const fetchBooks = createAsyncThunk("data/fetchBooks", async () => {
  try {
    const apiUrl = "https://books-api7.p.rapidapi.com/books";
    const res = await fetch(apiUrl, options);
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
});
export const fetchBook = createAsyncThunk(
  "data/fetchBook",
  async ({ title }) => {
    try {
      const apiUrl = `https://books-api7.p.rapidapi.com/books/find/title?title=${title}`;
      const res = await fetch(apiUrl, options);
      const data = await res.json();
      return data;
    } catch (e) {
      return e;
    }
  }
);

export const getBookDetails = createAsyncThunk(
  "data/getBookDetails",
  async ({ id }) => {
    try {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes/${id}`;
      const res = await fetch(apiUrl);
      const data = await res.json();
      return data;
    } catch (e) {
      return e;
    }
  }
);
export const createPost = createAsyncThunk(
  "data/reathPost",
  async (payload, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await api.post(
        "/post",
        { ...payload },
        { headers: { "x-auth-token": token } }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const acceptUser = createAsyncThunk(
  "data/acceptuser",
  async (payload, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await api.post(
        "/accept",
        { ...payload },
        { headers: { "x-auth-token": token } }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejecttUser = createAsyncThunk(
  "data/rejectuser",
  async (payload, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await api.post(
        "/reject",
        { ...payload },
        { headers: { "x-auth-token": token } }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);


export const getPosts = createAsyncThunk(
  "data/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/post");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const getuser = createAsyncThunk(
  "data/getuser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/allUser");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchbook = createAsyncThunk("data/searchbook", async (title) => {
  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(title);
    return data;
  } catch (e) {
    return e;
  }
});
export const fetchByCategory = createAsyncThunk(
  "data/fetchByCategory",
  async (genres) => {
    try {
      const apiUrl = `https://books-api7.p.rapidapi.com/books/find/genres?genres%5B%5D=${genres}`;
      const res = await fetch(apiUrl, options);
      const data = await res.json();
      return data;
    } catch (e) {
      return e;
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    books: [],
    posts: [],
    users: [],
    post: null,
    accept: null,
    reject: null,
    volumeInfo: null,
    book: null,
    downloadLink: null,
    searchResult: [],
    filteredBooks: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.status = "loading";
        console.log(action.payload);
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "error";
        console.log(action.payload);
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload;
        console.log(action.payload);
      })
      .addCase(acceptUser.rejected, (state, action) => {
        state.status = "error";
        console.log(action.payload);
      })
      .addCase(acceptUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(acceptUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accept = action.payload;
        console.log(action.payload);
      })
      .addCase(getuser.rejected, (state, action) => {
        state.status = "error";
        console.log(action.payload);
      })
      .addCase(getuser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        console.log(action.payload);
      })
      .addCase(rejecttUser.rejected, (state, action) => {
        state.status = "error";
        console.log(action.payload);
      })
      .addCase(rejecttUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(rejecttUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reject = action.payload;
        console.log(action.payload);
      })

      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(searchbook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchbook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResult = action.payload.items;
        console.log(action.payload);
      })
      .addCase(searchbook.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(fetchBook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.book = action.payload[0];
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(fetchByCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredBooks = action.payload;
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(getPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.posts;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(getBookDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBookDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.volumeInfo = action.payload.volumeInfo;
        state.downloadLink = action.payload.accessInfo.pdf?.acsTokenLink;
        console.log(action);
      })
      .addCase(getBookDetails.rejected, (state, action) => {
        state.status = "error";
      }),
});

export const {} = dataSlice.actions;
export default dataSlice.reducer;
