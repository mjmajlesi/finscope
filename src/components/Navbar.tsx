import { Link } from "react-router";


export default function Navbar() {
  const navs = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Tradingvalue',
      href: '#tradingValue'
    },
    {
      name: 'About',
      href: '#about'
    },
    {
      name: 'exchange',
      href: '#exchange'
    },
  ]
  return (
    <div className="w-full flex items-center justify-between py-5 rounded-3xl mt-4 bg-[#F2ECEB] px-8 ">
      <div>
      <span className="text-2xl font-bold">Finscope</span>
      </div>
      <div>
        <ul className="flex flex-row items-center justify-center gap-6">
          {navs.map((nav) => (
            <li key={nav.name} className="font-medium text-lg text-[#1F1F1D] hover:scale-105 hover:transition-all hover:duration-300 ">
              <Link to={nav.href}>{nav.name} </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="bg-[#C2C20A] px-3 py-4 rounded-xl hover:scale-110 hover:transition-all hover:duration-300 hover:bg-[#E5E50B] cursor-pointer">Sign In</button>
      </div>
    </div>
  );
}
