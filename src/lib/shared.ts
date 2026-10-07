import { createStore } from "./store";

export type Lang = "en" | "ur";
export type Theme = "dark" | "light";

export const langStore = createStore<Lang>("en");
export const themeStore = createStore<Theme>("dark");
/** text pricing / calculator drop into the contact form */
export const prefillStore = createStore<string>("");
/** the intro loader only plays on the first load, not on client navigations */
export const loaderState = { played: false };
