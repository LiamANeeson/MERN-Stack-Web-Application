const { getPosts } = require("../controllers/postController");
const Post = require("../models/post.model");

jest.mock("../models/post.model", () => ({
  find: jest.fn().mockImplementation(() => Promise.resolve()),
}))

it("getPosts calls Post model's find() function", async () => {
  const mockResponse = { json: jest.fn() }  // res argument in getPosts() needs to have a .json() attribute because it's called when returning
  getPosts(null, mockResponse)

  expect(Post.find).toHaveBeenCalledTimes(1)
})
