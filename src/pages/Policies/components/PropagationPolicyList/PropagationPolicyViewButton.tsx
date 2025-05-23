import { getPropagationPolicyDetailApi } from "@/apis/propagationPolicy";
import { Button } from "@/components/Button";
import { CloseButton } from "@/components/CloseButton";
import { Box, Drawer, Portal } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function PropagationPolicyViewButton({
  namespace,
  name,
}: {
  namespace: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      size="xl"
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Drawer.Trigger asChild>
        <Button variant="blueGhost">View</Button>
      </Drawer.Trigger>
      {open === true ? (
        <PropagationPolicyYamlViwerDrawer namespace={namespace} name={name} />
      ) : null}
    </Drawer.Root>
  );
}

function PropagationPolicyYamlViwerDrawer({
  namespace,
  name,
}: {
  namespace: string;
  name: string;
}) {
  const { data: propagationPolicyDetail } = useQuery({
    queryKey: ["getPropagationPolicyDetailApi", namespace, name],
    queryFn: () => getPropagationPolicyDetailApi({ namespace, name }),
  });

  return propagationPolicyDetail == null ? null : (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{propagationPolicyDetail.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Box height="92vh">
              <Editor
                height="90vh"
                defaultLanguage="yaml"
                defaultValue={propagationPolicyDetail.yaml}
                options={{
                  scrollbar: {
                    vertical: "hidden",
                    horizontal: "hidden",
                    handleMouseWheel: true,
                  },
                  overviewRulerLanes: 0,
                }}
              />
            </Box>
          </Drawer.Body>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}

// export function YamlMaker() {
//   // const editRef = useRef(null);

//   // function handleEditorDidMount(editor, monaco) {
//   //   editorRef.current = editor;
//   // }

//   // function showValue() {
//   //   alert(editorRef.current.getValue());
//   // }

//   return (
//     <div style={{ height: "92vh" }}>
//       <Editor
//         height="90vh"
//         defaultLanguage="yaml"
//         defaultValue={yaml}
//         options={{
//           scrollbar: {
//             vertical: "hidden",
//             horizontal: "hidden",
//             handleMouseWheel: true,
//           },
//           overviewRulerLanes: 0,
//         }}
//         // onMount={handleEditorDidMount}
//       />
//     </div>
//   );
// }
