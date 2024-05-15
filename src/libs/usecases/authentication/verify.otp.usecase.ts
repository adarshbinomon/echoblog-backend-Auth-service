import { createAccessToken, createRefreshToken } from "../../../utils/jwt";
import { UserData } from "../../../utils/interface";
import { Dependencies } from "../../../utils/dependencies.interface";

export const verifyOtp_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (
    data: UserData,
    otp: string,
    enteredOtp: string
  ) => {
    try {
      console.log("otp", otp);
      console.log("entered otp", enteredOtp);

      if (enteredOtp === otp) {
        const addUserData = await authenticationRepository?.createUser(data);

        if (addUserData?.status) {
          const accessToken = createAccessToken(
            addUserData,
            process.env.ACCESS_SECRET_KEY || "accesssecret",
            process.env.ACCESS_TOKEN_EXPIRY || "1h"
          );
          const refreshToken = createRefreshToken(
            addUserData,
            process.env.REFRESH_SECRET_KEY || "refreshsecret",
            process.env.REFRESH_TOKEN_EXPIRY || "30days"
          );

          return {
            status: true,
            user: addUserData,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        } else {
          return { status: false, message: "User creation failed" };
        }
      } else {
        return { status: false, message: "OTP entered is incorrect" };
      }
    } catch (error) {
      console.error("Error in verifyOtp_useCase:", error);
      throw error;
    }
  };

  return { executeFunction };
};
