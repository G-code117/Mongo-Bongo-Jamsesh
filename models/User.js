const { Schema, model } = require('mongoose');
const {use} = require('../routes');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "must match email address"]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }],
      friends: [
        {
        type: Schema.Types.ObjectId,
        ref: "User"
        }
      ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function() {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
