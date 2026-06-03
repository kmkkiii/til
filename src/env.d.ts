/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// zenn-content-css ships only a CSS entry with no type declarations,
// so the side-effect import needs an ambient module to satisfy tsgo --noEmit.
declare module "zenn-content-css";
