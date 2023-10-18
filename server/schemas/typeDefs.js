const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    _id: ID
    UPC: String
    brand: String
    price: Float!
    description: String
    name: String!
    image: String
    link: String
    category: [String]
    quantity: Int
  }

  input ProductInput {
    UPC: String
    brand: String
    price: Float!
    description: String
    name: String!
    image: String
    link: String
    category: [String]
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    inventories: [Inventory!]
  }

  type Inventory {
    _id: ID
    inventoryName: String
    priceTotal: Float
    productCount: Int
    products: [Product!]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    searchAllProduct: [Product]
    searchProductUPC: [Product]
    searchProductName: [Product]
    searchUser(id: ID!): User
    searchUserByName(username: String!): User
  }

  type Mutation {

    loginUser(email: String!, password: String!): Auth
    saveUser(username: String!, email: String!, password: String!): Auth
    createNewProduct(productInput: ProductInput): User
    createNewInventory(inventoryName: String!): User
    removeInventory(inventoryId: ID!): User
    addInventoryToUser(inventoryId: ID!, userId: ID!): User
    removeInventoryFromUser(_id: ID!, inventoryId: ID!): User
    addProductToInventory(inventoryId: ID!, productInput: ProductInput!): Inventory
    removeProductFromInventory(inventoryId: ID!, productId: ID!, quantity: Int): Inventory
    
  }
`;

module.exports = typeDefs;
