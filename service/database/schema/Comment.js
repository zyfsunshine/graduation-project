const mongoose = require('mongoose') //引入Mongoose
const Schema = mongoose.Schema //声明Schema

const CommentSchema = new Schema({
  message_nickname: {
    type: String
  },
  message_content: {
    type: String
  },
  message_post_time: {
    type: Date,
    default: Date.now()
  },
  message_pid: {
    type: String
  },
  id: {
    type: Number
  },
  message_key: {
    type: String
  }

})
//模型化
mongoose.model('Comment', CommentSchema);
