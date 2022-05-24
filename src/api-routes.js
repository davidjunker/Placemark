import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { poiApi } from "./api/poi-api.js";
import { poiImageApi } from "./api/poi-image-api.js";
import { analyticsApi } from "./api/analytics-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "PUT", path: "/api/users/{id}", config: userApi.updateUser },

  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
  { method: "GET", path: "/api/categories", config: categoryApi.find },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },

  { method: "GET", path: "/api/pois", config: poiApi.find },
  { method: "GET", path: "/api/pois/{id}", config: poiApi.findOne },
  { method: "POST", path: "/api/categories/{id}/pois", config: poiApi.create },
  { method: "DELETE", path: "/api/pois", config: poiApi.deleteAll },
  { method: "DELETE", path: "/api/pois/{id}", config: poiApi.deleteOne },

  { method: "GET", path: "/api/images", config: poiImageApi.find },
  { method: "GET", path: "/api/images/{id}", config: poiImageApi.findOne },
  { method: "POST", path: "/api/pois/{id}/images", config: poiImageApi.create },
  { method: "DELETE", path: "/api/images", config: poiImageApi.deleteAll },
  { method: "DELETE", path: "/api/images/{id}", config: poiImageApi.deleteOne },

  { method: "GET", path: "/api/admin/{id}/analytics", config: analyticsApi.getAnalytics },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
];
