import SearchBar from "@/components/SearchBar";
import PolicyAddButton from "@/pages/Policies/components/PolicyAddButton";
import { Flex } from "@/components/Flex";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import NamespaceSelect from "@/pages/Policies/components/NamespaceSelect";
import SortSelect from "../../components/SortSelect";
import { useSearchParams } from "react-router-dom";
import { ResourceKindLowercase } from "@/models/resourceModel";
import WorkloadLevelSelect from "./components/WorkloadLevelSelect";
import StatefulSetList from "./components/StatefulSetList";
import DeploymentList from "./components/DeploymentList";
import JobList from "./components/JobList";
import DaemonSetList from "./components/DaemonSetList";
import CronJobList from "./components/CronJobList";

export default function Workloads() {
  const [workloadLevel, setWorkloadLevel] =
    useState<ResourceKindLowercase>("deployment");
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({});
  }, [workloadLevel]);

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        marginTop="9px"
        marginBottom="50px"
      >
        <Flex>
          <WorkloadLevelSelect
            value={workloadLevel}
            onValueChange={(workloadLevel) => setWorkloadLevel(workloadLevel)}
          />
          {workloadLevel === "deployment" ? <NamespaceSelect /> : null}
        </Flex>
        <Flex justify="flex-end">
          <SearchBar key={workloadLevel} />
          <PolicyAddButton />
        </Flex>
      </Flex>
      <Flex justify="flex-end">
        <SortSelect key={workloadLevel} level={workloadLevel} />
      </Flex>
      <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
        <Suspense fallback="">
          {workloadLevel === "deployment" ? (
            <DeploymentList />
          ) : workloadLevel === "statefulset" ? (
            <StatefulSetList />
          ) : workloadLevel === "daemonset" ? (
            <DaemonSetList />
          ) : workloadLevel === "cronjob" ? (
            <CronJobList />
          ) : workloadLevel === "job" ? (
            <JobList />
          ) : (
            <div>No workload found</div>
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
