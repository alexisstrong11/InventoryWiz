import { useState } from 'react';
import { removeProductId } from '../../util/localStorage';
import Product from './Product.component';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_PRODUCT_FROM_INVENTORY } from '../../util/mutations';import { QUERY_ME } from '../../util/queries';
0

const Inventory = ({ inventoryData }) => {
  

  
  

  



  return (
    <div>
      {inventoryData.map((productData) => {
        return(<Product key="productData.productId" productData={productData} />)
      })}
    </div>
  );
};

export default Inventory;


