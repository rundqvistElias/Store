import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../src/app/store';
import { getArticles } from './articleAPI';

export interface Article {
  id?: number;
  article_title: string;
  article_price: number;
  
}

interface ArticleState{
    articles: Article[]
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ArticleState = {
  articles: [] as Article[],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAsync = createAsyncThunk(
  '',
  async () => {
    const res = await getArticles();
    return res
  }
);



export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addArticle: (state, action) => {
      state.articles = [...state.articles, action.payload]
    },
    removeArticle: (state, action) => {
      state.articles = state.articles.filter(article => article.id !== action.payload)
    }
    },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.articles = [...action.payload].sort()
      })
      .addCase(getAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

//export const { } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectArticle = (state: RootState) => state.articles;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default articleSlice.reducer;

export const {addArticle, removeArticle} = articleSlice.actions