import assert from "node:assert/strict";
import test from "node:test";
import { createToastStore, TOAST_DURATION_MS } from "./toast-store.ts";

test("adds a success toast with the default duration", () => {
  const store = createToastStore();

  store.success("Profile updated.");

  const [toast] = store.getToasts();
  assert.equal(store.getToasts().length, 1);
  assert.equal(toast?.type, "success");
  assert.equal(toast?.message, "Profile updated.");
  assert.equal(toast?.duration, TOAST_DURATION_MS);
});

test("keeps only the newest three toasts", () => {
  const store = createToastStore();

  store.info("One");
  store.info("Two");
  store.info("Three");
  store.info("Four");

  assert.deepEqual(
    store.getToasts().map((toast) => toast.message),
    ["Two", "Three", "Four"],
  );
});

test("dismisses a toast by id", () => {
  const store = createToastStore();
  const id = store.error("Unable to save workout.");

  store.dismiss(id);

  assert.equal(store.getToasts().length, 0);
});
