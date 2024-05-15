import express from "express";
import { profileController } from "../../libs/controller";
import { Dependencies } from "../../utils/dependencies.interface";

export default (dependencies: Dependencies) => {
  const router = express();

  const {
    createUserController,
    verifyOtpController,
    loginUserController,
    userGoogleLoginController,
    userLogoutController,
    resendOtpController,
    forgotPasswordController,
    verifyForgotPasswordOtpController,changePasswordController
  } = profileController(dependencies);

  router.post("/signup", createUserController);
  router.post("/verify-otp", verifyOtpController);
  router.post("/login", loginUserController);
  router.get("/logout", userLogoutController);
  router.post("/google-login", userGoogleLoginController);
  router.get("/resend-otp", resendOtpController);
  router.post("/forgot-password", forgotPasswordController);
  router.post("/verify-otp-forgot-password", verifyForgotPasswordOtpController);
  router.post("/change-password", changePasswordController);

  return router;
};
