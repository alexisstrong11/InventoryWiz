import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../util/auth';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { CREATE_PRODUCT } from '../util/mutations';
import { QUERY_ALL_PRODUCT } from '../util/queries';
import Product from './productDisplay/Product.component'
//import { saveInventory, getInventories } from '../util/localStorage';



const SearchProducts = () => {
  const [searchedProductData, setSearchedProductData] = useState([]);

  console.log(searchedProductData)

  const [searchInput, setSearchInput] = useState('');
  const [ getAllProducts, {loading, error}] = useLazyQuery(QUERY_ALL_PRODUCT)
  


  // //const [savedProductIds, setSavedProductIds] = useState(getInventories());

  // const [saveItem, { error, data }] = useMutation(CREATE_PRODUCT);

  // // save `savedProductIds` list to localStorage on component unmount
  // useEffect(() => {
  //   console.log(searchedProducts)
  //   //return () => saveInventory(savedProductIds);
  // });

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // if (!searchInput) {
    //   return false;
    // }
    
    let data = await getAllProducts()
    let productData = data.data.searchAllProduct
    try {

        const itemData = productData.map((item) => ({
          productId: item._id,
          UPC: item.UPC || ['No UPC to display'],
          name: item.name,
          brand: item.brand,
          description: item.description,
          image: item.image || `https://picsum.photos/200?random=${item._id}` ,
          link: item.link || '#',
          
        }));
        console.log(itemData)
        setSearchedProductData(itemData);
        setSearchInput('');
      } catch (err) {
        console.error(err);
      }
    }




  // create function to handle saving a item to our database
  // const handleSaveItem = async (productId) => {
    // // find the item in `searchedProducts` state by the matching id
    // let productToSave = searchedProducts.find((item) => item.productId === productId);

    // // get token
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    // try {
    //   productToSave = {
    //     productId : productToSave.productId,
    //     authors: productToSave.authors ? productToSave.authors : 'Data not available',
    //     description: productToSave.description ? productToSave.description : 'Description not available',
    //     title: productToSave.title ? productToSave.title : 'Title not available',
    //     image: productToSave.image ? productToSave.image : 'Image not available',
    //     link: productToSave.link ? productToSave.link : 'Link not available',
    //   }
    //   const user = await saveItem({
    //     variables: { 
    //       input: productToSave },
    //   });
    //   // if item successfully saves to user's account, save item id to state
    //   setSavedProductIds([...savedProductIds, productToSave.productId]);
    // } catch (err) {
    //   console.error(err);
    // }
  //};

  return (
    <>
    {console.log(searchedProductData)}
    <div className='text-light bg-dark pt-5'>
    <Container>
      <h1>Search for Items!</h1>
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Col xs={12} md={8}>
            <Form.Control
              name='searchInput'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='text'
              size='lg'
              placeholder='Search for a item'
            />
          </Col>
          <Col xs={12} md={4}>
            <Button type='submit' variant='success' size='lg'>
              Submit Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>

    </div>
    <Row>
      {searchedProductData.map((productData) => {
        return(<Product key="productData._id" productData={productData} />)
      })}
    </Row>
    </>
  );
};

export default SearchProducts;


{/* <div className='text-light bg-dark pt-5'>
<Container>
  <h1>Search for Items!</h1>
  <Form onSubmit={handleFormSubmit}>
    <Row>
      <Col xs={12} md={8}>
        <Form.Control
          name='searchInput'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type='text'
          size='lg'
          placeholder='Search for a item'
        />
      </Col>
      <Col xs={12} md={4}>
        <Button type='submit' variant='success' size='lg'>
          Submit Search
        </Button>
      </Col>
    </Row>
  </Form>
</Container>
</div>

<Container>
<h2 className='pt-5'>
  {searchedProducts.length
    ? `Viewing ${searchedProducts.length} results:`
    : 'Search for a item to begin'}
</h2>
<Row>
  {searchedProducts.map((item) => {
    return (
      <Col key={item.productId} md="4">
        <Card border='dark'>
          {item.image ? (
            <Card.Img src={item.image} alt={`The cover for ${item.title}`} variant='top' />
          ) : null}
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <p className='small'>Authors: {item.authors}</p>
            <Card.Text>{item.description}</Card.Text>
            {Auth.loggedIn() && (
              <Button
                disabled={savedProductIds?.some((savedProductId) => savedProductId === item.productId)}
                className='btn-block btn-info'
                onClick={() => handleSaveItem(item.productId)}>
                {savedProductIds?.some((savedProductId) => savedProductId === item.productId)
                  ? 'This item has already been saved!'
                  : 'Save this Item!'}
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  })}
</Row>
</Container> */}