import Overview from "@/pages/Overview";
import Clusters from "@/pages/Clusters";
import Policies from "@/pages/Policies";
import { Tabs } from "@/components/Tabs";
import { Toaster } from "@/components/Toaster";
import { ReactNode, Suspense, useMemo } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import PageNotFound from "@/error/PageNotFound";

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
    let path = location.pathname.split("/")[1];
    if (path === "") {
      path = "overview";
    }
    return path;
  }, [location.pathname]);

  const handleTabChange = (details: { value: string }) => {
    navigate(`/${details.value}`);
  };

  return (
    <Tabs.Root
      value={currentTab}
      onValueChange={handleTabChange}
      navigate={({ value }) => navigate(`/${value}`)}
    >
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="clusters">Clusters</Tabs.Trigger>
        <Tabs.Trigger value="policies">Policies</Tabs.Trigger>
      </Tabs.List>

      <Suspense fallback={<LoadingSkeleton />}>
        {currentTab === "overview" && (
          <Tabs.Content value="overview">
            <Overview />
          </Tabs.Content>
        )}
        {currentTab === "clusters" && (
          <Tabs.Content value="clusters">
            <Clusters />
          </Tabs.Content>
        )}
        {currentTab === "policies" && (
          <Tabs.Content value="policies">
            <Policies />
          </Tabs.Content>
        )}
        {!["", "overview", "clusters", "policies"].includes(currentTab) && (
          <Tabs.Content value={location.pathname.split("/")[1]}>
            <PageNotFound />
          </Tabs.Content>
        )}
      </Suspense>
    </Tabs.Root>
  );
}
