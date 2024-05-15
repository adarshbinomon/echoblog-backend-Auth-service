import { schema } from "../database";
const { User, Admin } = schema;
import { UserData } from "../../../utils/interface";

export default {
  userEmailExist: async (email: string) => {
    try {
      const response = await User.findOne({ email: email });
      console.log("response:", response);

      return response;
    } catch (error) {
      console.log("error in authentication.repository.userEmailExist", error);
    }
  },

  createUser: async (data: UserData) => {
    const userData = { ...data };

    const response = await User.create(userData);
    if (response) {
      return { status: true, message: "user created!", response };
    } else {
      return { status: false, message: "user creation failed!" };
    }
  },

  findUser: async (email: string) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return { status: true, user: user };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error, "error while finding user");
    }
  },

  findAdmin: async (email: string) => {
    try {
      const admin = await Admin.findOne({ email: email });
      if (admin) {
        return { status: true, user: admin };
      }
    } catch (error) {
      console.log(error, "error while finding Admin");
    }
  },

  updateUser: async (data: UserData) => {
    try {
      const response = await User.findByIdAndUpdate(data._id, data);
      return { status: true, updatedUser: response };
    } catch (error) {
      console.log(error);
      return { status: false, message: "update failed" };
    }
  },

  changePassword: async (email: string, newPassword: string) => {
    try {
      const response = await User.findOneAndUpdate(
        { email },
        { password: newPassword }
      );

      if (response) {
        return { status: true, message: "password changed successfully" };
      } else {
        return { status: false, message: "password change failed" };
      }
    } catch (error) {
      console.log("error in change password repository:", error);

      return { status: false, message: "password change failed" };
    }
  },

  changeUserStatus: async (userId: string) => {
    try {
      const user = await User.findById(userId);

      if (!user) {
        console.log("User not found");
        return { status: false, message: "user not found" };
      }

      user.isActive = !user.isActive;
      await user.save();
      if (user) {
        return { status: true, message: "userstatus changed", user: user };
      } else {
        return { status: false, message: "userstatus change failed" };
      }
    } catch (error) {
      console.error("Error toggling isActive:", error);
      return { status: false, message: "userstatus change failed" };
    }
  },
};
