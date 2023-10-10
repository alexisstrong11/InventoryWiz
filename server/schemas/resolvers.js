const { AuthenticationError } = require('apollo-server-express');
const { User, Inventory, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    searchAllProduct: async (parent, args, context) => {
      const products = await Product.find();
      console.log(products)
      return products

    },
    searchProductUPC: async (parent, { UPC }, context) => {
      const product = await Product.findOne({ UPC: UPC });
      return product
    },
    searchProductName: async (parent, { name }, context) => {
      const product = await Product.findOne({ name: name });
      return product
    },
    searchUser: async (parent, { id }, context) => {
      // if (context.user) {
        const user = await User.findById(id);
        console.log(user)
        return user
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    searchUserByName: async (parent, { username }, context) => {
      // if (context.user) {
        const user = await User.findOne({ username: username });
        return user
      // }
      // throw new AuthenticationError('You need to be logged in!');
    }
  },




  Mutation: {
    saveUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },


    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    createNewInventory: async (parent, { inventoryName }, context ) => {
      console.log(inventoryName )
      // if (context.user) {
        const inventory = await Inventory.create({ inventoryName });
        return inventory
      // const user = await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $addToSet: { inventories: inventory._id } },
        //   { new: true }
        // );
      // throw new AuthenticationError('You need to be logged in!');

    },

    createNewProduct: async (parent, { productInput }, context) => {
      // if (context.user) {
        const product = await Product.create(productInput);
        return product
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    // saveInventoryToUser: async (parent, { _id }, context) => {
    //   if (context.user) {
    //     return User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { inventories: _id } },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    // Set up mutation so a logged in user can only remove their user and no one else's
    // removeUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findOneAndDelete({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // Make it so a logged in user can only remove a book from their own user

    saveProductToInventory: async (parent, { inventoryId, productId }, context) => {
      // if (context.user) {
        let inventory = await Inventory.findByIdAndUpdate(
          { _id: inventoryId },
          { $push: { products: productId } },
          { new: true,
           }
        );
        return inventory
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    removeProductFromInventory: async (parent, { inventoryId, productId }, context) => {
      //if (context.user) {
        return Inventory.findByIdAndUpdate(
          { _id: inventoryId },
          { $pull: { 
            productList: { 
              _id : productId 
            } 
          }},
          { new: true }
        );
      // }
      // throw new AuthenticationError('You need to be logged in!');
   },

  }
};

module.exports = resolvers;


