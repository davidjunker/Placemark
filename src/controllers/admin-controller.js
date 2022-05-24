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
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admin-dashboard");
    },
  },
};
