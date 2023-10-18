import React, { useState, useEffect } from 'react';
import {
  Container,

} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_INVENTORY } from '../util/mutations';
import { QUERY_ME } from '../util/queries';
import Bar from './inventories/Toolbar.component';
import InventoryCard from './inventories/InventoryCard.component';



const Inventories = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [ userData, setUserData ] = useState({});
  const [ removeInventory ] = useMutation(REMOVE_INVENTORY);
  const [ inventoriesData, setInventoriesData ] = useState([]);

  useEffect(() => {

    if (data?.me) {
      setUserData(data?.me);
      setInventoriesData(data?.me.inventories);


      





    }
    
    
  }, [data]);


  

  const handleRemoveInventory = async (inventoryId) => {
    try {
      await removeInventory({
        variables: { inventoryId }
      });
    } catch (err) {
      console.error(err);
    }
  };

  


  
  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (userData.inventories?.length === 0) ? (
        <div>
          <h2 className="text-center">You have no saved Inventories!</h2>
        </div>
      ) : (    
        inventoriesData?.map((inventory) => {
          return(
            <InventoryCard key={inventory._id} inventory={inventory} removeInventory={handleRemoveInventory}/>
          )
        })
      )}
      <Bar />
    </Container>
  );
};

export default Inventories;
