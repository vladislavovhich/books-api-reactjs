import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Book, BookCategory, BookOne, BookOrderBy, BookSearchParams, LoadBooksParams } from "../types/books.types"
import { createAppAsyncThunk, GetThunkState, ThunkType } from "./withTypes"
import { getBook, getBooks } from "../api/api"

interface BookState {
    page: number
    pageSize: number
    orderBy: BookOrderBy 
    category: BookCategory 
    search: string 
    books: Book[]
    totalItems: number
    status: 'idle' | 'pending' | 'succeeded' | 'rejected'
    error: string | null
    isNewSearch: boolean,
    book: BookOne | null
}

const state: BookState = {
    page: 0,
    pageSize: 30,
    orderBy: "relevance",
    category: "all",
    search: "",
    books: [],
    totalItems: 0,
    status: 'idle',
    error: null,
    isNewSearch: false,
    book: null
}

export const loadBooks = createAppAsyncThunk(
    'books/get-books',
    async (params: LoadBooksParams) => {
        const books = await getBooks(params.params)

        return {books: books.items.map(item => ({...item})), totalItems: books.totalItems, setEmptyList: params.setEmptyList}
    }
)

export const loadBook = createAppAsyncThunk(
    'books/get-book',
    async (bookId: string) => {
        const book = await getBook(bookId)

        return {...book}
    }
)

export const booksSlice = createSlice({
    name: "books",
    initialState: state,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload
        },
        
        setCategory(state, action: PayloadAction<BookCategory>) {
            state.category = action.payload
        },

        setOrder(state, action: PayloadAction<BookOrderBy>) {
            state.orderBy = action.payload
        },

        setIsNewSearch(state, action: PayloadAction<boolean>) {
            state.isNewSearch = action.payload
        }
    },
    extraReducers: builder => {
        builder

        .addCase(loadBook.pending, (state, action) => {
            state.status = 'pending'
        })

        .addCase(loadBook.fulfilled, (state, action) => {
            state.status = 'succeeded'
            
            const book = action.payload

            state.book = book
        })

        .addCase(loadBook.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error.message ?? 'Unknown Error'
        })


        .addCase(loadBooks.pending, (state, action) => {
            state.status = 'pending'
        })

        .addCase(loadBooks.fulfilled, (state, action) => {
            state.status = 'succeeded'
            
            const {books, totalItems, setEmptyList} = action.payload

            if (setEmptyList) {
                state.books = [...books]
            } else {
                state.books = [...state.books, ...books]
            }

            state.page = state.page + 1
            state.totalItems = totalItems
        })

        .addCase(loadBooks.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error.message ?? 'Unknown Error'
        })
    }
})

export const {setSearch, setCategory, setOrder, setIsNewSearch} = booksSlice.actions