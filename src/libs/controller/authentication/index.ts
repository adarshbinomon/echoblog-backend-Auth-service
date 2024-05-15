import create_user_controller from "./user/create.user.controller";
import verify_otp_controller from "./user/verify.otp.controller";
import login_user_controller from "./user/login.user.controller";
import admin_login_controller from "./admin/admin.login.controller";
import user_google_login_controller from "./user/user.google.login.contoller";
import user_logout_controller from "./user/user.logout.controller";
import admin_logout_controller from "./admin/admin.logout.controller";
import resend_otp_controller from "./user/resend.otp.controller";
import forgotPasswordController from "./user/forgot.password.controller";
import verifyForgotPasswordOtpController from "./user/verify.forgot.password.otp.controller";
import changePasswordController from "./user/change.password.controller";
import changeUserStatusAdminController from "./user/change.use.status.controller"
import { Dependencies } from "../../../utils/dependencies.interface";


export default (dependencies: Dependencies) => {
  return {
    createUserController: create_user_controller(dependencies),
    verifyOtpController: verify_otp_controller(dependencies),
    loginUserController: login_user_controller(dependencies),
    adminLoginController: admin_login_controller(dependencies),
    userGoogleLoginController: user_google_login_controller(dependencies),
    userLogoutController: user_logout_controller(dependencies),
    adminLogoutController: admin_logout_controller(dependencies),
    resendOtpController: resend_otp_controller(dependencies),
    forgotPasswordController: forgotPasswordController(dependencies),
    verifyForgotPasswordOtpController:
      verifyForgotPasswordOtpController(dependencies),
    changePasswordController: changePasswordController(dependencies),
    changeUserStatusAdminController: changeUserStatusAdminController(dependencies)
  };
};
