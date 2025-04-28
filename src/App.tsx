import Overview from "pages/Overview";
import Clusters from "pages/Clusters";
import Policies from "pages/Policies";
import "./App.css";
import { Tabs } from "@/components/Tabs";
import { Toaster } from "@/components/Toaster";
import { ReactNode } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <FederationTabs />
      </Container>
    </BrowserRouter>
  );
}

function FederationTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = (() => {
    if (location.pathname.startsWith("/clusters")) {
      return "clusters";
    }
    if (location.pathname.startsWith("/policies")) {
      return "policies";
    }
    return "overview";
  })();

  const handleTabChange = (details: { value: string }) => {
    navigate(`/${details.value}`);
  };
  return (
    <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="clusters">Clusters</Tabs.Trigger>
        <Tabs.Trigger value="policies">Policies</Tabs.Trigger>
      </Tabs.List>

      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/clusters" element={<Clusters />} />
        <Route path="/policies" element={<Policies />} />
      </Routes>
    </Tabs.Root>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}

export default App;
