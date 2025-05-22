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

export default function Policies() {
  const [policyLevel, setPolicyLevel] = useState("Namespace level");
  const [namespace, setNamespace] = useState("");
  const [searchPolicyName, setSearchPolicyName] = useState("");

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
          {policyLevel === "Namespace level" ? (
            <NamespaceSelect onValueChange={setNamespace} />
          ) : null}
        </Flex>
        <Flex justify="flex-end">
          <SearchBar
            onChange={setSearchPolicyName}
            placeholder="Search Policies"
          />
          <PolicyAdd />
        </Flex>
      </Flex>
      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback={<LoadingSkeleton />}>
          {policyLevel === "Namespace level" ? (
            <PropagationPolicyList
              namespace={namespace}
              keyword={searchPolicyName}
            />
          ) : (
            <ClusterPropagationPolicyList keyword={searchPolicyName} />
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
