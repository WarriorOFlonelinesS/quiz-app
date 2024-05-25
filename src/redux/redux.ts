// actions.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getQuizzes = createAsyncThunk('quizzes/getQuizzes', async () => {
  // Fetch quizzes from API
  const response = await fetch('/api/quizzes');
  return await response.json();
});

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addQuiz: (state:any, action:any) => {
      state.items.push(action.payload);
    },
    updateQuiz: (state:any, action:any) => {
      const index = state.items.findIndex((quiz:any) => quiz.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteQuiz: (state:any, action:any) => {
      state.items = state.items.filter((quiz:any) => quiz.id !== action.payload);
    },
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(getQuizzes.pending, (state:any) => {
        state.loading = true;
      })
      .addCase(getQuizzes.fulfilled, (state:any, action:any) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getQuizzes.rejected, (state:any, action:any) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { addQuiz, updateQuiz, deleteQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
