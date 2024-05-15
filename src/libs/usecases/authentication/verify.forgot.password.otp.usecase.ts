import { Dependencies } from "../../../utils/dependencies.interface";

export const verifyForgotPasswordOtp = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (enteredOtp: number, sessionOtp: number) => {
    try {
        console.log('enteredOtp',enteredOtp);
        console.log('sessionOtp',sessionOtp);
        
      if (enteredOtp == sessionOtp) {
        return { status: true, message: "otp verification successfull" };
      } else {
        return { status: false, message: "otp verification failed" };
      }
    } catch (error) {
      return { status: false, message: "otp verification failed" };
    }
  };
  return { executeFunction };
};
