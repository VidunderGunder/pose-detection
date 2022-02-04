import { Store } from "pullstate";

export type Result = unknown[];

export const store = new Store<{
  results: Result[];
  threshold: number;
  frequency?: number;
}>({
  results: [],
  threshold: 0.25,
});
