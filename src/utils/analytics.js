import { db } from "../models/db.js";

export const analytics = {
  async calculateAnalytics() {
    const averageCategoriesPerUser = await analytics.averageCategoriesPerUser();
    const averagePoisPerUser = await analytics.averagePoisPerUser();
    const averagePoisPerCategory = await analytics.averagePoisPerCategory();
    const leastCategories = await analytics.leastCategories();
    const mostCategories = await analytics.mostCategories();

    return { averageCategoriesPerUser, averagePoisPerUser, averagePoisPerCategory, leastCategories, mostCategories };
  },

  async averageCategoriesPerUser() {
    const users = await db.userStore.getAllUsers();
    const categories = await db.categoryStore.getAllCategories();
    return parseFloat(users.length / categories.length).toFixed(2);
  },

  async averagePoisPerUser() {
    const users = await db.userStore.getAllUsers();
    const pois = await db.poiStore.getAllPois();
    return parseFloat(users.length / pois.length).toFixed(2);
  },

  async averagePoisPerCategory() {
    const pois = await db.poiStore.getAllPois();
    const categories = await db.categoryStore.getAllCategories();
    return parseFloat(categories.length / pois.length).toFixed(2);
  },

  async leastCategories() {
    let minValue;
    const users = await db.userStore.getAllUsers();
    if (users) {
      const startUserCategories = await db.categoryStore.getUserCategories(users[0]._id);
      minValue = startUserCategories.length;
      for (let i = 0; i < users.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const userCategories = await db.categoryStore.getUserCategories(users[i]._id);
        if (userCategories.length < minValue) {
          minValue = userCategories.length;
        }
      }
    } else {
      minValue = 0;
    }
    return minValue;
  },

  async mostCategories() {
    let maxValue = 0;
    const users = await db.userStore.getAllUsers();
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const userCategories = await db.categoryStore.getUserCategories(users[i]._id);
      if (userCategories.length > maxValue) {
        maxValue = userCategories.length;
      }
    }
    return maxValue;
  },
};
