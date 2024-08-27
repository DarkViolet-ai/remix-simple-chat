export const makeApiFunction = <T>(request: Request, fn: () => Promise<T>) => {
  // todo: add permissions handling
  return async () => {
    console.log("makeApiFunction");
    try {
      const result = await fn();
      console.log("result", result);
      return { data: result, error: null };
    } catch (error) {
      console.log("error", error);
      return { data: null, error };
    }
  };
};

export type ApiReturnType<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };
