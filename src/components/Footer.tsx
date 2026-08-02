import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto pt-8 pb-4 flex flex-col md:flex-row items-center justify-between text-text-muted text-sm">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Activity className="w-4 h-4 text-brand" />
        <span className="font-medium text-text-primary">FinScope</span>
      </div>
      <p>&copy; {new Date().getFullYear()} FinScope<span className="not-lg:hidden"> — Built with React, TypeScript & Tailwind CSS </span></p>
      <p className="mt-1 not-sm:hidden">Powered by <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">CoinGecko API</a> & <a href="https://api.frankfurter.app/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">Frankfurter API</a></p>
    </footer>
  );
}