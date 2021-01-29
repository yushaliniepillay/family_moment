import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    name: { type: String, required: true },
    creator: { type: String, required: true },
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;