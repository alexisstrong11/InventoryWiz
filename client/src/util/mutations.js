import { gql } from '@apollo/client';


export const SAVE_USER = gql`
mutation SaveUser($username: String!, $email: String!, $password: String!) {
  saveUser(username: $username, email: $email, password: $password) {
    user {
      inventories {
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
          quantity
        }
        priceTotal
        inventoryName
        _id
      }
      email
      _id
      username
    }
    token
  }
}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
    user {
      _id
      username
      email
      inventories {
        _id
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
          quantity
        }
      }
    }
    token
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
    quantity
  }
}
`;

export const CREATE_INVENTORY = gql`
mutation CreateNewInventory($inventoryName: String!) {
  createNewInventory(inventoryName: $inventoryName) {
    _id
    username
    email
    password
    inventories {
      _id
      inventoryName
      priceTotal
      productCount
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
        quantity
      }
    }
  }
}
`;

export const REMOVE_INVENTORY = gql`
mutation removeInventory($inventoryId: ID!) {
  removeInventory(inventoryId: $inventoryId) {
    _id
    username
    email
    password
    inventories {
      _id
      inventoryName
      priceTotal
      productCount
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
        quantity
      }
    }
  }
}
`;

export const ADD_PRODUCT_TO_INVENTORY = gql`
  mutation AddProductToInventory($inventoryId: ID!, $productId: ID!) {
    addProductToInventory(inventoryId: $inventoryId, productId: $productId) {
    _id
    inventoryName
    priceTotal
    productCount
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
      quantity
    }
  }
}
`;

export const REMOVE_PRODUCT_FROM_INVENTORY = gql`
  mutation RemoveProductFromInventory($inventoryId: ID!, $productId: ID!) {
    removeProductFromInventory(inventoryId: $inventoryId, productId: $productId) {
    _id
    inventoryName
    priceTotal
    productCount
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
      quantity
    }
  }
}
  `;