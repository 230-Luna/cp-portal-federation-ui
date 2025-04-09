import Overview from "pages/Overview";
import Clusters from "pages/Clusters";
import Policies from "pages/Policies";
import "./App.css";
import { Tabs } from "@chakra-ui/react";

function App() {
  return (
    <Tabs.Root defaultValue="overview" size="lg">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="clusters">Clusters</Tabs.Trigger>
        <Tabs.Trigger value="policies">Policies</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview" className="tab-content">
        <Overview />
      </Tabs.Content>
      <Tabs.Content value="clusters" className="tab-content">
        <Clusters />
      </Tabs.Content>
      <Tabs.Content value="policies" className="tab-content">
        <Policies />
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default App;
