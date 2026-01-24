"use client";
import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [Menu, SetMenu] = useState<boolean>(false);

  const Onmenu = () => {
    SetMenu(!Menu);
  };

  const navs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Tradingvalue",
      href: "#tradingValue",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "exchange",
      href: "#exchange",
    },
  ];
  return (
    <div className="w-full  py-5 rounded-3xl mt-4 bg-[#F2ECEB] px-8 ">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold">Finscope</span>
        </div>
        <div className="not-md:hidden">
          <ul className="flex flex-row items-center justify-center gap-6">
            {navs.map((nav) => (
              <li
                key={nav.name}
                className="font-medium text-lg text-[#1F1F1D] hover:scale-105 hover:transition-all hover:duration-300 "
              >
                <Link to={nav.href}>{nav.name} </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="not-md:hidden">
          <button className="bg-[#C2C20A] px-3 py-4 rounded-xl hover:scale-110 hover:transition-all hover:duration-300 hover:bg-[#E5E50B] cursor-pointer">
            Sign In
          </button>
        </div>

        {/*  mobile screen  */}

        <div className="md:hidden">
          {Menu ? (
            <div
              className="flex flex-row items-center justify-center gap-1 cursor-pointer"
              onClick={Onmenu}
            >
              <div className="bg-black w-1.5 h-8 rounded-full" />
              <div className="bg-black w-1.5 h-8 rounded-full" />
              <div className="bg-black w-1.5 h-8 rounded-full" />
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-1 cursor-pointer"
              onClick={Onmenu}
            >
              <div className="bg-black h-1.5 w-8 rounded-full" />
              <div className="bg-black h-1.5 w-8 rounded-full" />
              <div className="bg-black h-1.5 w-8 rounded-full" />
            </div>
          )}
        </div>
      </div>

      <div className="my-3">
        {Menu && (
          <div className="w-full">
            <ul className="flex flex-col items-center justify-center gap-2">
              {navs.map((nav) => (
                <li
                  key={nav.name}
                  className="font-medium text-lg text-[#1F1F1D] hover:scale-105 hover:transition-all hover:duration-300 "
                >
                  <Link to={nav.href}>{nav.name} </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
