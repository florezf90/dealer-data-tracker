const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        profile: async (parent, { profileId }) => {
            return User.findOne({ _id: profileId });
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
            const profile = await User.create({ firstName, lastName, email, password });
            const token = signToken(profile);
            return { token, profile };
    },
    }//mutation end placeholder
    
//     login: async (parent, { email, password }) => {
//       const profile = await User.findOne({ email });

//       if (!profile) {
//         throw AuthenticationError;
//       }

//       const correctPw = await profile.isCorrectPassword(password);

//       if (!correctPw) {
//         throw AuthenticationError;
//       }

//       const token = signToken(profile);
//       return { token, profile };
//      }

};

module.exports = resolvers;
