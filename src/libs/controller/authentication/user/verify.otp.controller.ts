import { Response, Request } from "express";
import { userProducer } from "../../../../events/userProduces";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { HttpStatus } from "../../../../utils/http.statuscodes.enum";

export default (dependencies: Dependencies) => {
  const {
    useCase: { verifyOtp_useCase },
  } = dependencies;

  const verifyOtp = async (req: Request, res: Response) => {
    try {
      const enteredOtp = req.body.enteredOtp;
      const otp = String(req.session.otp);
      const userData = req.session.userData;

      const response = await verifyOtp_useCase(dependencies).executeFunction(
        userData,
        otp,
        enteredOtp
      );
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
          JSON.stringify(response.user.response)
        );

        delete userDataForResponse.password;
        delete userDataForResponse.isGoogle;
        delete userDataForResponse.__v;
        delete userDataForResponse.uid;

        await userProducer(userDataForResponse, "authTopic", "createUser");
        res.status(HttpStatus.CREATED).json({
          status: true,
          accessToken: accessToken,
          user: userDataForResponse,
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({ status: false, message: response.message });
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ status: false, message: "error in verify otp" });
    }
  };

  return verifyOtp;
};
