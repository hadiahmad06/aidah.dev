"use client";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn cursor-pointer">
      Print / save as PDF
    </button>
  );
}
