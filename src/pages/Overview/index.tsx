import FederationInfo from "../../components/federation/overview/FederationInfo";
import ResourceInfo from "../../components/federation/overview/ResourceInfo";
import HostClusterInfo from "../../components/federation/overview/HostClusterInfo";
import MemberClusterInfo from "../../components/federation/overview/MemberClusterInfo";

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
