"use client";

import Dancer from "./Dancer";
import { useFormationStore } from "@/store/useFormationStore";

export default function Stage() {
  const dancers = useFormationStore(
    (state) => state.formation.dancers
  );

  return (
    <div
      className="
        relative
        w-full
        aspect-video
        rounded-3xl
        bg-slate-100
        border
        border-slate-300
        overflow-hidden
      "
    >
      {dancers.map((dancer) => (
        <Dancer
          key={dancer.id}
          dancer={dancer}
        />
      ))}
    </div>
  );
}