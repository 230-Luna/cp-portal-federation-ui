import { Flex } from "@/components/Flex";
import SearchBar from "@/components/SearchBar";
import ClusterJoinButton from "@/pages/Clusters/components/ClusterJoin";
import ClusterList from "@/pages/Clusters/components/ClusterList";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import SortSelect from "@/components/SortSelect";

export default function Clusters() {
  const [searchClusterName, setSearchClusterName] = useState("");
  const [clusterSort, setClusterSort] = useState("d,creationTimestamp");

  return (
    <>
      <Flex justify="flex-end" marginTop="9px" marginBottom="50px">
        <SearchBar
          onChange={setSearchClusterName}
          placeholder="Search Clusters"
        />
        <ClusterJoinButton />
      </Flex>
      <Flex justify="flex-end">
        <SortSelect level="Cluster level" onValueChange={setClusterSort} />
      </Flex>

      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback={<LoadingSkeleton />}>
          <ClusterList keyword={searchClusterName} sort={clusterSort} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
