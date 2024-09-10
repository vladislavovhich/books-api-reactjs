import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Spinner } from 'react-bootstrap';
import Book from './Book';
import { loadBooks, setIsNewSearch } from '../../store/books.slice';
import { BookSearchParams } from '../../types/books.types';

const BookList = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {books, totalItems, status, search, orderBy, category, page, pageSize, isNewSearch } = useSelector((state: RootState) => state.books)

    const loadMoreBooks = (e: React.MouseEvent<HTMLElement>) => {
        const params = new BookSearchParams()

        params.search = search
        params.orderBy = orderBy
        params.category = category
        params.page = (page * pageSize) + 1

        dispatch(setIsNewSearch(false))
        dispatch(loadBooks({params, setEmptyList: false}))
    }

    return (
        <div className='container mt-3'>
            <div className='d-flex flex-column'>
                {
                    (status == "pending" && isNewSearch) ? (
                        <Spinner animation="border" className='align-self-center mx-3 my-3'/>
                    ) : (
                        <>
                            {!totalItems ? (
                                <h3 className='text-info'>You haven't search any books yet</h3>
                            ) : (
                                <p>
                                    Found books: {totalItems}
                                </p>
                            )}
                
                            <div className='row justify-content-start'>
                                {
                                    books.map((book, index) => (
                                        <Book {...book} key={index} />
                                    ))
                                }
                            </div>

                            {
                                status == "pending" && (
                                    <Spinner animation="border" />
                                )
                            }

                            {
                                !!books.length && (
                                    <input type='button' value="Load more" onClick={loadMoreBooks} className='btn btn-info my-3'/>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default BookList