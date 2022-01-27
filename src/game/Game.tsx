/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { Engine, Scene } from "react-babylonjs";

import { Vector3 } from "@babylonjs/core";
import { GameStore } from "../Store";
import { PoseMesh } from "./PoseMesh";
import useMeasure from "react-use-measure";

export default function Game() {
  const [ref, bounds] = useMeasure();
  const poses = GameStore.useState((s) => s.poses);
  const [rotation, setRotation] = useState(Vector3.Zero());

  useEffect(() => {
    setRotation(rotation.add(new Vector3(Math.PI * 0.1, 0, 0)));
  }, []);

  return (
    <div
      ref={ref}
      css={css`
        width: 100%;
        height: 100%;
        canvas {
          width: 100%;
          height: 100%;
        }
      `}
    >
      <Engine
        height={bounds.height ?? 100}
        width={bounds.width ?? 100}
        antialias
        canvasId="babylon-canvas"
      >
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={new Vector3(0, 1.25, 0)}
            alpha={Math.PI * 1.5}
            beta={Math.PI * 0.5}
            radius={6}
            noRotationConstraint
          />
          <hemisphericLight
            name="light1"
            intensity={0.85}
            direction={Vector3.Up()}
          />
          {poses.map((pose, i) => {
            const key = ["pose", i].join("-");
            return <PoseMesh key={key} name={key} pose={pose} />;
          })}
          {/* <ground
            name="ground1"
            width={10}
            height={10}
            subdivisions={2}
            receiveShadows
          /> */}
        </Scene>
      </Engine>
    </div>
  );
}
