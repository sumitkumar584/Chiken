# Playroom — virtual-coins game demo

This repository includes an original Aviator and Teen Patti practice arcade with a simulated Netlify Function API. The layout uses common game-lobby conventions and is not affiliated with or a copy of any third-party casino brand.

## Run locally

Install the Netlify CLI and run:

```sh
npx netlify dev
```

Open the local URL printed by Netlify. Demo endpoints:

- `/.netlify/functions/game?game=health`
- `/.netlify/functions/game?game=aviator`
- `/.netlify/functions/game?game=teenpatti`

The API creates simulated round outcomes. It does not connect to a real casino or external game provider. The demo admin is at `/admin.html`; its configurable lobby message and stake limits are stored in the browser's local storage and are not server-wide or authentication-protected.

## Deployment

Deploy the branch to Netlify; `netlify.toml` configures the function directory. The API becomes available on that Netlify deployment. This GitHub change does not itself publish the site.

## Safety and scope

Virtual coins only: no deposits, withdrawals, cash prizes, real-money bets, real user accounts, or live casino API. Do not enter credentials or sensitive data into the demo admin. Any regulated gambling product requires properly licensed providers, secure server-side systems, and applicable legal approvals.
