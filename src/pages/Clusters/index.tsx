import { Flex } from "@/components/Flex";
import SearchBar from "@/components/SearchBar";
import ClusterJoin from "@/pages/Clusters/components/ClusterJoin";
import ClusterList from "@/pages/Clusters/components/ClusterList";
import Pagination from "@/components/Pagination";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Clusters() {
  const [searchClusterName, setSearchClusterName] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <>
      <Flex justify="flex-end" marginTop="9px" marginBottom="50px">
        <SearchBar
          value={searchClusterName}
          onChange={setSearchClusterName}
          onSearch={handleSearch}
          placeholder="Search Clusters"
        />
        <ClusterJoin />
      </Flex>
      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback={<LoadingSkeleton />}>
          <ClusterList keyword={searchKeyword} />
        </Suspense>
      </ErrorBoundary>
      <Pagination />
    </>
  );
}
