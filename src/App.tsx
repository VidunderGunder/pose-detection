/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import {
  AppShell,
  Button,
  Divider,
  Header,
  List,
  MantineProvider,
  Navbar,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import Brand from "./Components/Brand";
import { Camera } from "./Components/Camera";
import { appCSS } from "./styles";
import { FaCamera } from "react-icons/fa";

export default function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Global styles={appCSS} />
      <AppShell
        fixed
        padding={0}
        navbar={
          <Navbar width={{ base: 300 }} padding="sm">
            <Navbar.Section>
              <Brand />
            </Navbar.Section>
            <Navbar.Section grow mt="lg">
              <Divider />
              <div
                css={css`
                  padding: 1rem 0;
                `}
              >
                <Button
                  fullWidth
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                  leftIcon={<FaCamera />}
                >
                  Camera
                </Button>
              </div>
            </Navbar.Section>
            {/* <Navbar.Section>
              <Divider />
              <Text>FOOTER</Text>
            </Navbar.Section> */}
          </Navbar>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
            display: grid;
            place-items: center;
            padding: 1rem;
          `}
        >
          <Camera />
        </div>
      </AppShell>
    </MantineProvider>
  );
}
