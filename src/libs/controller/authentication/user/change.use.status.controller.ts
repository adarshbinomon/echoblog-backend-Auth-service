import { Request, Response } from "express";
import { changeUserStatus } from "../../../../events/changeUserStatus";
import { clearAccessTokenFromCookie } from "../../../../utils/jwt";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { HttpStatus } from "../../../../utils/http.statuscodes.enum";

export default (dependencies: Dependencies) => {
  const {
    useCase: { changeUserStatus_useCase },
  } = dependencies;

  const changeUserStatusAdminController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { userId } = req.params;
      const response = await changeUserStatus_useCase(
        dependencies
      ).executeFunction(userId);

      if (response.status) {
        clearAccessTokenFromCookie("accessToken", res);
        clearAccessTokenFromCookie("refreshToken", res);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        changeUserStatus(
          {
            _id: userId,
            name: "",
            email: "",
            password: "",
          },
          "changeUserStatus",
          "statuschange"
        );
        res.status(HttpStatus.CREATED).json({
          status: true,
          message: response.message,
          user: response.user,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: response.message });
      }
    } catch (error) {
      console.log("error in change user status controller:", error);
      return { status: true, message: "error in changing status" };
    }
  };
  return changeUserStatusAdminController;
};
