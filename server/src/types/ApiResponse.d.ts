export interface ApiError {
  message: string;
  details: string | null;
  stack?: Error | null;
}

export interface easyResponseParameters {
  statusCode: number;
  message: string;
  payload?: object | null;
  error?: ApiError | null;
  traceId?: string | null;
}

export interface generateResponse {
  success: boolean;
  status: string;
  statusCode: number;
  error: ApiError | null;
  message: string;
  payload: object | null;
  timestamps: Date;
  traceId: string;
  originalUrl: string;
}

export type easyResponse = ({}: easyResponseParameters) => void;
