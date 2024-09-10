import { Action, configureStore, createAsyncThunk, ThunkAction } from '@reduxjs/toolkit'
import { booksSlice } from './books.slice'

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export default store