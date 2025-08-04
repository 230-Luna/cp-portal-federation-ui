import ReactDOM from 'react-dom/client';
import App from '@/App';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/components/theme';

// keycloak에서 토큰 가져오는 로직 추가해야함

// if (!sessionStorage.getItem("token")) {
//   sessionStorage.setItem(
//     "token",
//   );
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ChakraProvider value={system}>
    <App />
  </ChakraProvider>
  // </React.StrictMode>
);
