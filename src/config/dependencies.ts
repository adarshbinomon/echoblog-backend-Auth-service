import { authenticationRepository } from "../libs/app/repository";
import {
  addUser_useCases,
  verifyOtp_useCase,
  userLogin_useCase,
  adminLogin_useCase,
  userGoogleLogin_useCase,
  updateUserUsecase,
  resendOtp_useCase,
  forgotPasswordUsecase,
  verifyForgotPasswordOtp,
  changePasswordUsecase,
  changeUserStatus_useCase,
} from "../libs/usecases";
import { ConsumeUsecase, Repository, UseCase } from "../utils/dependencies.interface";

const useCase: UseCase = {
  addUser_useCases,
  verifyOtp_useCase,
  userLogin_useCase,
  adminLogin_useCase,
  userGoogleLogin_useCase,
  resendOtp_useCase,
  forgotPasswordUsecase,
  verifyForgotPasswordOtp,
  changePasswordUsecase,
  changeUserStatus_useCase,
};

const consumeUsecase: ConsumeUsecase = {
  updateUserUsecase,
};

const repository: Repository = {
  authenticationRepository,
};

export default {
  useCase,
  consumeUsecase,
  repository,
};
