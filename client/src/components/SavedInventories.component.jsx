import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_PRODUCT_FROM_INVENTORY } from '../util/mutations';
import { QUERY_ME } from '../util/queries';
import Auth from '../util/auth';
import { removeProductId } from '../util/localStorage';

const Inventories = () => {
  const [removeBook, { error }] = useMutation(REMOVE_PRODUCT_FROM_INVENTORY);
  const { loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    if (data?.me) {
      setUserData(data.me);
    }
  }, [data]);
  
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleRemoveBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removeBook({
        variables: {
          bookId: bookId }
        });

      // upon success, remove book's id from localStorage
      
      removeProductId(bookId);
      setUserData(response.data.removeBook)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.inventories?.length
            ? `Viewing ${userData.inventories?.length} saved ${userData.inventories?.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.inventories?.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleRemoveBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Inventories;
