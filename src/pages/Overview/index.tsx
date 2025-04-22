import FederationInfo from "./components/FederationInfo";
import HostClusterInfo from "./components/HostClusterInfo";
import MemberClusterInfo from "./components/MemberClusterInfo";
import ResourceInfo from "./components/ResourceInfo";

export default function Overview() {
  return (
    <>
      <FederationInfo />
      <ResourceInfo />
      <HostClusterInfo />
      <MemberClusterInfo />
    </>
  );
}
