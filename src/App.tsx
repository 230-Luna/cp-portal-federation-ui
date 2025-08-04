import Overview from "@/pages/Overview";
import Clusters from "@/pages/Clusters";
import Policies from "@/pages/Policies";
import { Tabs } from "@/components/Tabs";
import { Toaster } from "@/components/Toaster";
import { ReactNode, useMemo } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageNotFound from "@/error/PageNotFound";
import { match } from "ts-pattern";
import Namespaces from "./pages/Namespaces";
import Workloads from "./pages/Workloads";
import ConfigMapsAndSecrets from "./pages/ConfigMapsAndSecrets";

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Container>
          <FederationTabs />
        </Container>
      </QueryClientProvider>
    </BrowserRouter>
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
function FederationTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = useMemo(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/cpfedui/" ||
      location.pathname === "/cpfedui"
    ) {
      return "/cpfedui/overview";
    }
    return location.pathname;
  }, [location.pathname]);

  const handleTabChange = (details: { value: string }) => {
    navigate(details.value);
  };

  return (
    <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
      <Tabs.List>
        <Tabs.Trigger value="/cpfedui/overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="/cpfedui/clusters">Clusters</Tabs.Trigger>
        <Tabs.Trigger value="/cpfedui/policies">Policies</Tabs.Trigger>
        <Tabs.Trigger value="/cpfedui/namespaces">Namespaces</Tabs.Trigger>
        <Tabs.Trigger value="/cpfedui/workloads">Workloads</Tabs.Trigger>
        <Tabs.Trigger value="/cpfedui/configmapsandsecrets">
          ConfigMaps&Secrets
        </Tabs.Trigger>
      </Tabs.List>

      {match(currentTab)
        .with("/cpfedui/overview", () => (
          <Tabs.Content value="/cpfedui/overview">
            <Overview />
          </Tabs.Content>
        ))
        .with("/cpfedui/clusters", () => (
          <Tabs.Content value="/cpfedui/clusters">
            <Clusters />
          </Tabs.Content>
        ))
        .with("/cpfedui/policies", () => (
          <Tabs.Content value="/cpfedui/policies">
            <Policies />
          </Tabs.Content>
        ))
        .with("/cpfedui/namespaces", () => (
          <Tabs.Content value="/cpfedui/namespaces">
            <Namespaces />
          </Tabs.Content>
        ))
        .with("/cpfedui/workloads", () => (
          <Tabs.Content value="/cpfedui/workloads">
            <Workloads />
          </Tabs.Content>
        ))
        .with("/cpfedui/configmapsandsecrets", () => (
          <Tabs.Content value="/cpfedui/configmapsandsecrets">
            <ConfigMapsAndSecrets />
          </Tabs.Content>
        ))
        .otherwise(() => (
          <PageNotFound />
        ))}
    </Tabs.Root>
  );
}
