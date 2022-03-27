import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  questionsAmount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'boolean' | 'multiple';
}

const initialState: SettingsState = {
  questionsAmount: 10,
  difficulty: 'hard',
  type: 'boolean',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeQuestionAmount: (state, action: PayloadAction<number>) => {
      state.questionsAmount = action.payload;
    },
    changeDifficulty: (
      state,
      action: PayloadAction<'easy' | 'medium' | 'hard'>
    ) => {
      state.difficulty = action.payload;
    },
    changeQuestionType: (
      state,
      action: PayloadAction<'boolean' | 'multiple'>
    ) => {
      state.type = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeQuestionAmount, changeDifficulty, changeQuestionType } =
  settingsSlice.actions;

export default settingsSlice.reducer;
