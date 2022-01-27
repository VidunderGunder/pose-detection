import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@mediapipe/pose";

export default function usePoseDetector() {
  const [detector, setDetector] = useState<poseDetection.PoseDetector>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadModel() {
    try {
      const _ = await poseDetection.createDetector(
        poseDetection.SupportedModels.BlazePose,
        {
          runtime: "mediapipe",
          modelType: "heavy",
          solutionPath:
            "https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162",
        }
      );
      if (!_) return;
      setDetector(_);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }

  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  return { error, loading, detector };
}
