const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    _id: ID
    UPC: String
    brand: [String]
    price: Float
    description: String
    name: String
    image: String
    link: String
    category: [String]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    inventories: [Inventory]
  }

  type Inventory {
    _id: ID
    inventoryName: String
    priceTotal: Float
    products: [Product]!
  }

  input InventoryInput {
    inventoryName: String!
    products: [ProductInput]!
  }

  input ProductInput {
    UPC: String
    brand: [String]
    price: Float!
    description: String
    name: String!
    image: String
    link: String
    category: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {

    loginUser(email: String!, password: String!): Auth
    saveUser(username: String!, email: String!, password: String!): Auth
    createInventory(inventoryName: String!): Inventory
    saveInventoryToUser(inventories: InventoryInput): User
    saveProductToInventory(input: ProductInput): Inventory
    removeProductFromInventory(_id: ID!): Inventory
  }
`;

module.exports = typeDefs;
