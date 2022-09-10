import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

// STYLES
import { theme } from "./styles/theme";

// COMPONENTS
import { Router } from "./routes";

// HOOKS
import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
