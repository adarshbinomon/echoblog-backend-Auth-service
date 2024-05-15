import { Request, Response } from "express";
import { clearAccessTokenFromCookie } from "../../../../utils/jwt";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { HttpStatus } from "../../../../utils/http.statuscodes.enum";

export default (dependencies: Dependencies) => {
  const userLogoutController = (req: Request, res: Response) => {
    try {
      clearAccessTokenFromCookie("adminAccessToken", res);
      res.clearCookie("adminAccessToken");
      req.session.userData = undefined;

      res.status(HttpStatus.OK).json({ status: true, message: "Logout success" });
    } catch (error) {
      console.log("err", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };
  return userLogoutController;
};
