import { Flex } from "@/components/Flex";
import SearchBar from "@/components/SearchBar";
import ClusterJoin from "@/pages/Clusters/components/ClusterJoin";
import ClusterList from "@/pages/Clusters/components/ClusterList";
import Pagination from "@/components/Pagination";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Clusters() {
  return (
    <>
      <Flex justify="flex-end" marginTop="9px" marginBottom="50px">
        <SearchBar />
        <ClusterJoin />
      </Flex>
      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback={<LoadingSkeleton />}>
          <ClusterList />
        </Suspense>
      </ErrorBoundary>
      <Pagination />
    </>
  );
}
