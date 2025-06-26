import { UserProvider } from "./UserContext.jsx";
import { ThemeProvider } from "./ThemeContext.jsx";

export const AppContext = ({ children }) => {
  return (
    <UserProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </UserProvider>
  )
}
