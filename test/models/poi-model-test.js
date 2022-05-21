import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategories, testPois, otherMountains, mountains, rockyMountains, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Poi Model tests", () => {
  let mountainList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.poiStore.deleteAllPois();
    mountainList = await db.categoryStore.addCategory(mountains);
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPois[i] = await db.poiStore.addPoi(mountainList._id, testPois[i]);
    }
  });

  test("create single poi", async () => {
    const otherMountainList = await db.categoryStore.addCategory(otherMountains);
    const poi = await db.poiStore.addPoi(otherMountainList._id, rockyMountains);
    assert.isNotNull(poi._id);
    assertSubset(rockyMountains, poi);
  });

  test("delete all pois", async () => {
    const pois = await db.poiStore.getAllPois();
    assert.equal(testPois.length, pois.length);
    await db.poiStore.deleteAllPois();
    const newPois = await db.poiStore.getAllPois();
    assert.equal(0, newPois.length);
  });

  test("get a poi - success", async () => {
    const otherMountainList = await db.categoryStore.addCategory(otherMountains);
    const poi = await db.poiStore.addPoi(otherMountainList._id, rockyMountains);
    const newPoi = await db.poiStore.getPoiById(poi._id);
    assertSubset(rockyMountains, newPoi);
  });

  test("delete One Poi - success", async () => {
    const id = testPois[0]._id;
    await db.poiStore.deletePoi(id);
    const pois = await db.poiStore.getAllPois();
    assert.equal(pois.length, testCategories.length - 1);
    const deletedPoi = await db.poiStore.getPoiById(id);
    assert.isNull(deletedPoi);
  });

  test("get a poi - bad params", async () => {
    assert.isNull(await db.poiStore.getPoiById(""));
    assert.isNull(await db.poiStore.getPoiById());
  });

  test("delete One Poi - fail", async () => {
    await db.poiStore.deletePoi("bad-id");
    const pois = await db.poiStore.getAllPois();
    assert.equal(pois.length, testCategories.length);
  });
});
