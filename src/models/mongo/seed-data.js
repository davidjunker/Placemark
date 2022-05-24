export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      permission: "ADMIN",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  categories: {
    _model: "Category",
    categoryOne: {
      title: "Mountains",
      img: "http://res.cloudinary.com/dgt12krnq/image/upload/v1653385359/a9hjasrujggqvyeogw5a.jpg",
      imgid: "a9hjasrujggqvyeogw5a",
      userid: "->users.homer",
    },
    categoryTwo: {
      title: "Cities",
      userid: "->users.homer",
    },
    categoryFour: {
      title: "Caves",
      userid: "->users.marge",
    },
    categoryFive: {
      title: "Forests",
      userid: "->users.marge",
    },
  },
  pois: {
    _model: "Poi",
    poiOne: {
      name: "Rocky Mountains National Park",
      description: "National Park in Colorado",
      latitude: 40.34,
      longitude: -105.68,
      categoryid: "->categories.categoryOne",
    },
    spotTwo: {
      name: "Zugspitze",
      description: "Highest Mounatin in Germany",
      latitude: 47.42,
      longitude: 10.98,
      categoryid: "->categories.categoryOne",
    },
  },
};
