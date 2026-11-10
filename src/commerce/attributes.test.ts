import { test } from "node:test";
import assert from "node:assert/strict";
import { deriveGrade, deriveGundamSeries, deriveScale } from "./attributes.ts";

test("grade comes from explicit field first", () => {
  assert.equal(deriveGrade({ grade: "rg", title: "Anything", category: "Figures" }), "RG");
});

test("grade title tokens only apply to Gundam model kits", () => {
  assert.equal(deriveGrade({ title: "HG 1/144 Gundam Aerial", category: "Model Kits" }), "HG");
  assert.equal(deriveGrade({ title: "MG RX-78-2 Gundam Ver.3.0", category: "Model Kits" }), "MG");
  assert.equal(deriveGrade({ title: "HG Hoodie Gundam", category: "Apparel" }), undefined);
  assert.equal(deriveGrade({ title: "Pokemon Model Kit XERNEAS", category: "Model Kits" }), undefined);
});

test("grade is never guessed when no token is present", () => {
  assert.equal(deriveGrade({ title: "Gundam Barbatos Kit", category: "Model Kits" }), undefined);
});

test("scale is read from 1/N tokens only", () => {
  assert.equal(deriveScale({ title: "1/72 Scale Darkstar Plastic Model Kit" }), "1/72");
  assert.equal(deriveScale({ title: "Mr. Color 132 - Earth Green" }), undefined);
  assert.equal(deriveScale({ scale: "1/100", title: "x" }), "1/100");
});

test("Gundam series requires a Gundam product", () => {
  assert.equal(deriveGundamSeries({ title: "HG Gundam Aerial", isGundam: true }), "wfm");
  assert.equal(deriveGundamSeries({ title: "SEED figure", isGundam: false }), undefined);
});
