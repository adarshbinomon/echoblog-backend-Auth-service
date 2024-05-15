import { Request, Response } from "express";
import { Dependencies } from "../../../../utils/dependencies.interface";
import { HttpStatus } from "../../../../utils/http.statuscodes.enum";

export default (dependencies: Dependencies) => {
  const {
    useCase: { adminLogin_useCase },
  } = dependencies;

  const adminLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await adminLogin_useCase(dependencies).executeFunction(
      email,
      password
    );
    

    if (response.status) {
      const { user, adminAccessToken, adminRefreshToken } = response;
      req.session.adminRefreshToken = adminRefreshToken;
      const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      res.cookie("adminAccessToken", adminAccessToken, {
        expires: expirationDate,
        httpOnly: true,
        secure: true,
      });
      res
        .status(HttpStatus.CREATED)
        .json({ status: true, accessToken: adminAccessToken, user: user });
    } else {      
      res.status(HttpStatus.BAD_REQUEST).json({ status: false, message: response.message });
    }
  };

  return adminLogin;
};
