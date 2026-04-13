import { mockUser } from "./mockUser";

interface ApiResponse<T> {
  ok: boolean;
  status: number;
  data: T | null;
  message?: string;
}

export const mockAuthorisationCall = (): Promise<
  ApiResponse<string | null>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shouldSucceed = true;
      const shouldReturnUser = true;

      if (shouldSucceed) {
        if (shouldReturnUser) {
          resolve({
            ok: true,
            status: 200,
            data: JSON.stringify(mockUser),
            message: "User authenticated successfully",
          });
        } else {
          resolve({
            ok: true,
            status: 200,
            data: null,
            message: "No user is currently logged in",
          });
        }
      } else {
        // For server errors
        resolve({
          ok: false,
          status: 500,
          data: null,
          message: "Internal server error",
        });
      }
    }, 1000);
  });
};
