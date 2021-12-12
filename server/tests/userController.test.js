jest.mock("jsonwebtoken", () => ({
    verify: jest.fn().mockImplementation(() => ({id: "mockUserID"}))
}))

const { getCurrentUser } = require("../controllers/userController")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

jest.mock("../models/user.model", () => ({
    findById: jest.fn().mockImplementation(() => Promise.resolve())
}))

const mockRequest = {
    headers: {
        "x-access-token": "mockAccessToken"
    }
}

const mockResponse = { json: jest.fn() }

beforeEach(() => {
    User.findById.mockReset()
})

it("getCurrentUser calls jwt verify function", async () => {
    getCurrentUser(mockRequest, mockResponse)
    expect(jwt.verify).toHaveBeenCalledTimes(1)
})

it("getCurrentUser calls User.findById function", async () => {
    getCurrentUser(mockRequest, mockResponse)
    expect(User.findById).toHaveBeenCalledTimes(1)
})
