import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import MAIN_URL from "../url/Urls";

export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(`${MAIN_URL}/lessons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  "lessons/deleteLesson",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      await axios.delete(`${MAIN_URL}/lessons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const updateLesson = createAsyncThunk(
  "lessons/updateLesson",
  async ({ id, lessonData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.put(
        `${MAIN_URL}/lessons/${id}`,
        { lesson: lessonData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const addLesson = createAsyncThunk(
  "lessons/addLesson",
  async (lessonData, { rejectWithValue }) => {
    try {
      console.log("lessonData", lessonData);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      console.log(lessonData);
      const response = await axios.post(`${MAIN_URL}/lessons`, lessonData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const initialState = {
  lessons: [],
  loading: false,
  error: null,
};

const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = state.lessons.filter(
          (course) => course.id !== action.payload
        );
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = state.lessons.map((course) =>
          course.id === action.payload.id ? action.payload : course
        );
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons.push(action.payload);
      })
      .addCase(addLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default lessonSlice.reducer;
