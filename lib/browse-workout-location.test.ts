import assert from "node:assert/strict";
import test from "node:test";
import { getWorkoutLocationOptionState } from "./browse-workout-location.ts";

test("keeps gym browse option clickable for home users", () => {
  assert.deepEqual(getWorkoutLocationOptionState("home", "gym"), {
    active: false,
    disabled: false,
  });
});

test("keeps both browse option clickable for gym users", () => {
  assert.deepEqual(getWorkoutLocationOptionState("gym", "both"), {
    active: false,
    disabled: false,
  });
});

test("marks the selected option active without disabling it", () => {
  assert.deepEqual(getWorkoutLocationOptionState("both", "both"), {
    active: true,
    disabled: false,
  });
});
