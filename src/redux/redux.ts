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
    addQuiz: (state, action) => {
      state.items.push(action.payload);
    },
    updateQuiz: (state, action) => {
      const index = state.items.findIndex(quiz => quiz.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteQuiz: (state, action) => {
      state.items = state.items.filter(quiz => quiz.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizzes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getQuizzes.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { addQuiz, updateQuiz, deleteQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
