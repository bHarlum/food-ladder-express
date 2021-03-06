const {Schema} = require("mongoose");

const NotificationSchema = new Schema({
  
  category: {
    type: String,
    // TODO: ADD MORE ENUM VALUES FOR NOTIFICATION
    enum: ["threadReply", "reportDue", "reportOverdue"],
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = NotificationSchema;