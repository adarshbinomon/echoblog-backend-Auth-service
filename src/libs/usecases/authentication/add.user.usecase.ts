import { hashPassword, sendMail } from "../../../helper";
import { Dependencies } from "../../../utils/dependencies.interface";
import { UserData } from "../../../utils/interface";

export const addUser_useCases = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: UserData) => {
    try {
      const userExist = await authenticationRepository?.userEmailExist(
        data?.email
      );

      if (userExist) {
        return { status1: true, message: "user already exists" };
      }

      const hashedPassword = await hashPassword(data?.password);
      const updatedData = { ...data, password: hashedPassword };

      const otp = await sendMail(updatedData.email, updatedData.name);

      if (otp) {
        return {
          status: true,
          user: updatedData,
          message: `otp sent to ${updatedData.email}`,
          otp: otp,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: "an erorr occured while creating user",
      };
    }
  };
  return { executeFunction };
};
