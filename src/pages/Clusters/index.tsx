import { Flex } from "@/components/Flex";
import SearchBar from "@/components/SearchBar";
import ClusterJoin from "pages/Clusters/components/ClusterJoin";
import ClusterList from "@/pages/Clusters/components/ClusterList";
import Pagination from "@/components/Pagination";
import { toaster } from "@/components/Toaster";

export default function Clusters() {
  toaster.create({
    description: "멤버클러스터에서 제외되었습니다.",
    type: "info",
  });

  return (
    <>
      <Flex justify="flex-end" paddingTop="9px" paddingBottom="50px">
        <SearchBar />
        <ClusterJoin />
      </Flex>
      <ClusterList />
      <Pagination />
    </>
  );
}
