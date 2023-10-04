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
  },

  Mutation: {
    saveUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    createNewInventory: async (parent, { inventoryName }) => {
      const inventory = await Inventory.create({ inventoryName });
      return inventory
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

    saveProductToInventory: async (parent, { inventoryId, input }, context) => {
      // if (context.user) {
        let user =  await Inventory.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: { inventory: input },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(user)
        return user
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    removeProductFromInventory: async (parent, { inventoryId, productId }, context) => {
      //if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { 
            inventory: { 
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


    // Set up mutation so a logged in user can only remove their user and no one else's
    // removeUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findOneAndDelete({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // Make it so a logged in user can only remove a book from their own user