import { FilterDataInterface } from "./filterDataInterface";
import { UsersInterface } from "./usersInterface";

declare module 'express' {
  interface Request {
    filterData?: FilterDataInterface;
    files?: any;
    user?: UsersInterface;
  }
}