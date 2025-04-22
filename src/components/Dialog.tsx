import { Dialog as ChakraDialog } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type Type = "alert" | "resourceSetUp";

const rootStyleMap: Record<
  Type,
  Omit<ComponentProps<typeof ChakraDialog.Root>, "children">
> = {
  alert: { size: "sm", placement: "center" },
  resourceSetUp: {
    preventScroll: false,
    scrollBehavior: "inside",
    placement: "center",
  },
};

const contentStyleMap: Record<
  Type,
  ComponentProps<typeof ChakraDialog.Content>
> = {
  alert: {},
  resourceSetUp: {
    borderWidth: "1px",
    rounded: "lg",
    shadow: "1px 1px 3px rgba(0,0,0,0.3)",
    maxWidth: "800px",
    padding: "6px",
    margin: "10px auto",
    as: "form",
    maxHeight: "850px",
  },
};

const bodyStyleMap: Record<Type, ComponentProps<typeof ChakraDialog.Body>> = {
  alert: { textAlign: "center", paddingTop: "20px", marginTop: "8%" },
  resourceSetUp: { margin: "2%" },
};

export const Dialog = {
  Root: ({
    type,
    children,
    ...props
  }: { type: Type } & ComponentProps<typeof ChakraDialog.Root>) => (
    <ChakraDialog.Root {...rootStyleMap[type]} {...props}>
      {children}
    </ChakraDialog.Root>
  ),
  Trigger: ({ ...props }: ComponentProps<typeof ChakraDialog.Trigger>) => (
    <ChakraDialog.Trigger asChild {...props} />
  ),
  Backdrop: ChakraDialog.Backdrop,
  Positioner: ChakraDialog.Positioner,
  Content: ({
    type,
    children,
    ...props
  }: { type: Type } & ComponentProps<typeof ChakraDialog.Content>) => (
    <ChakraDialog.Content {...contentStyleMap[type]} {...props}>
      {children}
    </ChakraDialog.Content>
  ),
  Header: ChakraDialog.Header,
  Body: ({
    type,
    ...props
  }: { type: Type } & ComponentProps<typeof ChakraDialog.Body>) => (
    <ChakraDialog.Body {...bodyStyleMap[type]} {...props} />
  ),
  Title: ChakraDialog.Title,
  Footer: ChakraDialog.Footer,
  ActionTrigger: ({
    ...props
  }: ComponentProps<typeof ChakraDialog.ActionTrigger>) => (
    <ChakraDialog.ActionTrigger asChild {...props} />
  ),
  CloseTrigger: ({
    ...props
  }: ComponentProps<typeof ChakraDialog.CloseTrigger>) => (
    <ChakraDialog.CloseTrigger asChild {...props} />
  ),
};
