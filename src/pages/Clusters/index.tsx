import { Flex } from "@/components/Flex";
import SearchBar from "@/components/SearchBar";
import ClusterJoinButton from "@/pages/Clusters/components/ClusterJoin";
import ClusterList from "@/pages/Clusters/components/ClusterList";
import Pagination from "@/components/Pagination";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Clusters() {
  const [searchClusterName, setSearchClusterName] = useState("");

  return (
    <>
      <Flex justify="flex-end" marginTop="9px" marginBottom="50px">
        <SearchBar
          value={searchClusterName}
          onChange={setSearchClusterName}
          placeholder="Search Clusters"
        />
        <ClusterJoinButton />
      </Flex>
      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback={<LoadingSkeleton />}>
          <ClusterList keyword={searchClusterName} />
        </Suspense>
      </ErrorBoundary>
      <Pagination />
    </>
  );
}
