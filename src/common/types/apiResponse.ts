export interface apiResponse<T> {
  data: T;
  success?: boolean;
  status: number;
  message: string;
  success?: boolean;
}
