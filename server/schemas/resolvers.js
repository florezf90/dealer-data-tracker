const User = require("../models/User");
const Dealer = require('../models/Dealer');
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { email }) => {
      return User.findOne({ email: email });
    },
    //uses context of JWT to get info
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    dealers: async () => {
      try {
        const dealers = await Dealer.find();
        return dealers;
      } catch (err) {
        throw new Error('Failed to fetch dealers');
      }
    }
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      try {
        const user = await User.create({
          firstName,
          lastName,
          email,
          password,
        });
        console.log(user);
        const token = signToken(user); // Passing the user object to signToken
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new Error("Error creating user");
      }
    },

    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addDealer: async (_, { firstName, lastName, email }) => {
      try {
        const newDealer = await Dealer.create({
          firstName,
          lastName,
          email,
        });
        return newDealer;
      } catch (error) {
        console.error('Error adding dealer:', error);
        throw new Error('Unable to add dealer');
      }
    },
  }
};

module.exports = resolvers;