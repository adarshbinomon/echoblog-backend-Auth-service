import { Request, Response } from "express";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { userProducer } from "../../../../events/userProduces";
import { HttpStatus } from "../../../../utils/http.statuscodes.enum";

export default (dependencies: Dependencies) => {
  const {
    useCase: { userGoogleLogin_useCase },
  } = dependencies;

  const googleLogin = async (req: Request, res: Response) => {
    try {
      const data = { ...req.body };

      const response = await userGoogleLogin_useCase(
        dependencies
      ).executeFunction(data);

      if (response.status) {
        const { user, accessToken, refreshToken } = response;


        req.session.refreshToken = refreshToken;
        const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        res.cookie("accessToken", accessToken, {
          expires: expirationDate,
          httpOnly: true,
          secure: true,
        });

        const userDataForResponse = JSON.parse(
          JSON.stringify(response.user.user)
        );

        delete userDataForResponse.password;
        delete userDataForResponse.isGoogle;
        delete userDataForResponse.__v;
        delete userDataForResponse.uid;

        await userProducer(userDataForResponse, "authTopic", "createUser");

        res
          .status(HttpStatus.OK)
          .json({ status: true, accessToken: accessToken, user: user.user });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({ status: false, message: response.message });
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ status: false, message: "error in google login" });
    }
  };
  return googleLogin;
};
