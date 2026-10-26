import { useColorMode } from "@vueuse/core";

export function useTheme() {
  return useColorMode({
    attribute: "class",
    modes: {
      light: "light",
      dark: "dark",
    },
    storageKey: "admin-theme",
  });
}
