import React from 'react';
import { Book as BookType } from '../../types/books.types';
import { Badge, Button, Card } from 'react-bootstrap';
import noImg from "../../images/no_cover.jpg"
import "../../styles/book.css"
import { Link } from 'react-router-dom';

const Book = (props: BookType) => {
    return (
        <Card style={{ width: '18rem' }} className='col-3 book mt-3 ms-3'>
            <Card.Img variant='top' src={props.imageLinks ? props.imageLinks.thumbnail : noImg} className='book-image'/>
            <Card.Body>
                <Card.Title>
                    {props.authors ? props.authors.join(", ") : "No author"}
                    {props.categories && (
                        <div className='d-flex flex-row my-2'>
                            {
                                props.categories.map((category, index) => (
                                    <Badge bg="secondary" key={`${index}`}>{category}</Badge>
                                ))
                            }
                        </div>
                    )}
                </Card.Title>
                <Card.Body className='d-flex flex-column'>
                    <Link to={`/books/${props.id}`} className='btn btn-primary'>More...</Link>
                </Card.Body>

            </Card.Body>
        </Card>
    )
}

export default Book