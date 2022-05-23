import Mongoose from "mongoose";

const { Schema } = Mongoose;

const imageSchema = new Schema({
  img: String,
  imgid: String,
  poiid: {
    type: Schema.Types.ObjectId,
    ref: "Poi",
  },
});

export const Image = Mongoose.model("Image", imageSchema);
