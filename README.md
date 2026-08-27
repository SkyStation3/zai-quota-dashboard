# Z.ai Coding Plan Quota Dashboard

A lightweight, zero-dependency Server-Side Rendered (SSR) dashboard to monitor and track your Z.ai GLM Coding Plan usage vs. remaining time before quota reset.

## Features

- **SSR Secure Architecture**: No proxy endpoints or client-side API fetches. The server handles all connections to Z.ai, eliminating key leaks or network exposure in the browser.
- **Pacing Index**: Compares credit consumption percentages to elapsed window duration, alerting you if you are outpacing time decay.
- **5-Hour Rolling Limit**: Real-time ticker counting down to when your rolling window credits begin to recover.
- **Weekly Pool**: High-visibility tracker for your weekly cap, complete with reset countdown.
- **MCP Tool Calls**: Tracks monthly MCP web search / reader calls usage.
- **Background History Log**: Server background daemon automatically logs usage checkpoints to a local `history.json` file once every hour, completely independent of whether the browser tab is open.
- **Simulation/Mock Mode**: Adjust usage sliders directly on the UI to preview dashboard metrics, gauges, and historical burn rate graphs without inputting a real key.
- **Dark Mode Support**: Adapts cleanly to dark/light browser setups.

---

## How to Set Up and Run

No installations are needed since the app is built on standard HTML/React and Node's built-in modules.

1. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and insert your Z.ai API Key:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and insert your key:
   ```env
   Z_AI_API_KEY=your_actual_zai_api_key_here
   PORT=3000
   ```

2. **Start the local server**:
   ```bash
   node server.js
   ```

3. **Open the Dashboard**:
   Navigate to the secure loopback address:
   ```
   http://127.0.0.1:3000
   ```

4. **Interactive Simulation**:
   Toggle the **Simulation** switch at the top to interact with mock controls, adjust plan tiers (Lite, Pro, Max), and see pacing states change.
