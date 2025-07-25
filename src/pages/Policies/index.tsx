import SearchBar from "@/components/SearchBar";
import PolicyAddButton from "@/pages/Policies/components/PolicyAddButton";
import PropagationPolicyList from "@/pages/Policies/components/PropagationPolicyList";
import { Flex } from "@/components/Flex";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LevelSelect, { Level } from "@/pages/Policies/components/LevelSelect";
import NamespaceSelect from "@/pages/Policies/components/NamespaceSelect";
import ClusterPropagationPolicyList from "./components/ClusterPropagationPolicyList";
import SortSelect from "../../components/SortSelect";
import { useSearchParams } from "react-router-dom";

export default function Policies() {
  const [policyLevel, setPolicyLevel] = useState<Level>("namespace");
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({});
  }, [policyLevel]);

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        marginTop="9px"
        marginBottom="50px"
      >
        <Flex>
          <LevelSelect
            value={policyLevel}
            onValueChange={(policyLevel) => setPolicyLevel(policyLevel)}
          />
          {policyLevel === "namespace" ? <NamespaceSelect /> : null}
        </Flex>
        <Flex justify="flex-end">
          <SearchBar key={policyLevel} placeholder="Search Policies" />
          <PolicyAddButton />
        </Flex>
      </Flex>
      <Flex justify="flex-end">
        <SortSelect key={policyLevel} level={policyLevel} />
      </Flex>
      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback="">
          {policyLevel === "namespace" ? (
            <PropagationPolicyList />
          ) : (
            <ClusterPropagationPolicyList />
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
