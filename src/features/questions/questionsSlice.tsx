import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultType } from '../../pages/game';

export interface QuestionsState {
  currentQuestion: number;
  questions: ResultType[];
  answers: string[];
}

const initialState: QuestionsState = {
  currentQuestion: 1,
  questions: [],
  answers: [],
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    incrementCurrentQuestion: state => {
      state.currentQuestion += 1;
    },
    saveQuestions: (state, action: PayloadAction<ResultType[]>) => {
      state.questions = action.payload;
    },
    saveAnswer: (state, action: PayloadAction<string>) => {
      state.answers.push(action.payload);
    },
    resetQuestions: state => {
      state.currentQuestion = 1;
      state.questions = [];
      state.answers = [];
    },
  },
});

export const {
  incrementCurrentQuestion,
  saveQuestions,
  saveAnswer,
  resetQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;
