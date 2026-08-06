"use client";


import Stage from "@/components/Stage";
import Toolbar from "@/components/Toolbar";


export default function Home(){


  return (

    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-50
        to-purple-50
        p-10
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            mb-2
          "
        >
          Choreo Studio
        </h1>


        <Toolbar />


        <Stage />


      </div>

    </main>

  );
}