import mongoose from "mongoose";

const conversationSchema =new mongoose.Schema({

 userId:{
  type:String,
  required:true
 },

 title:{
  type:String,
  default:"New Chat"
 }

},{
 timestamps:true
});

const Conversation= mongoose.model("Conversation",conversationSchema);
export default Conversation