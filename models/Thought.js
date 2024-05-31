const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/data')//try dateFormat instead of date

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'whats on your mind?',
      maxLength: 280,
      minLength: 1
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [reactionSchema],

    //students: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'student',
    //   },
    // ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
