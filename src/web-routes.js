import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { poiController } from "./controllers/poi-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },

  { method: "GET", path: "/admin-dashboard", config: adminController.index },
  { method: "GET", path: "/admin-dashboard/deleteuser/{id}", config: adminController.deleteUser },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addpoi", config: categoryController.addPoi },
  { method: "GET", path: "/category/{id}/deletepoi/{poiid}", config: categoryController.deletePoi },
  { method: "POST", path: "/category/{id}/uploadimage", config: categoryController.uploadImage },
  { method: "GET", path: "/category/{id}/deleteimage", config: categoryController.deleteImage },

  { method: "GET", path: "/poi/{id}", config: poiController.index },
  { method: "GET", path: "/poi/{id}/editpoi/{poiid}", config: poiController.index },
  { method: "POST", path: "/poi/{id}/updatepoi/{poiid}", config: poiController.update },
  { method: "POST", path: "/poi/{id}/uploadimage", config: poiController.uploadImage },
  { method: "GET", path: "/poi/{id}/deleteimage/{imgid}", config: poiController.deleteImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
