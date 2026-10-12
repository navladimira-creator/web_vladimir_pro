import { test } from "node:test";
import assert from "node:assert/strict";
import { bezpecnaCesta } from "../../src/lib/bezpecna-cesta.ts";

test("povolí cesty uvnitř webu", () => {
  assert.equal(bezpecnaCesta("/clenska-sekce/vitej"), "/clenska-sekce/vitej");
  assert.equal(bezpecnaCesta("/clenska-sekce?a=1"), "/clenska-sekce?a=1");
});

test("odmítne cizí adresy a triky", () => {
  const v = "/clenska-sekce";
  for (const zla of [
    "https://zly.example",
    "//zly.example",
    "/\\zly.example",
    "javascript:alert(1)",
    "/ok\r\nLocation: https://zly.example",
    "",
    null,
    undefined,
  ]) {
    assert.equal(bezpecnaCesta(zla as string | null | undefined), v, String(zla));
  }
});
