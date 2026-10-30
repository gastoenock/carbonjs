import { defineConfig } from "tsup";
export default defineConfig([
 { entry: { index: "src/index.js" }, format: ["esm", "cjs"], platform: "neutral", target: "es2022", clean: false, dts: false },
 { entry: { "carbon": "src/browser.js" }, format: ["iife"], platform: "browser", target: "es2022", clean: false, dts: false }
]);
