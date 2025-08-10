import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.validatedData = parsed;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.easyResponse({
        statusCode: 400,
        message: "Invalid input",
        payload: {
          errors: err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
            code: issue.code,
            expected: issue.expected, // only present for some error codes
            received: issue.received, // only present for some error codes
          })),
        },
      });
    }
    next(err);
  }
};
