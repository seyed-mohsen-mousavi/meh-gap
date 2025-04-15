import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-full flex-col justify-between">
      <header className="w-full border p-5">header</header>
      <section className="flex-1 overflow-auto border">{children}</section>
      <section className="border p-3">sender</section>
    </div>
  );
}

export default layout;
