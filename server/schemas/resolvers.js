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
//     },

//     // Add a third argument to the resolver to access data in our `context`
//     addSkill: async (parent, { profileId, skill }, context) => {
//       // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
//       if (context.user) {
//         return User.findOneAndUpdate(
//           { _id: profileId },
//           {
//             $addToSet: { skills: skill },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       }
//       // If user attempts to execute this mutation and isn't logged in, throw an error
//       throw AuthenticationError;
//     },
//     // Set up mutation so a logged in user can only remove their profile and no one else's
//     removeUser: async (parent, args, context) => {
//       if (context.user) {
//         return User.findOneAndDelete({ _id: context.user._id });
//       }
//       throw AuthenticationError;
//     },
//     // Make it so a logged in user can only remove a skill from their own profile
//     removeSkill: async (parent, { skill }, context) => {
//       if (context.user) {
//         return User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $pull: { skills: skill } },
//           { new: true }
//         );
//       }
//       throw AuthenticationError;
//     },
//   },
};

module.exports = resolvers;
