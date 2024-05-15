import { Request, Response } from "express";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { HttpStatus } from "../../../../utils/http.statuscodes.enum";

export default (dependencies: Dependencies) => {
  const {
    useCase: { forgotPasswordUsecase },
  } = dependencies;

  const forgotPasswordController = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      

      const response = await forgotPasswordUsecase(
        dependencies
      ).executeFunction(email);

      if (response.status) {
        req.session.otp = response.otp;
        req.session.email = email

        res.status(HttpStatus.OK).json({ success: true, message: response.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: response.message });
      }
    } catch (error) {
      console.error("Error in sending OTP:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error in sending OTP" });
    }
  };

  return forgotPasswordController;
};
