import { useSuspenseQuery } from '@tanstack/react-query';
import FederationInfo from './components/FederationInfo';
import HostClusterInfo from './components/HostClusterInfo';
import MemberClusterInfo from './components/MemberClusterInfo';
import { getOverviewApi } from '@/apis/overview';

export default function Overview() {
  const { data: overview } = useSuspenseQuery({
    queryKey: ['getOverviewApi'],
    queryFn: () => getOverviewApi(),
  });

  return (
    <>
      <FederationInfo resources={overview.clusterResourceStatus} />
      <HostClusterInfo hostCluster={overview.hostClusterStatus} />
      <MemberClusterInfo memberClusters={overview.memberClusterStatus} />
    </>
  );
}
