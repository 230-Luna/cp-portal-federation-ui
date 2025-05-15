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
    const match = location.pathname.match(/^(\/cpfedui)?\/?([^/]+)?/);
    const path = match?.[2] || "overview";
    return path;
  }, [location.pathname]);

  const handleTabChange = (details: { value: string }) => {
    navigate(`${details.value}`);
  };

  return (
    <Tabs.Root
      value={currentTab}
      onValueChange={handleTabChange}
      navigate={({ value }) => navigate(`${value}`)}
    >
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="clusters">Clusters</Tabs.Trigger>
        <Tabs.Trigger value="policies">Policies</Tabs.Trigger>
      </Tabs.List>

      {match(currentTab)
        .with("overview", () => (
          <Tabs.Content value="overview">
            <Overview />
          </Tabs.Content>
        ))
        .with("clusters", () => (
          <Tabs.Content value="clusters">
            <Clusters />
          </Tabs.Content>
        ))
        .with("policies", () => (
          <Tabs.Content value="policies">
            <Policies />
          </Tabs.Content>
        ))
        .otherwise(() => (
          <Tabs.Content value={location.pathname.split("/")[1]}>
            <PageNotFound />
          </Tabs.Content>
        ))}
    </Tabs.Root>
  );
}
