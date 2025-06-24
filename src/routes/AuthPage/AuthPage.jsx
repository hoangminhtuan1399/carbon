import { checkAccessToken } from "../../utils/check-access-token.js";
import { Navigate } from "react-router";

export const AuthPage = () => {
  const token = checkAccessToken();
  if (token) return <Navigate to={'/'} replace />

  return (
    <div className={''}>AuthPage</div>
  )
}
