import { sendMail } from "../../../helper";
import { Dependencies } from "../../../utils/dependencies.interface";
import { UserData } from "../../../utils/interface";

export const resendOtp_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (user: UserData) => {
    try {
      const otp = await sendMail(user.email, user.name);
      console.log(otp);
    

      if (otp) {
        return {
          status: true,
          user: user,
          message: `OTP sent to ${user.email}`,
          otp: otp,
        };
      } else {
        return {
          status: false,
          message: "Failed to send OTP",
        };
      }
    } catch (error) {
      return {
        status: false,
        message: "An error occurred while sending OTP",
      };
    }
  };

  return { executeFunction };
};
