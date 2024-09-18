import { filterDataInterface } from "./filterDataInterface";
import { UsersInterface } from "./usersInterface";

declare module 'express' {
  interface Request {
    filterData?: filterDataInterface;
    files?: any;
    user?: UsersInterface;
  }
}