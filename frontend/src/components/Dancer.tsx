"use client";

import { useState } from "react";
import { Dancer as DancerType } from "@/types/formation";
import { useFormationStore } from "@/store/useFormationStore";


type Props = {
  dancer: DancerType;
};


export default function Dancer({ dancer }: Props) {

  const moveDancer = useFormationStore(
    (state) => state.moveDancer
  );


  const [dragging, setDragging] = useState(false);


  function handlePointerDown(
    e: React.PointerEvent<HTMLDivElement>
  ) {

    setDragging(true);

    e.currentTarget.setPointerCapture(
      e.pointerId
    );
  }


  function handlePointerMove(
    e: React.PointerEvent<HTMLDivElement>
  ) {

    if (!dragging) return;


    const dancerElement =
      e.currentTarget;


    const stage =
      dancerElement.parentElement;


    if (!stage) return;


    const stageRect =
      stage.getBoundingClientRect();


    const x =
      ((e.clientX - stageRect.left)
        / stageRect.width) * 100;


    const y =
      ((e.clientY - stageRect.top)
        / stageRect.height) * 100;


    moveDancer(
      dancer.id,
      Math.max(0, Math.min(100, x)),
      Math.max(0, Math.min(100, y))
    );

  }


  function handlePointerUp(
    e: React.PointerEvent<HTMLDivElement>
  ) {

    setDragging(false);

    e.currentTarget.releasePointerCapture(
      e.pointerId
    );

  }



  return (

    <div

      onPointerDown={handlePointerDown}

      onPointerMove={handlePointerMove}

      onPointerUp={handlePointerUp}


      style={{
        left:`${dancer.x}%`,
        top:`${dancer.y}%`,
      }}


      className={`
        absolute
        -translate-x-1/2
        -translate-y-1/2
        flex
        flex-col
        items-center
        cursor-grab
        select-none
        ${
          dragging
          ? "cursor-grabbing"
          : ""
        }
      `}
    >

      <div

        className="
          w-12
          h-12
          rounded-full
          flex
          items-center
          justify-center
          text-white
          font-bold
          shadow-md
        "

        style={{
          backgroundColor:dancer.color
        }}

      >
        {dancer.name[0]}

      </div>


      <span>
        {dancer.name}
      </span>


    </div>

  );
}