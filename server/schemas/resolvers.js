const User = require("../models/User");
const Dealer = require("../models/Dealer");
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

    addDealer: async (parent, { firstName, lastName, email }, context) => {
      if(context.user)
      try {
        const dealer = await Dealer.create({
          firstName,
          lastName,
          email,
          supervisorId: context.user._id,
        });
        console.log(dealer);
        return { dealer };
      } catch (err) {
        console.error(err);
        throw new Error("Error creating dealer");
      }
    },
  },
};

module.exports = resolvers;
