import axios from "axios";
import { BookResponse, BookResponseFullBook, BookResponseOne, BookSearchParams } from "../types/books.types";
import { handleBooks, handleOneBook } from "../helpers/books.helper";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    params: {
        key: process.env.REACT_APP_API_KEY,
    }
})

export const getBooks = async (params: BookSearchParams) => {
    let query = params.search

    if (params.category != "all") {
        query += `+subject:${params.category}`
    } 
    
    const response = await api.get<BookResponse>("/", {
        params: {
            q: query,
            orderBy: params.orderBy,
            startIndex: params.page,
            maxResults: params.pageSize
        }
    })

    const totalItems = response.data.totalItems
    const items = handleBooks(response.data.items)

    return { items, totalItems }
}

export const getBook = async (bookId: string) => {
    const response = await api.get<BookResponseFullBook>(`/${bookId}`)

    const book = handleOneBook(response.data)

    return book
}