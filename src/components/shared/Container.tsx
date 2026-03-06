import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full justify-center">
      <div className="w-[90%]">{children}</div>
    </section>
  );
}
