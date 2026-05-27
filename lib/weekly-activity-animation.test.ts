import assert from "node:assert/strict";
import test from "node:test";
import { getWeeklyActivityAnimationConfig } from "./weekly-activity-animation.ts";

test("animates filled weekly activity bars from zero with a 45ms stagger", () => {
  const config = getWeeklyActivityAnimationConfig(
    {
      height: "72%",
      hasFill: true,
    },
    3,
    false,
  );

  assert.equal(config.animate, true);
  assert.equal(config.initialHeight, "0%");
  assert.equal(config.targetHeight, "72%");
  assert.equal(config.delay, 0.135);
});

test("skips weekly activity animation for reduced motion", () => {
  const config = getWeeklyActivityAnimationConfig(
    {
      height: "48%",
      hasFill: true,
    },
    1,
    true,
  );

  assert.equal(config.animate, false);
  assert.equal(config.initialHeight, "48%");
  assert.equal(config.targetHeight, "48%");
  assert.equal(config.delay, 0);
});

test("skips weekly activity animation for empty bars", () => {
  const config = getWeeklyActivityAnimationConfig(
    {
      height: "0%",
      hasFill: false,
    },
    5,
    false,
  );

  assert.equal(config.animate, false);
  assert.equal(config.initialHeight, "0%");
  assert.equal(config.targetHeight, "0%");
  assert.equal(config.delay, 0);
});
