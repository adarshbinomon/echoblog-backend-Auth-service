import { sendMail } from "../../../helper";
import { Dependencies } from "../../../utils/dependencies.interface";

export const forgotPasswordUsecase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (email: string) => {
    try {
      const user = await authenticationRepository.findUser(email);

      if (user.status) {
        const otp = await sendMail(email);
        if (otp) {
          return { status: true, message: `otp send to ${email}`, otp };
        }
      } else {
        return { status: false, message: "user not registered" };
      }
    } catch (error) {
      return { status: false, message: `otp sending failed` };
    }
  };
  return { executeFunction };
};
