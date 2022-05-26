import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { AnalyticsSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { analytics } from "../utils/analytics.js";

export const analyticsApi = {
  getAnalytics: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const admin = await db.userStore.getUserById(request.params.id);
        if (!admin) {
          return Boom.notFound("No User with this id");
        }
        if (admin.permission !== "ADMIN") {
          return Boom.forbidden("No permission to analytics");
        }
        const users = await db.userStore.getAllUsers();
        const categories = await db.categoryStore.getAllCategories();
        const pois = await db.poiStore.getAllPois();
        const images = await db.imageStore.getAllImages();
        const stats = await analytics.calculateAnalytics();
        const viewData = {
          users: users,
          categories: categories,
          pois: pois,
          images: images,
          stats: stats,
        };
        return viewData;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get analytics",
    notes: "Returns analytics",
    response: { schema: AnalyticsSpec, failAction: validationError },
  },
};
