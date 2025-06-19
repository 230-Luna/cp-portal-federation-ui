import { SegmentGroup as ChakraSegmentGroup } from "@chakra-ui/react";
import type { ComponentProps } from "react";

type Variant = "medium" | "large";

type SegmentSubComponent =
  | typeof ChakraSegmentGroup.Root
  | typeof ChakraSegmentGroup.Indicator
  | typeof ChakraSegmentGroup.Items
  | typeof ChakraSegmentGroup.Item
  | typeof ChakraSegmentGroup.ItemText
  | typeof ChakraSegmentGroup.ItemHiddenInput;

type SegmentProps<T extends SegmentSubComponent> = ComponentProps<T> & {
  variant?: Variant;
};

const rootStyleConfig: Record<
  Variant,
  ComponentProps<typeof ChakraSegmentGroup.Root>
> = {
  medium: { size: "md" },
  large: {
    size: "md",
  },
};

export const SegmentGroup = {
  Root: ({
    variant,
    ...props
  }: SegmentProps<typeof ChakraSegmentGroup.Root>) => (
    <ChakraSegmentGroup.Root
      {...(variant != null ? rootStyleConfig[variant] : {})}
      {...props}
    ></ChakraSegmentGroup.Root>
  ),
  Indicator: ({
    ...props
  }: SegmentProps<typeof ChakraSegmentGroup.Indicator>) => (
    <ChakraSegmentGroup.Indicator
      background="white"
      borderRadius="md"
      {...props}
    ></ChakraSegmentGroup.Indicator>
  ),
  Items: ({ ...props }: SegmentProps<typeof ChakraSegmentGroup.Items>) => {
    const { items, ...restProps } = props;
    return <ChakraSegmentGroup.Items {...props}></ChakraSegmentGroup.Items>;
  },
  Item: ({ ...props }: SegmentProps<typeof ChakraSegmentGroup.Item>) => {
    return <ChakraSegmentGroup.Item {...props}></ChakraSegmentGroup.Item>;
  },
  ItemText: ({
    ...props
  }: SegmentProps<typeof ChakraSegmentGroup.ItemText>) => {
    return (
      <ChakraSegmentGroup.ItemText {...props}></ChakraSegmentGroup.ItemText>
    );
  },
  ItemHiddenInput: ({
    ...props
  }: SegmentProps<typeof ChakraSegmentGroup.ItemHiddenInput>) => {
    return (
      <ChakraSegmentGroup.ItemHiddenInput
        {...props}
      ></ChakraSegmentGroup.ItemHiddenInput>
    );
  },
};
