import * as poseDetection from "@tensorflow-models/pose-detection";
import { Color3, Color4, Vector3 } from "@babylonjs/core";
import { ComponentPropsWithoutRef } from "react";
import { GameStore } from "../Store";

const sizes: {
  [key: string]: number;
} = {
  nose: 0.025,

  left_eye: 0.01,
  right_eye: 0.01,
  left_eye_inner: 0.01,
  right_eye_inner: 0.01,
  left_eye_outer: 0.01,
  right_eye_outer: 0.01,
  left_ear: 0.025,
  right_ear: 0.025,

  mouth_left: 0,
  mouth_right: 0,

  left_shoulder: 0.15,
  right_shoulder: 0.15,
  left_elbow: 0.1,
  right_elbow: 0.1,
  left_wrist: 0.1,
  right_wrist: 0.1,
  left_hip: 0.125,
  right_hip: 0.125,
  left_knee: 0.1,
  right_knee: 0.1,
  left_ankle: 0.1,
  right_ankle: 0.1,
};

const jointsToConnect = [
  ["left_shoulder", "left_elbow"],
  ["left_elbow", "left_wrist"],
  ["right_shoulder", "right_elbow"],
  ["right_elbow", "right_wrist"],
  ["left_hip", "left_knee"],
  ["left_knee", "left_ankle"],
  ["right_hip", "right_knee"],
  ["right_knee", "right_ankle"],
  ["left_shoulder", "right_shoulder"],
  ["left_shoulder", "left_hip"],
  ["right_shoulder", "right_hip"],
  ["left_hip", "right_hip"],

  ["left_eye", "left_eye_inner"],
  ["left_eye_outer", "left_eye_inner"],

  ["right_eye", "right_eye_inner"],
  ["right_eye_outer", "right_eye_inner"],

  ["mouth_left", "mouth_right "],
];

export function PoseMesh({
  pose,
  name = "pose-point",
  ...sphereProps
}: { pose: poseDetection.Pose } & Partial<ComponentPropsWithoutRef<"sphere">>) {
  const threshold = GameStore.useState((s) => s.poseThreshold);

  const Lines = () => (
    <>
      {jointsToConnect.map(([a, b]) => {
        const pointA = pose.keypoints3D?.find((p) => p.name === a);
        const pointB = pose.keypoints3D?.find((p) => p.name === b);

        if (pointA === undefined || pointB === undefined) return null;

        const scoreAvg = ((pointA.score ?? 0) + (pointB.score ?? 0)) / 2;

        const vectorA = new Vector3(
          pointA?.x ?? 0,
          -(pointA?.y ?? 0) + 0.825,
          pointA?.z ?? 0
        );
        const vectorB = new Vector3(
          pointB?.x ?? 0,
          -(pointB?.y ?? 0) + 0.825,
          pointB?.z ?? 0
        );

        const distance = vectorA.subtract(vectorB).length();

        const key = [name ?? "unnamed-pose", "line", a, b].join("-");
        return (
          <lines
            key={key}
            name={key}
            points={[vectorA, vectorB]}
            color={Color3.FromArray([
              Math.max((2 - scoreAvg * 2) * 0.75, 0),
              Math.max(scoreAvg, 0),
              0.42,
            ])}
          />
        );
      })}
    </>
  );

  return (
    <mesh name={name}>
      {pose.keypoints3D?.map((point, i) => {
        if (!point.score || point.score < threshold) return null;

        const size = sizes[point.name ?? ""];

        const key = [
          name ?? "unnamed-pose",
          point.name ?? "unnamed-point",
          i,
        ].join("-");
        return (
          <>
            <sphere
              key={key}
              name={key}
              diameter={size ?? 0.0675}
              setEnabled={size !== 0}
              segments={8}
              position={new Vector3(point.x, -point.y + 0.825, point.z)}
              {...sphereProps}
            >
              <standardMaterial
                name={[key, "material"].join("-")}
                diffuseColor={Color3.FromArray([
                  Math.max((2 - point.score * 2) * 0.75, 0),
                  Math.max(point.score, 0),
                  0.42,
                ])}
                alpha={point.score}
              />
            </sphere>
          </>
        );
      })}
      <Lines />
    </mesh>
  );
}
