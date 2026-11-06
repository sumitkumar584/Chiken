# Playroom — virtual-coins game demo

This repository now contains a small Aviator and Teen Patti practice-game interface. The old movie catalog and admin page content have been replaced.

## Run the API locally

The API is a Netlify Function in `netlify/functions/game.js`. Install the Netlify CLI, then run:

```sh
npx netlify dev
```

Open the local URL printed by Netlify. The browser calls `/.netlify/functions/game?game=aviator` or `?game=teenpatti`. Health check: `/.netlify/functions/game?game=health`.

Deploy the repository to Netlify to make the API endpoint available online. This is a self-contained **simulated demo API**, not a third-party casino feed. Outcomes are random demo results; the wallet is stored in the user's browser and is not server-backed.

## Important

Virtual coins only. There are no deposits, withdrawals, cash prizes, or real-money bets. This demo is not a certified gambling product and must not be presented as a live casino or real-money API. Any regulated real-money service would require a properly licensed provider, compliant backend, and applicable legal approvals.
