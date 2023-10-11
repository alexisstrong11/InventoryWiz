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
  }

  input ProductInput {
    UPC: String!
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
    inventories: [Inventory]
  }

  type Inventory {
    _id: ID!
    inventoryName: String!
    priceTotal: Float
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
    createNewProduct(productInput: ProductInput): Product
    createNewInventory(inventoryName: String!): Inventory
    addInventoryToUser(inventoryId: ID!, userId: ID!): User
    saveProductToInventory(inventoryId: ID!, productId: ID!): Inventory
    removeProductFromInventory(_id: ID!, productId: ID!): Inventory
  }
`;

module.exports = typeDefs;
