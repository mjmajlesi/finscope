import type React from "react";

interface Ichildren {
  children : React.ReactNode
}

export default function Container({ children } : Ichildren ) {
  return (
    <div className="mx-3 sm:mx-5 md:mx-6 lg:mx-8 xl:mx-10">
      {children}
    </div>
  );
}
