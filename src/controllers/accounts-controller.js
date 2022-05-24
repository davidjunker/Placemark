import { db } from "../models/db.js";
import { UserSpec, UserSpecPlus, UserCredentialsSpec } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Placemark" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Placemark" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Placemark" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  showAccount: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "Account",
        user: user,
      };
      return h.view("account-view", viewData);
    },
  },

  updateAccount: {
    validate: {
      payload: UserSpecPlus,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("account-view", { title: "Error", errors: error.details }).takeover.code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const updatedUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };
      try {
        await db.userStore.updateUser(loggedInUser._id, updatedUser);
      } catch (error) {
        console.log(error);
      }
      return h.redirect("/account");
    },
  },

  deleteAccount: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userCategories = await db.categoryStore.getUserCategories(loggedInUser._id);
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
      await db.userStore.deleteUserById(loggedInUser._id);
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
};
