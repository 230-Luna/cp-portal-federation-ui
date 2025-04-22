import Overview from "pages/Overview";
import Clusters from "pages/Clusters";
import Policies from "pages/Policies";
import "./App.css";
import { Tabs } from "@/components/Tabs";
import { Toaster } from "@/components/Toaster";
import { ReactNode } from "react";

function App() {
  return (
    <Container>
      <Tabs.Root defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="clusters">Clusters</Tabs.Trigger>
          <Tabs.Trigger value="policies">Policies</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">
          <Overview />
        </Tabs.Content>
        <Tabs.Content value="clusters">
          <Clusters />
        </Tabs.Content>
        <Tabs.Content value="policies">
          <Policies />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
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
