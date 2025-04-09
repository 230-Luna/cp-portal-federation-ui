import SearchBar from "components/federation/clusters/SearchBar";
import ClusterJoin from "components/federation/clusters/ClusterJoin";
import ClusterList from "components/federation/clusters/ClusterList";
import Pages from "components/federation/clusters/Pages";
import { Flex } from "@chakra-ui/react";

export default function Clusters() {
  return (
    <>
      <Flex className="flex-clusters-header" justify="space-between">
        <SearchBar />
        <ClusterJoin />
      </Flex>
      <ClusterList />
      <Pages />
    </>
  );
}
