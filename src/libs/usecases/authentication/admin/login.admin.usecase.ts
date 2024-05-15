import { comparePassword, hashPassword } from "../../../../helper";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { createAccessToken, createRefreshToken } from "../../../../utils/jwt";

export const adminLogin_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (email: string, password: string) => {
    try {
      
      const response = await authenticationRepository?.findAdmin(email);

      if (response.status) {
        try {
          const { user } = response;

          const passwordValidation = await comparePassword(
            password,
            user.password
          ); 

          if (passwordValidation) {
            const accessToken = createAccessToken(
              user,
              process.env.ACCESS_SECRET_KEY || "accesssecret",
              process.env.ACCESS_TOKEN_EXPIRY || "1h"
            );
            const refreshToken = createRefreshToken(
              user,
              process.env.REFRESH_SECRET_KEY || "refreshsecret",
              process.env.REFRESH_TOKEN_EXPIRY || "30days"
            );
            return {
              status: true,
              user: user,
              adminAccessToken: accessToken,
              adminRefreshToken: refreshToken,
            };
          } else {
            return { status: false, message: "incorrect password" };
          }
        } catch (error) {
          return { status: false, message: "incorrect email or password1" };
        }
      } else {
        return { status: false, message: "incorrect email or password2" };
      }
    } catch (error) {
      return { status: false, message: "incorrect email or password3" };
    }
  };
  return { executeFunction };
};
