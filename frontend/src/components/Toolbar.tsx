"use client";

import { useFormationStore } from "@/store/useFormationStore";


export default function Toolbar(){


  const addDancer =
    useFormationStore(
      (state)=>state.addDancer
    );


  return (
    <div
      className="
        flex
        gap-3
        mb-6
      "
    >

      <button
        onClick={addDancer}
        className="
          px-5
          py-2
          rounded-xl
          bg-blue-500
          text-white
          hover:bg-blue-600
        "
      >
        Add Dancer
      </button>


    </div>
  );
}