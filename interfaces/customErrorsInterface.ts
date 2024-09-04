export interface CustomErrorsInterface extends Error {
  statusCode?: number;
  status?: string;
}