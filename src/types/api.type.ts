export interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  errorSources?: IErrorSource[];
  error?: string;
  meta?: IMeta;
}

export interface IErrorSource {
  path: string;
  message: string;
}

export type IQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export interface IMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}
