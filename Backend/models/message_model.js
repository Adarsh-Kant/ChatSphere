import mongoose from 'mongoose';
const messageSchema=mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type: String,
        required: true,
        trim: true,
        maxLength: 500,
        validate:[
            {
                validator: function(v){
                    return v.length>0;
                },
                message: props => `Message cannot be empty` 
            }
        ]
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{timestamps: true});
const Message=mongoose.model("Message",messageSchema);
export default Message;