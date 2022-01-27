import { Color3, Color4 } from "@babylonjs/core";

export function color4ToColor3(color: Color4): Color3 {
  return new Color3(color.r, color.g, color.b);
}

export function color3ToColor4(color: Color3, alpha = 1): Color4 {
  return new Color4(color.r, color.g, color.b, alpha);
}

export const gameColors = {
  white: new Color4(1, 1, 1, 1),
  black: new Color4(0, 0, 0, 1),
  primary: new Color4(0.175, 0.225, 0.35, 1),
  secondary: new Color4(1, 1, 1, 1),
  pink: new Color4(0.825, 0.4, 0.4, 1)
};
