import { CurrencyConverter } from '../components/CurrencyConverter';

export function Converter() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-2 text-center sm:text-left">Currency Converter</h1>
        <p className="text-text-muted mb-8 text-center sm:text-left">Convert between fiat and cryptocurrencies in real-time</p>
        <CurrencyConverter />
      </div>
    </div>
  );
}