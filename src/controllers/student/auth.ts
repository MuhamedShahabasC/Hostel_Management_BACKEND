import asyncHandler from "express-async-handler";

// Student sign up
export const newStudent = asyncHandler((req, res) => {
    res.json('signup student')
})