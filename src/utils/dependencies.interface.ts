export interface Dependencies {
  useCase: UseCase;
  consumeUsecase: ConsumeUsecase;
  repository: Repository;
}

export interface ConsumeUsecase {
  updateUserUsecase: Function;
}

export interface Repository {
  authenticationRepository: AuthenticationRepository;
}

export interface AuthenticationRepository {
  changePassword: Function;
  userEmailExist: Function;
  createUser: Function;
  findUser: Function;
  findAdmin: Function;
  updateUser: Function;
  changeUserStatus: Function;
}

export interface UseCase {
  addUser_useCases: Function;
  verifyOtp_useCase: Function;
  userLogin_useCase: Function;
  adminLogin_useCase: Function;
  userGoogleLogin_useCase: Function;
  resendOtp_useCase: Function;
  forgotPasswordUsecase: Function;
  changePasswordUsecase: Function;
  verifyForgotPasswordOtp: Function;
  changeUserStatus_useCase: Function;
}
