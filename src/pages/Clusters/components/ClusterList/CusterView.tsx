import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { Drawer, Portal } from "@chakra-ui/react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

export default function CusterView() {
  return (
    <Drawer.Root size="xl">
      <Drawer.Trigger asChild>
        <Button buttonStyle="blueGhost">View</Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>member1</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <YamlMaker />
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
export function YamlMaker() {
  // const editRef = useRef(null);

  // function handleEditorDidMount(editor, monaco) {
  //   editorRef.current = editor;
  // }

  // function showValue() {
  //   alert(editorRef.current.getValue());
  // }

  return (
    <div style={{ height: "92vh" }}>
      <Editor
        height="90vh"
        defaultLanguage="yaml"
        defaultValue={yaml}
        options={{
          readOnly: true,
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
            handleMouseWheel: true,
          },
          overviewRulerLanes: 0,
        }}
        // onMount={handleEditorDidMount}
      />
    </div>
  );
}

const yaml = `Name:         member1
Namespace:
Labels:       <none>
Annotations:  <none>
API Version:  cluster.karmada.io/v1alpha1
Kind:         Cluster
Metadata:
  Creation Timestamp:  2025-04-04T08:17:35Z
  Finalizers:
    karmada.io/cluster-controller
  Generation:        7
  Resource Version:  170537
  UID:               d4593f68-847d-4a9b-bc48-a4c55e743fd9
Spec:
  API Endpoint:  https://133.186.135.73:6443
  Id:            75f41f6c-bedb-4992-823b-00d8a28f91d9
  Impersonator Secret Ref:
    Name:       member1-impersonator
    Namespace:  karmada-cluster
  Resource Models:
    Grade:  0
    Ranges:
      Max:   1
      Min:   0
      Name:  cpu
      Max:   4Gi
      Min:   0
      Name:  memory
    Grade:   1
    Ranges:
      Max:   2
      Min:   1
      Name:  cpu
      Max:   16Gi
      Min:   4Gi
      Name:  memory
    Grade:   2
    Ranges:
      Max:   4
      Min:   2
      Name:  cpu
      Max:   32Gi
      Min:   16Gi
      Name:  memory
    Grade:   3
    Ranges:
      Max:   8
      Min:   4
      Name:  cpu
      Max:   64Gi
      Min:   32Gi
      Name:  memory
    Grade:   4
    Ranges:
      Max:   16
      Min:   8
      Name:  cpu
      Max:   128Gi
      Min:   64Gi
      Name:  memory
    Grade:   5
    Ranges:
      Max:   32
      Min:   16
      Name:  cpu
      Max:   256Gi
      Min:   128Gi
      Name:  memory
    Grade:   6
    Ranges:
      Max:   64
      Min:   32
      Name:  cpu
      Max:   512Gi
      Min:   256Gi
      Name:  memory
    Grade:   7
    Ranges:
      Max:   128
      Min:   64
      Name:  cpu
      Max:   1Ti
      Min:   512Gi
      Name:  memory
    Grade:   8
    Ranges:
      Max:   9223372036854775807
      Min:   128
      Name:  cpu
      Max:   9223372036854775807
      Min:   1Ti
      Name:  memory
  Secret Ref:
    Name:       member1
    Namespace:  karmada-cluster
  Sync Mode:    Push
Status:
  API Enablements:
    Group Version:  admissionregistration.k8s.io/v1
    Resources:
      Kind:         MutatingWebhookConfiguration
      Name:         mutatingwebhookconfigurations
      Kind:         ValidatingAdmissionPolicy
      Name:         validatingadmissionpolicies
      Kind:         ValidatingAdmissionPolicyBinding
      Name:         validatingadmissionpolicybindings
      Kind:         ValidatingWebhookConfiguration
      Name:         validatingwebhookconfigurations
    Group Version:  apiextensions.k8s.io/v1
    Resources:
      Kind:         CustomResourceDefinition
      Name:         customresourcedefinitions
    Group Version:  apiregistration.k8s.io/v1
    Resources:
      Kind:         APIService
      Name:         apiservices
    Group Version:  apps/v1
    Resources:
      Kind:         ControllerRevision
      Name:         controllerrevisions
      Kind:         DaemonSet
      Name:         daemonsets
      Kind:         Deployment
      Name:         deployments
      Kind:         ReplicaSet
      Name:         replicasets
      Kind:         StatefulSet
      Name:         statefulsets
    Group Version:  authentication.k8s.io/v1
    Resources:
      Kind:         SelfSubjectReview
      Name:         selfsubjectreviews
      Kind:         TokenReview
      Name:         tokenreviews
    Group Version:  authorization.k8s.io/v1
    Resources:
      Kind:         LocalSubjectAccessReview
      Name:         localsubjectaccessreviews
      Kind:         SelfSubjectAccessReview
      Name:         selfsubjectaccessreviews
      Kind:         SelfSubjectRulesReview
      Name:         selfsubjectrulesreviews
      Kind:         SubjectAccessReview
      Name:         subjectaccessreviews
    Group Version:  autoscaling/v1
    Resources:
      Kind:         HorizontalPodAutoscaler
      Name:         horizontalpodautoscalers
    Group Version:  autoscaling/v2
    Resources:
      Kind:         HorizontalPodAutoscaler
      Name:         horizontalpodautoscalers
    Group Version:  batch/v1
    Resources:
      Kind:         CronJob
      Name:         cronjobs
      Kind:         Job
      Name:         jobs
    Group Version:  certificates.k8s.io/v1
    Resources:
      Kind:         CertificateSigningRequest
      Name:         certificatesigningrequests
    Group Version:  coordination.k8s.io/v1
    Resources:
      Kind:         Lease
      Name:         leases
    Group Version:  crd.projectcalico.org/v1
    Resources:
      Kind:         BGPConfiguration
      Name:         bgpconfigurations
      Kind:         BGPFilter
      Name:         bgpfilters
      Kind:         BGPPeer
      Name:         bgppeers
      Kind:         BlockAffinity
      Name:         blockaffinities
      Kind:         CalicoNodeStatus
      Name:         caliconodestatuses
      Kind:         ClusterInformation
      Name:         clusterinformations
      Kind:         FelixConfiguration
      Name:         felixconfigurations
      Kind:         GlobalNetworkPolicy
      Name:         globalnetworkpolicies
      Kind:         GlobalNetworkSet
      Name:         globalnetworksets
      Kind:         HostEndpoint
      Name:         hostendpoints
      Kind:         IPAMBlock
      Name:         ipamblocks
      Kind:         IPAMConfig
      Name:         ipamconfigs
      Kind:         IPAMHandle
      Name:         ipamhandles
      Kind:         IPPool
      Name:         ippools
      Kind:         IPReservation
      Name:         ipreservations
      Kind:         KubeControllersConfiguration
      Name:         kubecontrollersconfigurations
      Kind:         NetworkPolicy
      Name:         networkpolicies
      Kind:         NetworkSet
      Name:         networksets
    Group Version:  discovery.k8s.io/v1
    Resources:
      Kind:         EndpointSlice
      Name:         endpointslices
    Group Version:  events.k8s.io/v1
    Resources:
      Kind:         Event
      Name:         events
    Group Version:  extensions.istio.io/v1alpha1
    Resources:
      Kind:         WasmPlugin
      Name:         wasmplugins
    Group Version:  flowcontrol.apiserver.k8s.io/v1
    Resources:
      Kind:         FlowSchema
      Name:         flowschemas
      Kind:         PriorityLevelConfiguration
      Name:         prioritylevelconfigurations
    Group Version:  flowcontrol.apiserver.k8s.io/v1beta3
    Resources:
      Kind:         FlowSchema
      Name:         flowschemas
      Kind:         PriorityLevelConfiguration
      Name:         prioritylevelconfigurations
    Group Version:  metallb.io/v1alpha1
    Resources:
      Kind:         AddressPool
      Name:         addresspools
    Group Version:  metallb.io/v1beta1
    Resources:
      Kind:         AddressPool
      Name:         addresspools
      Kind:         BFDProfile
      Name:         bfdprofiles
      Kind:         BGPAdvertisement
      Name:         bgpadvertisements
      Kind:         BGPPeer
      Name:         bgppeers
      Kind:         Community
      Name:         communities
      Kind:         IPAddressPool
      Name:         ipaddresspools
      Kind:         L2Advertisement
      Name:         l2advertisements
    Group Version:  metallb.io/v1beta2
    Resources:
      Kind:         BGPPeer
      Name:         bgppeers
    Group Version:  metrics.k8s.io/v1beta1
    Resources:
      Kind:         NodeMetrics
      Name:         nodes
      Kind:         PodMetrics
      Name:         pods
    Group Version:  networking.istio.io/v1
    Resources:
      Kind:         DestinationRule
      Name:         destinationrules
      Kind:         Gateway
      Name:         gateways
      Kind:         ServiceEntry
      Name:         serviceentries
      Kind:         Sidecar
      Name:         sidecars
      Kind:         VirtualService
      Name:         virtualservices
      Kind:         WorkloadEntry
      Name:         workloadentries
      Kind:         WorkloadGroup
      Name:         workloadgroups
    Group Version:  networking.istio.io/v1alpha3
    Resources:
      Kind:         DestinationRule
      Name:         destinationrules
      Kind:         EnvoyFilter
      Name:         envoyfilters
      Kind:         Gateway
      Name:         gateways
      Kind:         ServiceEntry
      Name:         serviceentries
      Kind:         Sidecar
      Name:         sidecars
      Kind:         VirtualService
      Name:         virtualservices
      Kind:         WorkloadEntry
      Name:         workloadentries
      Kind:         WorkloadGroup
      Name:         workloadgroups
    Group Version:  networking.istio.io/v1beta1
    Resources:
      Kind:         DestinationRule
      Name:         destinationrules
      Kind:         Gateway
      Name:         gateways
      Kind:         ProxyConfig
      Name:         proxyconfigs
      Kind:         ServiceEntry
      Name:         serviceentries
      Kind:         Sidecar
      Name:         sidecars
      Kind:         VirtualService
      Name:         virtualservices
      Kind:         WorkloadEntry
      Name:         workloadentries
      Kind:         WorkloadGroup
      Name:         workloadgroups
    Group Version:  networking.k8s.io/v1
    Resources:
      Kind:         IngressClass
      Name:         ingressclasses
      Kind:         Ingress
      Name:         ingresses
      Kind:         NetworkPolicy
      Name:         networkpolicies
    Group Version:  node.k8s.io/v1
    Resources:
      Kind:         RuntimeClass
      Name:         runtimeclasses
    Group Version:  policy/v1
    Resources:
      Kind:         PodDisruptionBudget
      Name:         poddisruptionbudgets
    Group Version:  rbac.authorization.k8s.io/v1
    Resources:
      Kind:         ClusterRoleBinding
      Name:         clusterrolebindings
      Kind:         ClusterRole
      Name:         clusterroles
      Kind:         RoleBinding
      Name:         rolebindings
      Kind:         Role
      Name:         roles
    Group Version:  scheduling.k8s.io/v1
    Resources:
      Kind:         PriorityClass
      Name:         priorityclasses
    Group Version:  security.istio.io/v1
    Resources:
      Kind:         AuthorizationPolicy
      Name:         authorizationpolicies
      Kind:         PeerAuthentication
      Name:         peerauthentications
      Kind:         RequestAuthentication
      Name:         requestauthentications
    Group Version:  security.istio.io/v1beta1
    Resources:
      Kind:         AuthorizationPolicy
      Name:         authorizationpolicies
      Kind:         PeerAuthentication
      Name:         peerauthentications
      Kind:         RequestAuthentication
      Name:         requestauthentications
    Group Version:  storage.k8s.io/v1
    Resources:
      Kind:         CSIDriver
      Name:         csidrivers
      Kind:         CSINode
      Name:         csinodes
      Kind:         CSIStorageCapacity
      Name:         csistoragecapacities
      Kind:         StorageClass
      Name:         storageclasses
      Kind:         VolumeAttachment
      Name:         volumeattachments
    Group Version:  telemetry.istio.io/v1
    Resources:
      Kind:         Telemetry
      Name:         telemetries
    Group Version:  telemetry.istio.io/v1alpha1
    Resources:
      Kind:         Telemetry
      Name:         telemetries
    Group Version:  v1
    Resources:
      Kind:  Binding
      Name:  bindings
      Kind:  ComponentStatus
      Name:  componentstatuses
      Kind:  ConfigMap
      Name:  configmaps
      Kind:  Endpoints
      Name:  endpoints
      Kind:  Event
      Name:  events
      Kind:  LimitRange
      Name:  limitranges
      Kind:  Namespace
      Name:  namespaces
      Kind:  Node
      Name:  nodes
      Kind:  PersistentVolumeClaim
      Name:  persistentvolumeclaims
      Kind:  PersistentVolume
      Name:  persistentvolumes
      Kind:  Pod
      Name:  pods
      Kind:  PodTemplate
      Name:  podtemplates
      Kind:  ReplicationController
      Name:  replicationcontrollers
      Kind:  ResourceQuota
      Name:  resourcequotas
      Kind:  Secret
      Name:  secrets
      Kind:  ServiceAccount
      Name:  serviceaccounts
      Kind:  Service
      Name:  services
  Conditions:
    Last Transition Time:  2025-04-09T00:25:57Z
    Message:               collected complete APIEnablements from the cluster
    Reason:                Complete
    Status:                True
    Type:                  CompleteAPIEnablements
    Last Transition Time:  2025-04-09T00:24:57Z
    Message:               cluster is healthy and ready to accept workloads
    Reason:                ClusterReady
    Status:                True
    Type:                  Ready
  Kubernetes Version:      v1.30.4
  Node Summary:
    Ready Num:  2
    Total Num:  2
  Resource Summary:
    Allocatable:
      Cpu:                  3700m
      Ephemeral - Storage:  186957545164
      hugepages-1Gi:        0
      hugepages-2Mi:        0
      Memory:               15265636Ki
      Pods:                 220
    Allocatable Modelings:
      Count:  1
      Grade:  0
      Count:  1
      Grade:  1
      Count:  0
      Grade:  2
      Count:  0
      Grade:  3
      Count:  0
      Grade:  4
      Count:  0
      Grade:  5
      Count:  0
      Grade:  6
      Count:  0
      Grade:  7
      Count:  0
      Grade:  8
    Allocated:
      Cpu:     1635m
      Memory:  1046142Ki
      Pods:    22
Events:        <none>
`;
