import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    placemarkService.clearAuth();
    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await placemarkService.createUser(testUsers[i]);
    }
    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await placemarkService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await placemarkService.deleteAllUsers();
    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await placemarkService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("delete a user", async () => {
    const user = await placemarkService.getUser(users[0]._id);
    const allUsers = await placemarkService.getAllUsers();
    assert.equal(allUsers.length, 4);
    await placemarkService.deleteUser(user._id);
    const returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await placemarkService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await placemarkService.deleteAllUsers();
    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    try {
      const returnedUser = await placemarkService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("update a user", async () => {
    const newUser = await placemarkService.createUser(maggie);
    maggie.firstName = "margold";
    newUser.firstName = "margold";
    const updatedUser = await placemarkService.updateUser(newUser._id, maggie);
    const getUpdatedUser = await placemarkService.getUser(newUser._id);
    assertSubset(getUpdatedUser, updatedUser);
  });
});
