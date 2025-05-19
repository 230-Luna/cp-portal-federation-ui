import SearchBar from "@/components/SearchBar";
import PolicyAdd from "@/pages/Policies/components/PolicyAdd";
import PolicyListByNamespace from "@/pages/Policies/components/PolicyList/PolicyListByNamespace";
import { Flex } from "@/components/Flex";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import LevelSelect from "@/pages/Policies/components/LevelSelect";
import Namespace from "@/pages/Policies/components/Namespace";
import PolicyListByCluster from "./components/PolicyList/PolicyListByCluster";

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
            <Namespace value={namespace} onValueChange={setNamespace} />
          ) : null}
        </Flex>
        <Flex justify="flex-end" marginTop="9px" marginBottom="50px">
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
            <PolicyListByNamespace keyword={searchPolicyName} />
          ) : (
            <PolicyListByCluster keyword={searchPolicyName} />
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
