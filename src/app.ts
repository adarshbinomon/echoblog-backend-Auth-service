import express from "express";
import cors from "cors";
import dependencies from "./config/dependencies";
import { routes } from "./router";
import session, { MemoryStore, SessionOptions } from "express-session";
import dotenv from "dotenv";
import { userConsumer } from "./events/userUpdateConsumer";
import morgan from "morgan";

dotenv.config({ path: "src/.env" });

const app = express();


const store = new MemoryStore();
declare module "express-session" {
  interface Session {
    userData:
      | {
          _id: string;
          name: string;
          email: string;
          password: string;
        }
      | undefined;
    otp: string;
    refreshToken: string;
    adminRefreshToken: string;
    email: string;
  }
}

app.use(morgan('tiny'))

app.use(
  session({
    secret: process.env.SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 60 * 1000,
      httpOnly: true,
    },
    store: store,
  } as SessionOptions)
);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

userConsumer(dependencies);

app.use(express.urlencoded({ extended: true }));

app.use("/api", routes(dependencies));

export { app };
