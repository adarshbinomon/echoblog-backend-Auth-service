import authenticationRouter from "./auhtentication/auhtentication.router";
import adminAuthenticationRouter from './auhtentication/admin.authentication.router'
import express from "express";
import { Dependencies } from "../utils/dependencies.interface";

export const routes = (dependencies: Dependencies) => {
  const routes = express.Router();

  routes.use("/auth/user", authenticationRouter(dependencies));
  routes.use("/auth/admin", adminAuthenticationRouter(dependencies));
  return routes;
};
