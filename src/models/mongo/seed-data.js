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
    categoryThree: {
      title: "Forests",
      userid: "->users.marge",
    },
    categoryFour: {
      title: "Caves",
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
    poiTwo: {
      name: "Zugspitze",
      description: "Highest Mounatin in Germany",
      latitude: 47.42,
      longitude: 10.98,
      categoryid: "->categories.categoryOne",
    },
    poiThree: {
      name: "Regensburg",
      description: "City in Germany",
      latitude: 49.01,
      longitude: 12.1,
      categoryid: "->categories.categoryTwo",
    },
    poiFour: {
      name: "Rainforest",
      description: "Forest in Brasil",
      latitude: -2.16,
      longitude: -55.12,
      categoryid: "->categories.categoryThree",
    },
  },
  images: {
    _model: "Image",
    imageOne: {
      img: "http://res.cloudinary.com/dgt12krnq/image/upload/v1653895767/tkyrjkedsesmsjwv3yru.jpg",
      imgid: "tkyrjkedsesmsjwv3yru",
      poiid: "->pois.poiOne",
    },
    imageTwo: {
      img: "http://res.cloudinary.com/dgt12krnq/image/upload/v1653895827/h4tepenayuz1ec8hfgvb.webp",
      imgid: "h4tepenayuz1ec8hfgvb",
      poiid: "->pois.poiOne",
    },
    imageThree: {
      img: "http://res.cloudinary.com/dgt12krnq/image/upload/v1653895870/ikibagowm5kbpmsqtbnt.jpg",
      imgid: "ikibagowm5kbpmsqtbnt",
      poiid: "->pois.poiOne",
    },
    imageFour: {
      img: "http://res.cloudinary.com/dgt12krnq/image/upload/v1653896050/awck1o6y5brysuifxc7l.jpg",
      imgid: "awck1o6y5brysuifxc7l",
      poiid: "->pois.poiTwo",
    },
    imageFive: {
      img: "http://res.cloudinary.com/dgt12krnq/image/upload/v1653896068/vsgeckjlvrdad8rnqgoe.jpg",
      imgid: "vsgeckjlvrdad8rnqgoe",
      poiid: "->pois.poiTwo",
    },
    imageSix: {
      img: "http://res.cloudinary.com/dgt12krnq/image/upload/v1653896270/n9tmjqvpjjlklo9qdevf.jpg",
      imgid: "n9tmjqvpjjlklo9qdevf",
      poiid: "->pois.poiThree",
    },
    imageSeven: {
      img: "http://res.cloudinary.com/dgt12krnq/image/upload/v1653896285/ozfwaxnfaffs0v8cuug1.jpg",
      imgid: "ozfwaxnfaffs0v8cuug1",
      poiid: "->pois.poiThree",
    },
    imageEight: {
      img: "http://res.cloudinary.com/dgt12krnq/image/upload/v1653896791/gwh4suaodtyq1djtpjwe.jpg",
      imgid: "gwh4suaodtyq1djtpjwe",
      poiid: "->pois.poiFour",
    },
    imageNine: {
      img: "http://res.cloudinary.com/dgt12krnq/image/upload/v1653896800/eopbmxypzhepph9nq366.jpg",
      imgid: "eopbmxypzhepph9nq366",
      poiid: "->pois.poiFour",
    },
  },
};
