import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import { QUERY_ALL_PRODUCT } from '../util/queries';
import { useLazyQuery } from '@apollo/client';
import Product from './productDisplay/Product.component'
import AddProduct from './AddProduct'
//import { saveInventory, getInventories } from '../util/localStorage';



const SearchProducts = () => {
  const [searchedProductData, setSearchedProductData] = useState([]);

  console.log(searchedProductData)

  const [searchInput, setSearchInput] = useState('');
  const [ getAllProducts, {loading, error}] = useLazyQuery(QUERY_ALL_PRODUCT)
  
 
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
          UPC: item.UPC || 'No UPC to display',
          price: item.price || 'No price to display',
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
      <AddProduct />
    </Container>

    </div>
      <Container fluid="true">
      {searchedProductData.map((productData) => {
        return(<Product key="productData.productId" productData={productData} />)
      })}
      </Container>
    </>
  );
};

export default SearchProducts;


