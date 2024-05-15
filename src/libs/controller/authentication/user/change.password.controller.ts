import { Request, Response } from "express";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { HttpStatus } from "../../../../utils/http.statuscodes.enum";

export default (dependencies: Dependencies) => {
  const {
    useCase: { changePasswordUsecase },
  } = dependencies;

  const changePasswordController = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const email = req.session.email;

      const response = await changePasswordUsecase(
        dependencies
      ).executeFunction(email, password);

      if (response.status) {
        res.status(HttpStatus.NO_CONTENT).json(response);
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
      }
    } catch (error) {
      console.log("error in change password controller:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: "error in changing password" });
    }
  };
  return changePasswordController;
};
