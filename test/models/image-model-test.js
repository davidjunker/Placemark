import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategories, testPois, testImages, imageOne, otherMountains, mountains, rockyMountains } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Image Model tests", () => {
  let mountainList = null;
  let poiList = null;

  setup(async () => {
    db.init();
    await db.categoryStore.deleteAllCategories();
    await db.poiStore.deleteAllPois();
    await db.imageStore.deleteAllImages();
    mountainList = await db.categoryStore.addCategory(mountains);
    poiList = await db.poiStore.addPoi(mountainList._id, rockyMountains);
    for (let i = 0; i < testImages.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testImages[i] = await db.imageStore.addImage(poiList._id, testImages[i]);
    }
  });

  test("create single image", async () => {
    const poi = await db.poiStore.addPoi(mountainList._id, rockyMountains);
    const image = await db.imageStore.addImage(poi._id, imageOne);
    assert.isNotNull(image._id);
    assertSubset(imageOne, image);
  });

  test("delete all images", async () => {
    const images = await db.imageStore.getAllImages();
    assert.equal(testImages.length, images.length);
    await db.imageStore.deleteAllImages();
    const newImages = await db.imageStore.getAllImages();
    assert.equal(0, newImages.length);
  });

  test("get a image - success", async () => {
    const poi = await db.poiStore.addPoi(mountainList._id, rockyMountains);
    const image = await db.imageStore.addImage(poi._id, imageOne);
    const newImage = await db.imageStore.getImageById(image._id);
    assertSubset(imageOne, newImage);
  });

  test("delete One Image - success", async () => {
    const id = testImages[0]._id;
    await db.imageStore.deleteImage(id);
    const images = await db.imageStore.getAllImages();
    assert.equal(images.length, testImages.length - 1);
    const deletedImage = await db.imageStore.getImageById(id);
    assert.isNull(deletedImage);
  });

  test("get an image - bad params", async () => {
    assert.isNull(await db.imageStore.getImageById(""));
    assert.isNull(await db.imageStore.getImageById());
  });

  test("delete One Image - fail", async () => {
    await db.imageStore.deleteImage("bad-id");
    const images = await db.imageStore.getAllImages();
    assert.equal(images.length, testImages.length);
  });
});
