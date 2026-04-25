import { openBrowserAsync, WebBrowserPresentationStyle } from "expo-web-browser";
import { type ReactNode } from "react";
import { Linking, Pressable, Text, type PressableProps } from "react-native";

type Props = Omit<PressableProps, "onPress"> & {
  href: string;
  children?: ReactNode;
};

export function ExternalLink({ href, children, ...rest }: Props) {
  return (
    <Pressable
      {...rest}
      onPress={async () => {
        if (process.env.EXPO_OS !== "web") {
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
          return;
        }

        await Linking.openURL(href);
      }}
    >
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </Pressable>
  );
}
