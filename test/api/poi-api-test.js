import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, rockyMountains, testPois, mountains } from "../fixtures.js";

suite("Poi API tests", () => {
  let user = null;
  let mountainCategory = null;

  setup(async () => {
    user = await placemarkService.createUser(maggie);
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllPois();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    mountains.userid = user._id;
    mountainCategory = await placemarkService.createCategory(mountains);
  });

  teardown(async () => {});

  test("create poi", async () => {
    const returnedPoi = await placemarkService.createPoi(mountainCategory._id, rockyMountains);
    assertSubset(mountains, returnedPoi);
  });

  test("create Multiple pois", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoi(mountainCategory._id, testPois[i]);
    }
    const returnedPois = await placemarkService.getAllPois();
    assert.equal(returnedPois.length, testPois.length);
    for (let i = 0; i < returnedPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const poi = await placemarkService.getPoi(returnedPois[i]._id);
      assertSubset(poi, returnedPois[i]);
    }
  });

  test("delete poi", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoi(mountainCategory._id, testPois[i]);
    }
    let returnedPois = await placemarkService.getAllPois();
    assert.equal(returnedPois.length, testPois.length);
    for (let i = 0; i < returnedPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const poi = await placemarkService.deletePoi(returnedPois[i]._id);
    }
    returnedPois = await placemarkService.getAllPois();
    assert.equal(returnedPois.length, 0);
  });

  test("denormalised category", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPoi(mountainCategory._id, testPois[i]);
    }
    const returnedCategory = await placemarkService.getCategory(mountainCategory._id);
    assert.equal(returnedCategory.pois.length, testPois.length);
    for (let i = 0; i < testPois.length; i += 1) {
      assertSubset(testPois[i], returnedCategory.pois[i]);
    }
  });
});
