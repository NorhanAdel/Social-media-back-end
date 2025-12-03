import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeToken, setToken } from "../../utils/ApiStatus";
import api from "../../services/api";

export const signOut = createAsyncThunk("authentication/signOut", async () => {
  removeToken();
});

export const login = createAsyncThunk(
  "authentication/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", { ...payload });
      setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "authentication/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", { ...payload });
      setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "authentication/updateUserInfo",
  async (payload, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await api.put(
        "/user/profile",
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

export const addToShelves = createAsyncThunk(
  "authentication/addToShelves",
  async (book, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await api.patch(
        `/user/shelves`,
        { ...book },
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

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: "",
  successMessage: "",
  shelves: [],
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    resetError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signOut.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {};
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.token = accessToken;
        state.user = user;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "invalid login";
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.token = accessToken;
        state.user = user;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "error occur invalid registration";
      })
      .addCase(updateUserInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action);
      })
      .addCase(addToShelves.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToShelves.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
        console.log(action)
      })
      .addCase(addToShelves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action);
      }),
});

export const { setUser, clearUser, resetError, resetSuccess } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
