/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import { MantineProvider } from "@mantine/core";
import Game from "./game/Game";
import { WebcamCapture } from "./Camera";

export default function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Global
        styles={css`
          html,
          body,
          #root {
            height: 100%;
            background-color: #22222b;
            overflow: hidden;
          }
          html,
          body,
          div,
          span {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
          html,
          * {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            outline: none;
          }
        `}
      />
      <div
        css={css`
          height: 100%;
          width: 100%;
          display: grid;
          place-items: center;
        `}
      >
        <WebcamCapture
          css={css`
            width: max(25%, 250px);
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 1;
          `}
        />
        <div
          css={css`
            width: 100%;
            height: 100%;
            position: absolute;
          `}
        >
          <Game />
        </div>
      </div>
    </MantineProvider>
  );
}
