import { Request, Response } from "express";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { HttpStatus } from "../../../../utils/http.statuscodes.enum";

export default (dependencies: Dependencies) => {
  const {
    useCase: { userLogin_useCase },
  } = dependencies;

  const userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const response = await userLogin_useCase(dependencies).executeFunction(
        email,
        password
      );

      if (response.status) {
        const { user, accessToken, refreshToken } = response;
        const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        res.cookie("accessToken", accessToken, {
          expires: expirationDate,
          httpOnly: true,
          secure: true,
        });
        res.cookie("refreshToken", refreshToken, {
          expires: expirationDate,
          httpOnly: true,
          secure: true,
        });
        res
          .status(HttpStatus.OK)
          .json({ status: true, accessToken: accessToken, user: user });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: response.message });
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ status: false, message: "error in user login" });
    }
  };

  return userLogin;
};
