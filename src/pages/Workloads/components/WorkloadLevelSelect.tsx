import { SegmentGroup } from '@/components/SegmentGroup';
import { WorkloadKind, WorkloadKindLowercase } from '@/models/resourceModel';
import { SegmentGroupValueChangeDetails } from '@chakra-ui/react';

export default function WorkloadLevelSelect({
  value,
  onValueChange,
}: {
  value: WorkloadKindLowercase;
  onValueChange: (value: WorkloadKindLowercase) => void;
}) {
  const handleValueChange = (details: SegmentGroupValueChangeDetails) => {
    const displayValue = details.value as string;
    if (displayValue !== null) {
      const lowercaseValue =
        displayValue.toLowerCase() as WorkloadKindLowercase;
      onValueChange(lowercaseValue);
    }
  };

  const getDisplayName = (lowercase: WorkloadKindLowercase): WorkloadKind => {
    const mapping: Record<WorkloadKindLowercase, WorkloadKind> = {
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
