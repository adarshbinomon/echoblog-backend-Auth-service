import { Response, Request } from "express";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { HttpStatus } from "../../../../utils/http.statuscodes.enum";

export default (dependencies: Dependencies) => {
  const {
    useCase: { addUser_useCases },
  } = dependencies;

  const createUserController = async (req: Request, res: Response) => {
    try {
      const data = {
        ...req.body,
        profilePicture:
          "https://echoblog-images.s3.ap-south-1.amazonaws.com/1709811864797_profilePicture_dummy-profile.png",
        uid: "",
        isGoogle: false,
      };

      const response = await addUser_useCases(dependencies).executeFunction(
        data
      );

      req.session.otp = response.otp;
      req.session.userData = response.user;

      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: `otp sent to ${response.user.email}`,
        });
      } else if (response.status1) {
        res.status(HttpStatus.OK).json({
          status1: true,
          message: response.message,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: false,
          message: response.message,
        });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "error in google login",
      });
    }
  };
  return createUserController;
};
