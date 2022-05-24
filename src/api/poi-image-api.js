import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ImageSpec, ImageSpecPlus, ImageArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

export const poiImageApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const images = await db.imageStore.getAllImages();
        return images;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ImageArraySpec, failAction: validationError },
    description: "Get all images",
    notes: "Returns all images",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const image = await db.imageStore.getImageById(request.params.id);
        if (!image) {
          return Boom.notFound("No image with this id");
        }
        return image;
      } catch (err) {
        return Boom.serverUnavailable("No image with this id");
      }
    },
    tags: ["api"],
    description: "Find an image",
    notes: "Returns an image",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ImageSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const file = request.payload.imagefile;
        console.log(file);
        if (Object.keys(file).length <= 0) {
          return Boom.badImplementation("error creating image");
        }
        const response = await imageStore.uploadImage(request.payload.imagefile);
        const image = { img: response.url, imgid: response.public_id, poiid: request.params.id };
        const returnedImage = await db.imageStore.addImage(request.params.id, image);
        if (returnedImage) {
          return h.response(poi).code(201);
        }
        return Boom.badImplementation("error creating image");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
    tags: ["api"],
    description: "Create an image",
    notes: "Returns the newly created image",
    response: { schema: ImageSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const image = await db.imageStore.getImageById(request.params.id);
        if (!image) {
          return Boom.notFound("No image with this id");
        }

        await imageStore.deleteImage(image.imgid);
        await db.imageStore.deleteImage(image._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No image with this id");
      }
    },
    tags: ["api"],
    description: "Delete an image",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const images = await db.imageStore.getAllImages();
        if (images.length > 0) {
          for (let i = 0; i < images.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await imageStore.deleteImage(images[i].imgid);
          }
        }
        await db.imageStore.deleteAllImages();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  tags: ["api"],
  description: "Delete all images",
};
