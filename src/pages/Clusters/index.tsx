import { Flex } from "@/components/Flex";
import SearchBar from "@/components/SearchBar";
import ClusterJoinButton from "@/pages/Clusters/components/ClusterJoin";
import ClusterList from "@/pages/Clusters/components/ClusterList";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useEffect } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import SortSelect from "@/components/SortSelect";
import { useSearchParams } from "react-router-dom";

export default function Clusters() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.delete("filterBy");
    searchParams.delete("page");
    searchParams.delete("sortBy");
    setSearchParams(searchParams);
  }, []);

  return (
    <>
      <Flex justify="flex-end" marginTop="9px" marginBottom="50px">
        <SearchBar placeholder="Search Clusters" />
        <ClusterJoinButton />
      </Flex>
      <Flex justify="flex-end">
        <SortSelect level="cluster" />
      </Flex>

      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback={<LoadingSkeleton />}>
          <ClusterList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
