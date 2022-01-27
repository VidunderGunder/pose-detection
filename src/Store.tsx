import { Store } from "pullstate";
import { Pose } from "@tensorflow-models/pose-detection";

export const GameStore = new Store<{
  poses: Pose[];
  poseThreshold: number;
}>({
  poses: [],
  poseThreshold: 0.25,
});
