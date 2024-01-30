import { Router } from "express";
import { authRouter } from "./modules/auth/auth.router.js";

export const apiRoutes = Router();

apiRoutes.use("/auth", authRouter);
apiRoutes.use("/user", authRouter);


