import assert from "node:assert/strict";
import test from "node:test";
import { getWeeklyActivityAnimationConfig } from "./home-content.tsx";

test("animates filled weekly activity bars from zero with a 45ms stagger", () => {
  const config = getWeeklyActivityAnimationConfig(
    {
      label: "M",
      height: "72%",
      isToday: false,
      hasFill: true,
      minutes: 32,
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
      label: "T",
      height: "48%",
      isToday: true,
      hasFill: true,
      minutes: 18,
    },
    1,
    true,
  );

  assert.equal(config.animate, false);
  assert.equal(config.initialHeight, "48%");
  assert.equal(config.targetHeight, "48%");
  assert.equal(config.delay, 0);
});
