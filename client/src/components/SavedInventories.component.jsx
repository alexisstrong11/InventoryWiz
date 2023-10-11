import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../util/queries';
import InventoryCard from './productDisplay/InventoryCard.component';

import Auth from '../util/auth';
//import { removeProductId } from '../util/localStorage';


const Inventories = () => {
  const {loading, data } = useQuery(QUERY_ME);
  const [userInventoryData, setUserInventoryData] = useState({});
  console.log(data);
  useEffect(() => {
    if (data?.me?.inventories) {
      console.log(data.me.inventories);
      setUserInventoryData(data.me.inventories);
    }
  }, [data]);

  return (
    <>
      <Container>
        {/* {userInventoryData.map((inventoryData) => {
          return(<InventoryCard key="inventoryData.inventoryId" inventoryData={inventoryData} />)
        })} */}
      </Container>
    </>
  );
};

export default Inventories;
