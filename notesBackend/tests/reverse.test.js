import { test } from "node:test";
import assert from "node:assert";
import { reverse } from "../utils/for_testing.js";

test("Reverse of a", () => {
  const result = reverse("a");

  assert.strictEqual(result, "a");
});

test("Reverese of react", () => {
  const result = reverse("react");

  assert.strictEqual(result, "tcaer");
});

test("Reverse of saippuakauppias", () => {
  const result = reverse("saippuakauppias");

  assert.strictEqual(result, "saippuakauppias");
});
