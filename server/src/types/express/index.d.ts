import { easyResponse } from "../ApiResponse.d.ts";
import { IUser } from "../user.d.ts";

// Extending the express Response type globally
declare global {
  namespace Express {
    interface Response {
      user?: IUser | null;
      easyResponse: easyResponse;
    }
  }
}

// This is required to make the types work properly in a JavaScript project
export {};