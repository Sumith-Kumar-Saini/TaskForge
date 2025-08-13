import { easyResponse } from "../ApiResponse.d.ts";

// Extending the express Response type globally
declare global {
  namespace Express {
    interface Request {
      user?: user | null;
    }

    interface Response {
      easyResponse: easyResponse;
    }
  }
}

type user = {
  id: string;
  username: string;
  email: string;
};

// This is required to make the types work properly in a JavaScript project
export {};
