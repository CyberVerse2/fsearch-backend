import { Router } from "express"
import { httpGetCurrentUser, httpUpdateUser } from "./user.controllers.js"
import { protect } from "../../common/middlewares/protect.js"

export const userRouter = Router()

userRouter.use(protect)

userRouter.get("/me", httpGetCurrentUser)
// userRouter.get('face')
userRouter.patch("/me", httpUpdateUser)