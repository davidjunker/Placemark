import { userMongoStore } from "./mongo/user-mongo-store.js";
import { categoryMongoStore } from "./mongo/category-mongo-store.js";
import { poiMongoStore } from "./mongo/poi-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  categoryStore: null,
  poiStore: null,

  init() {
    this.userStore = userMongoStore;
    this.categoryStore = categoryMongoStore;
    this.poiStore = poiMongoStore;
    connectMongo();
  },
};
