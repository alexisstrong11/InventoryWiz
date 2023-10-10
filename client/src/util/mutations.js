import { gql } from '@apollo/client';


export const SAVE_USER = gql`
mutation SaveUser($username: String!, $email: String!, $password: String!) {
  saveUser(username: $username, email: $email, password: $password) {
    token
    user {
    inventories {
      priceTotal
      products {
        _id
        UPC
        brand
        price
        description
        name
        image
        link
        category
      }
      inventoryName
      _id
    }
    email
    _id
    username
  }
  }
}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
    inventories {
      priceTotal
      products {
        _id
        UPC
        brand
        price
        description
        name
        image
        link
        category
      }
      inventoryName
      _id
    }
    email
    _id
    username
  }
  }
}
`;

export const CREATE_PRODUCT = gql`
  mutation SaveBook($input: BookInput) {
    createNewProduct(productInput: $productInput) {
    _id
    UPC
    brand
    price
    description
    name
    image
    link
    category
  }
}
`;

export const CREATE_INVENTORY = gql`
mutation Mutation($inventoryName: String!, $userId: ID!) {
  createNewInventory(inventoryName: $inventoryName, userId: $userId) {
    _id
    username
    email
    password
    inventories {
      _id
      userId
      inventoryName
      priceTotal
      products {
        _id
        UPC
        brand
        price
        description
        name
        image
        link
        category
      }
    }
  }
}
`;

export const ADD_PRODUCT_TO_INVENTORY = gql`
  mutation AddProductToInventory($inventoryId: String!, $productId: String!) {
    addProductToInventory(inventoryId: $inventoryId, productId: $productId) {
    _id
    inventoryName
    products {
      UPC
      brand
      price
      description
      name
      image
      link
      category
    }
    priceTotal
  }
  }
`;

export const REMOVE_PRODUCT_FROM_INVENTORY = gql`
  mutation RemoveProductFromInventory($inventoryId: String!, $productId: String!) {
    removeProductFromInventory(inventoryId: $inventoryId, productId: $productId) {
    _id
    inventoryName
    products {
      _id
      UPC
      brand
      price
      description
      name
      image
      link
      category
    }
    priceTotal
  }
  }
  `;