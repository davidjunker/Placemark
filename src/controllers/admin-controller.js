import { db } from "../models/db.js";
import { analytics } from "../utils/analytics.js";

export const adminController = {
  // index function sending data inluding analytics data through to view.
  index: {
    plugins: {
      hacli: {
        permissions: ["ADMIN"],
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const categories = await db.categoryStore.getAllCategories();
      const pois = await db.poiStore.getAllPois();
      const stats = await analytics.calculateAnalytics();
      const viewData = {
        title: "Admin Dashboard",
        users: users,
        categories: categories,
        pois: pois,
        stats: stats,
      };
      return h.view("admin-dashboard-view", viewData);
    },
  },
  // function allowing a user to be deleted
  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      const userCategories = await db.categoryStore.getUserCategories(user._id);
      for (let i = 0; i < userCategories.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const userPois = await db.poiStore.getPoisByCategoryId(userCategories[i]._id);
        for (let j = 0; j < userPois.length; j += 1) {
          // eslint-disable-next-line no-await-in-loop
          const userImages = await db.imageStore.getImagesByPoiId(userPois[j]._id);
          for (let k = 0; k < userImages.length; k += 1) {
            // eslint-disable-next-line no-await-in-loop
            await db.imageStore.deleteImage(userImages[k]._id);
          }
          // eslint-disable-next-line no-await-in-loop
          await db.poiStore.deletePoi(userPois[j]._id);
        }
        // eslint-disable-next-line no-await-in-loop
        await db.categoryStore.deleteCategory(userCategories[i]._id);
      }
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admin-dashboard");
    },
  },
};
