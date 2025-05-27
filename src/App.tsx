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
        .otherwise(() => (
          <PageNotFound />
        ))}
    </Tabs.Root>
  );
}
