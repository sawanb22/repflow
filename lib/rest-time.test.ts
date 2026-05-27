import assert from "node:assert/strict";
import test from "node:test";
import { formatRestTimeLabel, parseRestTimeSeconds } from "./rest-time.ts";

test("parses seconds suffixed values", () => {
  assert.equal(parseRestTimeSeconds("60s"), 60);
});

test("parses minute suffixed values", () => {
  assert.equal(parseRestTimeSeconds("2m"), 120);
});

test("parses plain numeric values", () => {
  assert.equal(parseRestTimeSeconds("45"), 45);
});

test("returns zero for empty values", () => {
  assert.equal(parseRestTimeSeconds(""), 0);
});

test("formats plain numeric rest values with seconds suffix", () => {
  assert.equal(formatRestTimeLabel("45"), "45s");
});

test("preserves already suffixed rest values", () => {
  assert.equal(formatRestTimeLabel("60s"), "60s");
});

test("formats minute values into compact seconds label", () => {
  assert.equal(formatRestTimeLabel("2m"), "120s");
});
