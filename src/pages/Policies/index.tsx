import SearchBar from "@/components/SearchBar";
import PolicyAdd from "@/pages/Policies/components/PolicyAdd";
import PolicyList from "@/pages/Policies/components/PolicyList";
import { Flex } from "@/components/Flex";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import LevelSelect from "@/pages/Policies/components/LevelSelect";
import Namespace from "@/pages/Policies/components/Namespace";

export default function Policies() {
  const [searchPolicyName, setSearchPolicyName] = useState("");
  const [policyLevel, setPolicyLectl] = useState("namespace");

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        marginTop="9px"
        marginBottom="50px"
      >
        <Flex>
          <LevelSelect type={policyLevel} />
          <Namespace />
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
          <PolicyList keyword={searchPolicyName} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
