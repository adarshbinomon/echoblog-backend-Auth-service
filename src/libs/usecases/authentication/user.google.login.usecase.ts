import { createAccessToken, createRefreshToken } from "../../../utils/jwt";
import { UserData } from "../../../utils/interface";
import { Dependencies } from "../../../utils/dependencies.interface";
import { hashPassword, sendPasswordMail } from "../../../helper";

export const userGoogleLogin_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: UserData) => {
    try {

      const existingUser = await authenticationRepository?.findUser(data.email);

      if (existingUser.status) {
        const accessToken = createAccessToken(
          existingUser,
          process.env.ACCESS_SECRET_KEY || "accesssecret",
          process.env.ACCESS_TOKEN_EXPIRY || "1h"
        );
        const refreshToken = createRefreshToken(
          existingUser,
          process.env.REFRESH_SECRET_KEY || "refreshsecret",
          process.env.REFRESH_TOKEN_EXPIRY || "30days"
        );

        return {
          status: true,
          user: existingUser,
          accessToken,
          refreshToken,
          message: "Login using Google success",
        };
      } else {
        const password = await hashPassword(data.email)
        data = { ...data, password: password, phone: '' }
        const newUser = await authenticationRepository?.createUser(data);

        if (newUser?.status) {
          const accessToken = createAccessToken(
            newUser,
            process.env.ACCESS_SECRET_KEY || "accesssecret",
            process.env.ACCESS_TOKEN_EXPIRY || "1h"
          );
          const refreshToken = createRefreshToken(
            newUser,
            process.env.REFRESH_SECRET_KEY || "refreshsecret",
            process.env.REFRESH_TOKEN_EXPIRY || "30days"
          );

          await sendPasswordMail(data.email, data.name);

          return {
            status: true,
            user: newUser,
            accessToken,
            refreshToken,
            message: "User created and login using Google success",
          };
        }
      }
    } catch (error) {
      console.error("Error in userGoogleLogin_useCase:", error);
      throw error;
    }
  };

  return { executeFunction };
};
