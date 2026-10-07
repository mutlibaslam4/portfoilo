"use client";

import { useEffect } from "react";
import { profile } from "@/data/site";

/**
 * Deterrent only: blocks casual right-click / "view source" / devtools shortcuts
 * and image dragging. It cannot stop a determined person — anything the browser
 * renders can be copied — and it is disabled in development so you can still debug.
 */
export default function Protect() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const editable = (t: EventTarget | null) =>
      t instanceof HTMLElement && !!t.closest("input, textarea, [contenteditable]");

    const onMenu = (e: MouseEvent) => {
      if (!editable(e.target)) e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;
      const blocked =
        e.key === "F12" ||
        (mod && e.shiftKey && ["i", "j", "c"].includes(k)) || // devtools
        (e.metaKey && e.altKey && ["i", "j", "c", "u"].includes(k)) || // macOS devtools / source
        (mod && !e.shiftKey && ["u", "s"].includes(k)); // view-source, save page
      if (blocked) e.preventDefault();
    };
    const onDrag = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) e.preventDefault();
    };

    document.addEventListener("contextmenu", onMenu);
    document.addEventListener("keydown", onKey);
    document.addEventListener("dragstart", onDrag);

    console.log(
      `%c© ${new Date().getFullYear()} ${profile.name}`,
      "font-size:18px;font-weight:700;color:#43e36d",
    );
    console.log("This site's design, code and content are protected. Copying or cloning is not permitted.");

    return () => {
      document.removeEventListener("contextmenu", onMenu);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("dragstart", onDrag);
    };
  }, []);

  return null;
}
