import useApi from "../../hooks/usdApi";
import { FEDERATION_API_BASE_URL } from "../../config/config";

interface Policy {
  name: string;
}

interface ListMeta {
  totalItems: number;
}

interface PropagationPolicy {
  objectMeta: {
    name: string;
    namespace: string;
    labels: Record<string, string>;
    annotations: Record<string, string>;
    creationTimestamp: string;
    uid: string;
  };
  typeMeta: {
    kind: string;
  };
  schedulerName: string;
  clusterAffinity: {
    clusterNames: string[];
  };
  relatedResources: any[];
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    listMeta: ListMeta;
    propagationpolicys: PropagationPolicy[];
    errors: any[];
  };
}

interface UseApiResult {
  data: ApiResponse | null;
  loading: boolean;
  error: any;
  refetch: () => void;
}

export default function Policies() {
  // const apiUrl = FEDERATION_API_BASE_URL + `/api/v1/propagationpolicy`;
  const apiUrl = FEDERATION_API_BASE_URL + `/api/v1/overview`;

  const {
    data: data,
    loading,
    error,
    refetch,
  }: UseApiResult = useApi({ apiUrl: apiUrl });

  console.log(`data: ${data}`);

  if (data === null && loading === true) {
    return <div> 로딩중이여.....</div>;
  }

  return (
    <>
      <h1>Propagation Policy API 불러옴</h1>
      <ul>
        {data && data.length > 0 ? (
          data.map((policy: Policy, index: number) => (
            <li key={index}>{policy.name}</li>
          ))
        ) : (
          <li>목록이 없습니다.</li>
        )}
      </ul>
    </>
  );
}
