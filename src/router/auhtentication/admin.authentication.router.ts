import express from "express";
import { profileController } from "../../libs/controller";
import { Dependencies } from "../../utils/dependencies.interface";

export default (dependencies: Dependencies) => {
  const router = express();

  const {
    adminLoginController,
    adminLogoutController,
    changeUserStatusAdminController,
  } = profileController(dependencies);

  router.post("/login", adminLoginController);
  router.get("/logout", adminLogoutController);
  router.put("/change-user-status/:userId", changeUserStatusAdminController);

  return router;
};
