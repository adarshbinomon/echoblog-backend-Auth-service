import { comparePassword, hashPassword } from "../../../helper";
import { Dependencies } from "../../../utils/dependencies.interface";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt";

export const userLogin_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (email: string, password: string) => {
    try {
      const response = await authenticationRepository?.findUser(email);

      if (response.status) {
        try {
          const { user } = JSON.parse(JSON.stringify(response));

          if (user.isActive) {
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

              delete user.password;
     
              return {
                status: true,
                user: user,
                accessToken: accessToken,
                refreshToken: refreshToken,
              };
            } else {
              return { status: false, message: "incorrect password" };
            }
          } else {
            return {
              status: false,
              message: "Your Account is taken down due to malicious activity!",
            };
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
