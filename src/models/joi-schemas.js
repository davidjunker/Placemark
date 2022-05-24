import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    permission: Joi.string().example("ADMIN"),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const ImageSpec = Joi.object()
  .keys({
    img: Joi.string().example("http://res.cloudinary.com/dgt12krnq/image/upload/v1653305374/l8g5kbztpmt3pcgcnngs.jpg").required(),
    imgid: Joi.string().example("l8g5kbztpmt3pcgcnngs").required(),
    poiid: IdSpec,
  })
  .label("Image");

export const ImageSpecPlus = ImageSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ImagePlus");

export const ImageArraySpec = Joi.array().items(ImageSpecPlus).label("ImageArray");

export const PoiSpec = Joi.object()
  .keys({
    name: Joi.string().example("Rocky Mountain National Park").required(),
    description: Joi.string().allow("").example("National Park in Colorado").optional(),
    latitude: Joi.number().example(40.34).required(),
    longitude: Joi.number().example(-105.68).required(),
    categoryid: IdSpec,
    images: ImageArraySpec,
  })
  .label("Poi");

export const PoiSpecPlus = PoiSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PoiPlus");

export const PoiArraySpec = Joi.array().items(PoiSpecPlus).label("PoiArray");

export const CategorySpec = Joi.object()
  .keys({
    title: Joi.string().example("Mountains").required(),
    img: Joi.string().example("http://res.cloudinary.com/dgt12krnq/image/upload/v1653394810/qbkrfajcubzxnudvhh7r.webp"),
    imgid: Joi.string().example("qbkrfajcubzxnudvhh7r"),
    userid: IdSpec,
    pois: PoiArraySpec,
  })
  .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const statsSpec = Joi.object()
  .keys({
    averageCategoriesPerUser: Joi.number().example(3),
    averagePoisPerUser: Joi.number().example(5),
    averagePoisPerCategory: Joi.number().example(2),
    leastCategories: Joi.number().example(0),
    mostCategories: Joi.number().example(10),
  })
  .label("Stats");

export const AnalyticsSpec = Joi.object()
  .keys({
    users: UserArray,
    categories: CategoryArraySpec,
    pois: PoiArraySpec,
    stats: statsSpec,
  })
  .label("Analytics");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
