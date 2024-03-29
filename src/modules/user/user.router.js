import { Router } from "express"
import { httpGetCurrentUser, httpUpdateUser } from "./user.controller.js"
import { protect } from "../../common/middlewares/protect.js"

export const userRouter = Router()

userRouter.use(protect)

userRouter.get("/me", httpGetCurrentUser)
userRouter.patch("/me", httpUpdateUser)