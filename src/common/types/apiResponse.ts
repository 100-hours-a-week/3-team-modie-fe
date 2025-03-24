export interface apiResponse<T> {
  data: T;
  status: number;
  message: string;
  success?: boolean;
}
