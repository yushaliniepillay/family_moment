import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  name: { type: String, required:  true },
  id: { type: String },
  selectedFile: {
      type: [String],
      default: []
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

var ImagePost = mongoose.model('ImagePost', imageSchema);

export default ImagePost;