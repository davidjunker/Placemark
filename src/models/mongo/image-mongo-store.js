import { Image } from "./image.js";

export const imageMongoStore = {
  async getAllImages() {
    const images = await Image.find().lean();
    return images;
  },

  async addImage(poiId, image) {
    image.poiid = poiId;
    const newImage = new Image(image);
    const imageObj = await newImage.save();
    return this.getImageById(imageObj._id);
  },

  async getImagesByPoiId(id) {
    const images = await Image.find({ poiid: id }).lean();
    return images;
  },

  async getImageById(id) {
    if (id) {
      const image = await Image.findOne({ _id: id }).lean();
      return image;
    }
    return null;
  },

  async deleteImage(id) {
    try {
      await Image.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllImages() {
    await Image.deleteMany({});
  },

  async updateImage(image, updatedImage) {
    image.img = updatedImage.img;
    image.imgid = updatedImage.imgid;
    await image.save();
  },
};
