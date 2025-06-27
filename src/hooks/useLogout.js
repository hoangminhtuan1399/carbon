import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useUserContext } from "../context/UserContext.jsx"

export const useLogout = () => {
  const navigate = useNavigate()
  const { removeUserProfile } = useUserContext()
  const logout = useCallback(() => {
    removeUserProfile()
    navigate('/logout')
  }, [])

  return { logout }
}
