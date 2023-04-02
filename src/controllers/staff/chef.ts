import expressAsyncHandler from "express-async-handler";

export const newMealPlan = expressAsyncHandler(async (req, res)=>{
    
    res.json(req.params.email)
})