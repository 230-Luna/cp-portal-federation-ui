import ReactDOM from "react-dom/client";
import App from "@/App";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

// keycloak에서 토큰 가져오는 로직 추가해야함

// if (!sessionStorage.getItem("token")) {
//   sessionStorage.setItem(
//     "token",
//   );
// }

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ChakraProvider value={defaultSystem}>
    <App />
  </ChakraProvider>
  // </React.StrictMode>
);
