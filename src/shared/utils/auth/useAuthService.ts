import { useEffect } from "react";
import { authorizeAccess } from "./authService";

export const useAuthService = () => {
  useEffect(() => {

    const { hash } = window.location;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const denied = params.get("error")

    if (accessToken) {
      (async () => {
        try {
          await authorizeAccess(accessToken);
        } catch (error) {
          console.error(error);
        }
      })();
    } else if (denied) {
      window.location.replace("/login")
    }
  }, []);
};
