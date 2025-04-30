import SearchBar from "@/components/SearchBar";
import LevelSelect from "@/pages/Policies/components/LevelSelect";
import Namespace from "@/pages/Policies/components/Namespace";
import PolicyAdd from "@/pages/Policies/components/PolicyAdd";
import PolicyList from "@/pages/Policies/components/PolicyList";
import Pagination from "@/components/Pagination";
import { FEDERATION_API_BASE_URL } from "@/config/config";
import { Flex } from "@/components/Flex";
import { toaster } from "@/components/Toaster";

export default function Policies() {
  toaster.create({
    description: "정책이 삭제되었습니다.",
    type: "info",
  });
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        marginTop="9px"
        marginBottom="50px"
      >
        <Flex>
          <LevelSelect />
          <Namespace />
        </Flex>
        <Flex justify="flex-end">
          <SearchBar />
          <PolicyAdd />
        </Flex>
      </Flex>
      <PolicyList />
      <Pagination />
    </>
  );
}

function apitest() {
  const apiUrl = FEDERATION_API_BASE_URL + `/api/v1/overview`;

  const token = sessionStorage.getItem("token");
  console.log(`token : ${token}`);
  return <div>{token}</div>;
}
