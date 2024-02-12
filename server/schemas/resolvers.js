const User = require("../models/User");
const Dealer = require('../models/Dealer');
const Report = require("../models/Report");
const transporter = require("../utils/email");

const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { email }) => {
      return User.findOne({ email: email }).populate({
        path: "dealers",
        populate: {
          path: "reports",
          model: "Report",
        },
      });
    },

    //uses context of JWT to get info
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: "dealers",
          populate: {
            path: "reports",
            model: "Report",
          },
        });
      }
      throw AuthenticationError;
    },
    dealers: async () => {
      try {
        const dealers = await Dealer.find().populate("reports");
        return dealers;
      } catch (err) {
        throw new Error("Failed to fetch dealers");
      }
    },
    dealer: async (_, { email, _id }) => {
      try {
        const dealer = await Dealer.findOne({ _id: _id }).populate("reports");
        return dealer;
      } catch (err) {
        throw new Error("Failed to fetch dealers");
      }
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

    addDealer: async (_, { firstName, lastName, email }, context) => {
      try {
        const newDealer = await Dealer.create({
          firstName,
          lastName,
          email,
        });

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { dealers: newDealer._id } },
          { new: true }
        );
        console.log(newDealer);
        return newDealer;
      } catch (error) {
        console.error("Error adding dealer:", error);
        throw new Error("Unable to add dealer");
      }
    },

    removeDealer: async (parent, { _id }, context) => {
      if (context.user) {
        return await Dealer.findOneAndDelete({ _id });
      } else {
        throw AuthenticationError;
      }
    },

    addReport: async (
      _,
      { dealerId, handsDealt, promotionTaken, moneyTaken }
    ) => {
      try {
        console.log(0);
        const newReport = await Report.create({
          dealerId,
          handsDealt,
          promotionTaken,
          moneyTaken,
        });

        const dealer = await Dealer.findOneAndUpdate(
          { _id: dealerId },
          { $push: { reports: newReport._id } },
          { new: true }
        );

        console.log(newReport);
        console.log(1);
        return newReport;
      } catch (error) {
        console.error("Error adding report:", error);
        throw new Error("Unable to add report");
      }
    },


    sendEmail: async (_, { input: { fullname, contactMethod, email, phone, subject, message  } }) => {
      try {
        const mailOptions = {
          from: email,
          to: "florezf90@gmail.com",
          subject: subject,
          text: `Name: ${fullname}\nContact Method: ${
            contactMethod === "email" ? "Email" : "Phone"
          } - ${
            contactMethod === "email" ? email : phone
          }\nMessage: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('error sending email:',error);
            throw new Error('Error sending email');
          } else {
            console.log('Email sent:', info.response)
          }
        });
        return 'email sent successfully';
      } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Error sending email");
      }
    },
  },
};

module.exports = resolvers;