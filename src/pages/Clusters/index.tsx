import { Flex } from "@/components/Flex";
import SearchBar from "@/components/SearchBar";
import ClusterJoin from "@/pages/Clusters/components/ClusterJoin";
import ClusterList from "@/pages/Clusters/components/ClusterList";
import Pagination from "@/components/Pagination";
import { toaster } from "@/components/Toaster";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Clusters() {
  toaster.create({
    description: "멤버클러스터에서 제외되었습니다.",
    type: "info",
  });

  return (
    <>
      <Flex justify="flex-end" marginTop="9px" marginBottom="50px">
        <SearchBar />
        <ClusterJoin />
      </Flex>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div>
            There was an error!{" "}
            <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
          </div>
        )}
      >
        <Suspense fallback={<LoadingSkeleton />}>
          <ClusterList />
        </Suspense>
      </ErrorBoundary>
      <Pagination />
    </>
  );
}
