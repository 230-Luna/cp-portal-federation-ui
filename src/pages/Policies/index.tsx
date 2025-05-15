import SearchBar from "@/components/SearchBar";
import PolicyAdd from "@/pages/Policies/components/PolicyAdd";
import PolicyList from "@/pages/Policies/components/PolicyList";
import Pagination from "@/components/Pagination";
import { Flex } from "@/components/Flex";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Policies() {
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
          placeholder="Search Policies"
        />
        <PolicyAdd />
      </Flex>
      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback={<LoadingSkeleton />}>
          <PolicyList keyword={searchKeyword} />
        </Suspense>
      </ErrorBoundary>
      <Pagination />
    </>
  );
}
