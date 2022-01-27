/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import useMeasure from "react-use-measure";
import usePoseDetection from "./usePoseDetection";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { Switch } from "@mantine/core";
import { GameStore } from "./Store";
import { Pose } from "@tensorflow-models/pose-detection";
import ReactPlayer from "react-player";

// MediaTrackConstraints
const cameraConfig = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
const mirrored = true;

export const WebcamCapture = (props: ComponentPropsWithoutRef<"div">) => {
  const [webcamContainerRef, bounds] = useMeasure();
  const webcamRef = useRef<Webcam>(null);

  const videoRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("/dance-video.mp4");

  const { detector, loading, error } = usePoseDetection();
  const [active, setActive] = useState(false);
  const threshold = GameStore.useState((s) => s.poseThreshold);

  const video =
    videoRef?.current?.getInternalPlayer() ?? webcamRef?.current?.video;

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!video) return;
      let _: Pose[] | undefined;
      try {
        // @ts-ignore
        _ = await detector?.estimatePoses(video, {
          scoreThreshold: threshold,
        });
      } catch {
        return;
      }
      GameStore.update((s) => {
        if (_ !== undefined && _) {
          s.poses = _;
        }
      });
    });
    return () => {
      clearInterval(interval);
    };
  }, [active]);

  return (
    <div
      css={css`
        position: relative;
        padding: 1em;
      `}
      {...props}
    >
      <div ref={webcamContainerRef}>
        {videoUrl ? (
          <div
            css={css`
              border-radius: 0.5em;
              overflow: hidden;
              max-width: 100%;
              max-height: 100%;
              padding: 0;
              margin: 0;
              border: 0;
              box-sizing: border-box;
              * {
                padding: 0;
                margin: 0;
                border: 0;
              }
            `}
          >
            <ReactPlayer
              ref={videoRef}
              onReady={() => {
                setTimeout(() => {
                  if (!active) setActive(true);
                }, 500);
              }}
              playing={active}
              width="100%"
              height="100%"
              css={css`
                padding: 0;
                margin: 0;
                border: 0;
                box-sizing: border-box;
              `}
              controls
              url={videoUrl}
              loop
              muted
            />
          </div>
        ) : (
          <Webcam
            mirrored={mirrored}
            audio={false}
            id="video"
            ref={webcamRef}
            onUserMedia={() => {
              if (!active) setActive(true);
            }}
            width={"100%"}
            height={"100%"}
            videoConstraints={cameraConfig}
            css={css`
              border-radius: 0.5em;
              box-shadow: 0 3px 0 0 rgba(20, 20, 20, 1),
                0 4px 14px -5px rgba(0, 0, 0, 0.5);
            `}
          />
        )}
      </div>
      {/* <div
        css={css`
          position: absolute;
          z-index: 2;
          left: 50%;
          bottom: 0.5em;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 0.25em;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 0.75em;
          border-radius: 0.5em;
        `}
      >
        <Switch
          checked={!error && active}
          onChange={(e) => {
            setActive(e.currentTarget.checked);
          }}
          disabled={loading || error}
          label={error ? "Error" : loading ? "Loading..." : "Active"}
        />
      </div> */}
    </div>
  );
};
