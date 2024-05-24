import { type VariantProps, cva } from "class-variance-authority";
export { default as Divider } from "./Divider.vue";

export const dividerVariants = cva("border-divider w-full", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type DividerVariants = VariantProps<typeof dividerVariants>;
