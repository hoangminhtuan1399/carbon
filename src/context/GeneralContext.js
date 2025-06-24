import { UserProvider } from "./UserContext.jsx";
import { ThemeProvider } from "./ThemeContext.jsx";

export const GeneralContext = ({ children }) => {
  return (
    <UserProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </UserProvider>
  )
}
