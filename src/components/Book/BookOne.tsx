import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, RootState } from '../../store/store';
import { loadBook } from '../../store/books.slice';
import { Spinner } from 'react-bootstrap';
import noImg from "../../images/no_cover.jpg"

const BookOne = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {bookId} = useParams()
    const {book, status} = useSelector((state: RootState) => state.books)

    useEffect(() => {
        dispatch(loadBook(bookId || ""))
    }, [bookId])
    
    if (!book) {
        return null
    }

    return (
        (status == "pending")? (
            <Spinner animation="border" className='align-self-center mx-3 my-3'/>
        ) : (
            <div className='d-flex flex-row'>
                <div>
                    <img src={book.imageLinks ? book.imageLinks.thumbnail : noImg} className='book-image'/>
                </div>
                <div className=''>
                    <p>Title: {book.title}</p>
                    <p>Description: {book.description}</p>
                    <p>Authors: {book.authors ? book.authors.join(", ") : "No authors"}</p>
                    <p>Pages: {book.pageCount} p.</p>
                    <p>Publisher: {book.publisher}</p>
                    <p>Lang: {book.language}</p>
                </div>
            </div>
        )
    )
}

export default BookOne