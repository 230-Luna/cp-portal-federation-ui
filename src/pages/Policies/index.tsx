import SearchBar from "@/components/SearchBar";
import PolicyAdd from "@/pages/Policies/components/PolicyAddButton";
import PropagationPolicyList from "@/pages/Policies/components/PropagationPolicyList";
import { Flex } from "@/components/Flex";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import LevelSelect from "@/pages/Policies/components/LevelSelect";
import NamespaceSelect from "@/pages/Policies/components/NamespaceSelect";
import ClusterPropagationPolicyList from "./components/ClusterPropagationPolicyList";
import SortSelect from "../../components/SortSelect";

export default function Policies() {
  const [policyLevel, setPolicyLevel] = useState("Namespace level");

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        marginTop="9px"
        marginBottom="50px"
      >
        <Flex>
          <LevelSelect value={policyLevel} onValueChange={setPolicyLevel} />
          {policyLevel === "Namespace level" ? <NamespaceSelect /> : null}
        </Flex>
        <Flex justify="flex-end">
          <SearchBar placeholder="Search Policies" />
          <PolicyAdd />
        </Flex>
      </Flex>
      <Flex justify="flex-end">
        <SortSelect level={policyLevel} />
      </Flex>
      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback={<LoadingSkeleton />}>
          {policyLevel === "Namespace level" ? (
            <PropagationPolicyList />
          ) : (
            <ClusterPropagationPolicyList />
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
