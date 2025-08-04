import { SegmentGroup } from '@/components/SegmentGroup';
import { ResourceKindLowercase, ResourceKind } from '@/models/resourceModel';
import { SegmentGroupValueChangeDetails } from '@chakra-ui/react';

export default function WorkloadLevelSelect({
  value,
  onValueChange,
}: {
  value: ResourceKindLowercase;
  onValueChange: (value: ResourceKindLowercase) => void;
}) {
  const handleValueChange = (details: SegmentGroupValueChangeDetails) => {
    const displayValue = details.value as string;
    if (displayValue !== null) {
      const lowercaseValue =
        displayValue.toLowerCase() as ResourceKindLowercase;
      onValueChange(lowercaseValue);
    }
  };

  const getDisplayName = (lowercase: ResourceKindLowercase): ResourceKind => {
    const mapping: Record<ResourceKindLowercase, ResourceKind> = {
      deployment: 'Deployment',
      statefulset: 'StatefulSet',
      daemonset: 'DaemonSet',
      cronjob: 'CronJob',
      job: 'Job',
    };
    return mapping[lowercase];
  };

  return (
    <SegmentGroup.Root
      value={getDisplayName(value)}
      variant='medium'
      onValueChange={handleValueChange}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items
        items={['Deployment', 'StatefulSet', 'DaemonSet', 'CronJob', 'Job']}
      />
    </SegmentGroup.Root>
  );
}
