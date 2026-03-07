"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  fontFamily: "var(--font-montserrat), sans-serif",
  primaryColor: "brand",
  primaryShade: 7,
  defaultRadius: "xl",
  colors: {
    brand: [
      "#e8f0f9",
      "#c2d5f0",
      "#9bb9e7",
      "#75a0de",
      "#4e87d4",
      "#276dc5",
      "#1054a8",
      "#04346D",
      "#02285a",
      "#011c42",
    ],
  },
  components: {
    Button: { defaultProps: { radius: "xl" } },
    TextInput: { defaultProps: { radius: "xl" } },
    PasswordInput: { defaultProps: { radius: "xl" } },
    Select: { defaultProps: { radius: "xl" } },
    NativeSelect: { defaultProps: { radius: "xl" } },
    Textarea: { defaultProps: { radius: "xl" } },
    Paper: { defaultProps: { radius: "xl" } },
    Modal: { defaultProps: { radius: "xl" } },
    Drawer: { defaultProps: { radius: "xl" } },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
}
