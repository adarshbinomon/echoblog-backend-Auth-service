import { Request, Response } from "express";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { HttpStatus } from "../../../../utils/http.statuscodes.enum";

export default (dependencies: Dependencies) => {
  const {
    useCase: { verifyForgotPasswordOtp },
  } = dependencies;

  const verifyForgotPasswordOtpController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { enteredOtp } = req.body;


      const response = await verifyForgotPasswordOtp(
        dependencies
      ).executeFunction(
        enteredOtp as number,
        req.session.otp as unknown as number
      );

      if (response.status) {
        res.status(HttpStatus.OK).json(response);
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "Internal server error" });
    }
  };

  return verifyForgotPasswordOtpController;
};
