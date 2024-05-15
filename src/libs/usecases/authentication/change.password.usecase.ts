import { hashPassword } from "../../../helper";
import { Dependencies } from "../../../utils/dependencies.interface";

export const changePasswordUsecase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (email: string, password: string) => {
    try {
      const hashedPassword = await hashPassword(password);
      const response = await authenticationRepository.changePassword(
        email,
        hashedPassword
      );

      if (response.status) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.log("error in change password useacse:", error);

      return { status: false, message: "error in change password useacse" };
    }
  };
  return { executeFunction };
};
