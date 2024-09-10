import React from 'react';
import { BookOrderBy, bookOrderBy, bookCategories, BookCategory, BookSearchParams } from '../../types/books.types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setOrder, setCategory, setSearch, loadBooks, setIsNewSearch } from '../../store/books.slice';
import "../../styles/search.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {orderBy, category, search} = useSelector((state: RootState) => state.books)

    const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setOrder(e.target.value as BookOrderBy))
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCategory(e.target.value as BookCategory))
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value))
    }

    const onClickSearchBooks = (e: React.MouseEvent<HTMLElement>) => {
        if (!search.trim()) {
            alert("Sorry, but you can't set empty search string!")
            return
        }

        const params = new BookSearchParams()

        params.search = search
        params.orderBy = orderBy
        params.category = category

        dispatch(setIsNewSearch(true))
        dispatch(loadBooks({params, setEmptyList: true}))
    }

    return (
        <div className='search-bg'>
            <div className='container h-100'>
                <form className='d-flex flex-column align-items-center justify-content-center h-100'>
                    <div className='d-flex flex-row'>
                        <div className='form-group'>
                            <label htmlFor="search-order-id" className='search-color'>Order by</label>
                            <select value={orderBy} onChange={handleOrderChange} className='form-select search-select' id="search-order-id">
                                {
                                    bookOrderBy.map((item, index) => (
                                        <option value={item} key={index.toString()}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='form-group ms-2'>
                            <label htmlFor="search-category-id" className='search-color'>Category</label>
                            <select value={category} onChange={handleCategoryChange} className='form-select search-select' id="search-category-id">
                                {
                                    bookCategories.map((item, index) => (
                                        <option value={item} key={index.toString()}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className='form-group mt-2'>
                        <label htmlFor="search-input-id" className='search-color'>Search</label>

                        <div className='d-flex flex-row'>
                            <input 
                                type="text" 
                                placeholder='Type text here...' 
                                value={search} 
                                onChange={handleSearchChange}
                                id='search-input-id'
                                className='form-control search-input'
                            />

                            <button type='button' className='btn btn-success' onClick={onClickSearchBooks}>
                                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Search