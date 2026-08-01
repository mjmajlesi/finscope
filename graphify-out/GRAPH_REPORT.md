# Graph Report - .  (2026-07-31)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 166 nodes · 191 edges · 11 communities (10 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fcf97cc9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- index.ts
- compilerOptions
- devDependencies
- compilerOptions
- dependencies
- App.tsx
- package.json
- WatchlistProvider.tsx
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `compilerOptions` - 18 edges
3. `scripts` - 5 edges
4. `useWatchlist()` - 4 edges
5. `Coin` - 4 edges
6. `lib` - 4 edges
7. `fetchTopCoins()` - 3 edges
8. `fetchCoinChart()` - 3 edges
9. `fetchExchangeRates()` - 3 edges
10. `convertCurrency()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `useMarketData()` --calls--> `fetchTopCoins()`  [EXTRACTED]
  src/hooks/useMarketData.ts → src/api/coingecko.ts
- `useCoinChart()` --calls--> `fetchCoinChart()`  [EXTRACTED]
  src/hooks/useCoinChart.ts → src/api/coingecko.ts
- `useExchangeRates()` --calls--> `fetchExchangeRates()`  [EXTRACTED]
  src/hooks/useExchangeRates.ts → src/api/coingecko.ts
- `useCurrencyConverter()` --calls--> `convertCurrency()`  [EXTRACTED]
  src/hooks/useExchangeRates.ts → src/api/coingecko.ts
- `WatchlistProvider()` --calls--> `useWatchlist()`  [EXTRACTED]
  src/context/WatchlistProvider.tsx → src/hooks/useWatchlist.ts

## Import Cycles
- None detected.

## Communities (11 total, 1 thin omitted)

### Community 0 - "index.ts"
Cohesion: 0.10
Nodes (24): CoinGeckoAPIError, convertCurrency(), ExchangeAPIError, fetchCoinChart(), fetchExchangeRates(), fetchTopCoins(), useCoinChart(), useCurrencyConverter() (+16 more)

### Community 1 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2022, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly (+18 more)

### Community 2 - "devDependencies"
Cohesion: 0.08
Nodes (25): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+17 more)

### Community 3 - "compilerOptions"
Cohesion: 0.09
Nodes (22): ES2023, node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module (+14 more)

### Community 4 - "dependencies"
Cohesion: 0.12
Nodes (17): lucide-react, dependencies, lucide-react, react, react-dom, react-router, react-router-dom, recharts (+9 more)

### Community 5 - "App.tsx"
Cohesion: 0.18
Nodes (8): App(), Container(), Ichildren, Footer(), Home(), Login(), Navbar(), TradingValue()

### Community 6 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 7 - "WatchlistProvider.tsx"
Cohesion: 0.31
Nodes (5): WatchlistContext, WatchlistContextValue, WatchlistProvider(), getInitialWatchlist(), useWatchlist()

## Knowledge Gaps
- **81 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+76 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _81 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09848484848484848 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._