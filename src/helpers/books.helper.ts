import { Book, BookOne, BookResponseFullBook, BookResponseOne } from "../types/books.types";

export const handleBooks = (items: BookResponseOne[]) => {
    return items.map(item => {
        return new Book(
            item.id, 
            item.volumeInfo.title, 
            item.volumeInfo.subtitle, 
            item.volumeInfo.description,
            item.volumeInfo.authors,
            item.volumeInfo.categories,
            item.volumeInfo.imageLinks,
            item.volumeInfo.language,
            item.volumeInfo.pageCount,
            item.volumeInfo.publisher
        )
    })
}

export const handleOneBook = (item: BookResponseFullBook) => {
    return new BookOne(
        item.id, 
        item.volumeInfo.title, 
        item.volumeInfo.subtitle, 
        item.volumeInfo.description,
        item.volumeInfo.authors,
        item.volumeInfo.categories,
        item.volumeInfo.imageLinks,
        item.volumeInfo.language,
        item.volumeInfo.pageCount,
        item.volumeInfo.publisher
    )
}