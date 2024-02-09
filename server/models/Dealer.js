const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const DealerSchema = new Schema ({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    },
    reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }]
  });

  const Dealer = model('Dealer', DealerSchema);

  module.exports = Dealer;