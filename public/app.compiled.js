function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// React and UI components for the Z.ai Quota Tracker & Dashboard
const {
  useState,
  useEffect,
  useRef
} = React;

// Custom SVG Icons Component to keep the project zero-dependency
const Icon = ({
  name,
  className = "w-5 h-5",
  ...props
}) => {
  const icons = {
    refresh: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    })),
    clock: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })),
    chart: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    })),
    alert: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
    })),
    info: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "m11.25 11.25.041-.02a.75.75 0 1 1 .51.51l-.041.02-.016.082-.08.38a1.25 1.25 0 0 1-2.483-.513l.08-.38.016-.082ZM12 8.25h.008v.008H12V8.25Z"
    }), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })),
    check: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })),
    trash: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    })),
    sun: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 3v2.25m0 13.5V21m9.75-9h-2.25m-13.5 0H3m16.5-6.75-1.591 1.591M6.75 17.25l-1.591 1.591m12.727 0-1.591-1.591M6.75 6.75 5.159 8.341M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
    })),
    moon: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M21.75 6.24c.024.068.04.143.04.22a5.96 5.96 0 0 1-5.63 5.97 6 6 0 0 1-5.97-5.63a6 6 0 0 1 5.63-5.97 6 6 0 0 1 5.97 5.63ZM12.006 15.623a9.9 9.9 0 0 0-5.748-2.617C4.167 12.8 2.25 14.593 2.25 16.74v2.01c0 1.243 1.007 2.25 2.25 2.25h15c1.243 0 2.25-1.007 2.25-2.25v-2.01c0-2.147-1.917-3.94-4.008-3.734a9.9 9.9 0 0 0-5.736 2.617Z"
    })),
    lightning: /*#__PURE__*/React.createElement("svg", _extends({
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2",
      stroke: "currentColor",
      className: className
    }, props), /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
    }))
  };
  return icons[name] || null;
};

// Main App Component
const App = () => {
  // Config states
  const [refreshInterval, setRefreshInterval] = useState(() => Number(localStorage.getItem('zai_refresh_interval')) || 900); // seconds
  const [isMockMode, setIsMockMode] = useState(() => localStorage.getItem('zai_mock_mode') === 'true');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('zai_dark_mode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [isServerConfigured, setIsServerConfigured] = useState(() => !!window.__SERVER_CONFIGURED__);

  // Data states (Initial loading strictly server-side rendered!)
  const [quotaData, setQuotaData] = useState(() => window.__INITIAL_DATA__);
  const [history, setHistory] = useState(() => window.__HISTORY_DATA__ || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(() => {
    if (!window.__SERVER_CONFIGURED__) {
      return 'Backend server has no API Key configured. Please set the Z_AI_API_KEY environment variable on the server.';
    }
    if (!window.__INITIAL_DATA__ && !window.__SERVER_CONFIGURED__) {
      return 'Failed to retrieve initial quota data from the Z.ai API.';
    }
    return '';
  });

  // Timers and animations
  const [nowTime, setNowTime] = useState(Date.now());

  // Mock Controls State (for interactive testing when in mock mode)
  const [mockConsumed5h, setMockConsumed5h] = useState(55);
  const [mockConsumedWeekly, setMockConsumedWeekly] = useState(12);
  const [mockPlanTier, setMockPlanTier] = useState('pro');

  // Sync theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('zai_dark_mode', darkMode);
  }, [darkMode]);

  // Keep nowTime updated for countdowns
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setNowTime(Date.now());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Set up periodic page reloading for server-side updates
  useEffect(() => {
    if (refreshInterval > 0 && !isMockMode && isServerConfigured) {
      const interval = setInterval(() => {
        window.location.reload();
      }, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, isMockMode, isServerConfigured]);

  // Handle mock data generation & syncing
  useEffect(() => {
    if (isMockMode) {
      generateMockData();
    } else {
      // Revert to SSR data when exiting mock mode
      setQuotaData(window.__INITIAL_DATA__);
      setHistory(window.__HISTORY_DATA__ || []);
    }
    localStorage.setItem('zai_mock_mode', isMockMode);
  }, [isMockMode, mockConsumed5h, mockConsumedWeekly, mockPlanTier]);

  // Generate Mock Endpoint Response matching the exact Z.ai fields
  const generateMockData = () => {
    let mockReset5h = Number(localStorage.getItem('mock_reset_5h'));
    let mockResetWeekly = Number(localStorage.getItem('mock_reset_weekly'));
    let mockResetSearch = Number(localStorage.getItem('mock_reset_search'));
    const now = Date.now();
    if (!mockReset5h || mockReset5h < now) {
      mockReset5h = now + 2.5 * 60 * 60 * 1000;
      localStorage.setItem('mock_reset_5h', mockReset5h);
    }
    if (!mockResetWeekly || mockResetWeekly < now) {
      mockResetWeekly = now + 4.2 * 24 * 60 * 60 * 1000;
      localStorage.setItem('mock_reset_weekly', mockResetWeekly);
    }
    if (!mockResetSearch || mockResetSearch < now) {
      mockResetSearch = now + 15 * 24 * 60 * 60 * 1000;
      localStorage.setItem('mock_reset_search', mockResetSearch);
    }
    const data = {
      limits: [{
        type: "TIME_LIMIT",
        unit: 5,
        number: 1,
        usage: 1000,
        currentValue: 120,
        remaining: 880,
        percentage: 12,
        nextResetTime: mockResetSearch,
        usageDetails: [{
          modelCode: "search-prime",
          usage: 80
        }, {
          modelCode: "web-reader",
          usage: 40
        }, {
          modelCode: "zread",
          usage: 0
        }]
      }, {
        type: "TOKENS_LIMIT",
        unit: 3,
        number: 5,
        percentage: mockConsumed5h,
        nextResetTime: mockReset5h
      }, {
        type: "TOKENS_LIMIT",
        unit: 6,
        number: 1,
        percentage: mockConsumedWeekly,
        nextResetTime: mockResetWeekly
      }],
      level: mockPlanTier
    };
    setQuotaData(data);

    // Inject mock history points
    setHistory([{
      timestamp: now - 30 * 60 * 1000,
      tier: mockPlanTier,
      pct5h: Math.max(0, mockConsumed5h - 10),
      pctWeekly: Math.max(0, mockConsumedWeekly - 1)
    }, {
      timestamp: now - 60 * 60 * 1000,
      tier: mockPlanTier,
      pct5h: Math.max(0, mockConsumed5h - 25),
      pctWeekly: Math.max(0, mockConsumedWeekly - 2)
    }, {
      timestamp: now - 90 * 60 * 1000,
      tier: mockPlanTier,
      pct5h: Math.max(0, mockConsumed5h - 40),
      pctWeekly: Math.max(0, mockConsumedWeekly - 3)
    }]);
    setError('');
  };

  // Trigger page reload (SSR fetch occurs on backend)
  const handleForceRefresh = () => {
    if (isMockMode) return;
    setLoading(true);
    window.location.reload();
  };
  const handleAddManualCheckpoint = () => {
    if (isMockMode) return;
    handleForceRefresh(); // reloading page forces a backend record check
  };
  const clearHistory = () => {
    if (isMockMode) {
      setHistory([]);
      return;
    }
    if (confirm('Are you sure you want to clear historical tracking data on the server?')) {
      setLoading(true);
      fetch('/api/history/clear', {
        method: 'POST'
      }).then(res => res.json()).then(() => {
        window.location.reload();
      }).catch(err => {
        setLoading(false);
        alert('Failed to clear history: ' + err.message);
      });
    }
  };
  const deleteHistoryItem = timestamp => {
    if (isMockMode) {
      setHistory(prev => prev.filter(item => item.timestamp !== timestamp));
      return;
    }
    if (confirm('Are you sure you want to delete this historical checkpoint?')) {
      setLoading(true);
      fetch('/api/history/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timestamp
        })
      }).then(res => res.json()).then(() => {
        window.location.reload();
      }).catch(err => {
        setLoading(false);
        alert('Failed to delete checkpoint: ' + err.message);
      });
    }
  };
  const exportHistoryToCSV = () => {
    if (history.length === 0) return;
    let csv = 'Timestamp,Plan Tier,5h Usage %,Weekly Usage %\n';
    history.forEach(item => {
      csv += `"${new Date(item.timestamp).toLocaleString()}","${item.tier}",${item.pct5h},${item.pctWeekly}\n`;
    });
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `zai_quota_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper: map units to total window minutes
  const getWindowMinutes = limit => {
    if (limit.unit === 2) return limit.number;
    if (limit.unit === 3) return limit.number * 60;
    if (limit.unit === 4) return limit.number * 60 * 24;
    if (limit.unit === 5) return limit.number * 60 * 24 * 30;
    if (limit.unit === 6) return limit.number * 60 * 24 * 7;
    if (limit.type === 'TIME_LIMIT') return 43200;
    return limit.usage > 30000 ? 10080 : 300;
  };

  // Calculate pacing metadata
  const getPacingData = limit => {
    if (!limit) return null;
    const durationMins = getWindowMinutes(limit);
    const durationMs = durationMins * 60 * 1000;
    const resetTime = limit.nextResetTime;
    const timeRemainingMs = Math.max(0, resetTime - nowTime);
    const timeElapsedMs = Math.max(0, durationMs - timeRemainingMs);
    const timeElapsedPercent = durationMs > 0 ? timeElapsedMs / durationMs * 100 : 100;
    const usagePercent = limit.percentage !== undefined ? limit.percentage : limit.usage > 0 ? limit.currentValue / limit.usage * 100 : 0;
    const difference = usagePercent - timeElapsedPercent;
    let status = 'safe';
    let label = 'Conservative';
    let description = 'Your consumption rate is safely below the time progression. Keep coding!';
    if (usagePercent >= 95) {
      status = 'critical';
      label = 'Exhausted';
      description = 'Quota is fully consumed. Waiting for reset window.';
    } else if (difference > 25) {
      status = 'critical';
      label = 'Over-Pacing (Critical)';
      description = 'Burning quota extremely fast! You will lock out soon unless you slow down.';
    } else if (difference > 10) {
      status = 'warning';
      label = 'Over-Pacing (Warning)';
      description = 'You are consuming quota faster than the time left. Pace yourself to avoid lockout.';
    } else if (difference > -10) {
      status = 'steady';
      label = 'Balanced';
      description = 'Your usage matches the time progression. Standard pace.';
    }
    return {
      timeRemainingMs,
      timeElapsedPercent,
      usagePercent,
      difference,
      status,
      label,
      description
    };
  };

  // Format milliseconds into human string
  const formatCountdown = ms => {
    if (ms <= 0) return '00:00:00';
    const totalSecs = Math.floor(ms / 1000);
    const secs = totalSecs % 60;
    const totalMins = Math.floor(totalSecs / 60);
    const mins = totalMins % 60;
    const totalHours = Math.floor(totalMins / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);
    const pad = num => String(num).padStart(2, '0');
    if (days > 0) {
      return `${days}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
    }
    return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
  };

  // Parse quota data dynamically
  const limit5h = quotaData?.limits?.find(l => getWindowMinutes(l) === 300);
  const limitWeekly = quotaData?.limits?.find(l => getWindowMinutes(l) === 10080);
  const limitSearch = quotaData?.limits?.find(l => getWindowMinutes(l) > 10080 || l.type === 'TIME_LIMIT');
  const pacing5h = limit5h ? getPacingData(limit5h) : null;
  const pacingWeekly = limitWeekly ? getPacingData(limitWeekly) : null;
  const pacingSearch = limitSearch ? getPacingData(limitSearch) : null;

  // Render simple SVG Line chart of history checkpoints
  const renderHistoryChart = () => {
    if (history.length < 2) {
      return /*#__PURE__*/React.createElement("div", {
        className: "h-48 flex items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl"
      }, /*#__PURE__*/React.createElement("div", {
        className: "text-center"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "chart",
        className: "w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600"
      }), /*#__PURE__*/React.createElement("p", {
        className: "text-sm"
      }, "Need at least 2 checkpoints logged to render history graph."), /*#__PURE__*/React.createElement("p", {
        className: "text-xs mt-1"
      }, "Checkpoints log automatically on the server in the background (every 1 hour).")));
    }
    const width = 800;
    const height = 180;
    const padding = 25;
    const sortedHistory = [...history].reverse();
    const getX = index => padding + index / (sortedHistory.length - 1) * (width - 2 * padding);
    const getY = pct => height - padding - pct / 100 * (height - 2 * padding);
    let path5h = '';
    let pathW = '';
    sortedHistory.forEach((pt, idx) => {
      const x = getX(idx);
      const y5 = getY(pt.pct5h);
      const yW = getY(pt.pctWeekly);
      if (idx === 0) {
        path5h = `M ${x} ${y5}`;
        pathW = `M ${x} ${yW}`;
      } else {
        path5h += ` L ${x} ${y5}`;
        pathW += ` L ${x} ${yW}`;
      }
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "relative"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${width} ${height}`,
      className: "w-full h-auto overflow-visible"
    }, [0, 25, 50, 75, 100].map(val => /*#__PURE__*/React.createElement("g", {
      key: val
    }, /*#__PURE__*/React.createElement("line", {
      x1: padding,
      y1: getY(val),
      x2: width - padding,
      y2: getY(val),
      className: "stroke-slate-200 dark:stroke-slate-800",
      strokeWidth: "1",
      strokeDasharray: "4 4"
    }), /*#__PURE__*/React.createElement("text", {
      x: padding - 5,
      y: getY(val) + 4,
      className: "text-[9px] font-medium fill-slate-400 dark:fill-slate-600 text-right",
      textAnchor: "end"
    }, val, "%"))), /*#__PURE__*/React.createElement("g", {
      transform: `translate(${width - 200}, 10)`
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "10",
      cy: "5",
      r: "4",
      className: "fill-brand-500"
    }), /*#__PURE__*/React.createElement("text", {
      x: "20",
      y: "9",
      className: "text-[10px] font-semibold fill-slate-600 dark:fill-slate-400"
    }, "5-Hour Quota"), /*#__PURE__*/React.createElement("circle", {
      cx: "110",
      cy: "5",
      r: "4",
      className: "fill-emerald-500"
    }), /*#__PURE__*/React.createElement("text", {
      x: "120",
      y: "9",
      className: "text-[10px] font-semibold fill-slate-600 dark:fill-slate-400"
    }, "Weekly Quota")), /*#__PURE__*/React.createElement("path", {
      d: path5h,
      fill: "none",
      className: "stroke-brand-500 dark:stroke-brand-400",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: pathW,
      fill: "none",
      className: "stroke-emerald-500 dark:stroke-emerald-400",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), sortedHistory.map((pt, idx) => /*#__PURE__*/React.createElement("g", {
      key: idx
    }, /*#__PURE__*/React.createElement("circle", {
      cx: getX(idx),
      cy: getY(pt.pct5h),
      r: "4",
      className: "fill-brand-500 stroke-white dark:stroke-slate-900",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: getX(idx),
      cy: getY(pt.pctWeekly),
      r: "4",
      className: "fill-emerald-500 stroke-white dark:stroke-slate-900",
      strokeWidth: "1.5"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between text-[10px] text-slate-400 dark:text-slate-600 px-8 mt-1"
    }, /*#__PURE__*/React.createElement("span", null, new Date(sortedHistory[0].timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })), /*#__PURE__*/React.createElement("span", null, "Timeline (Server Checkpoints Logged)"), /*#__PURE__*/React.createElement("span", null, new Date(sortedHistory[sortedHistory.length - 1].timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }))));
  };
  const cardsCount = (limit5h ? 1 : 0) + (limitWeekly ? 1 : 0) + (limitSearch ? 1 : 0);
  const gridClass = cardsCount === 3 ? "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8" : cardsCount === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" : "grid grid-cols-1 gap-8 mb-8";
  return /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto px-4 py-6 md:p-8 max-w-7xl w-full mx-auto"
  }, /*#__PURE__*/React.createElement("header", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2.5 bg-brand-600 text-white rounded-2xl shadow-lg shadow-brand-500/20"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lightning",
    className: "w-6 h-6 animate-pulse"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
  }, "Z.ai Coding Plan Quota Tracker"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 dark:text-slate-400"
  }, "Monitor credit consumption rolling cycles and reset pacings"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3 self-start md:self-auto"
  }, quotaData && /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-55 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 border border-brand-200/50 dark:border-brand-900/30 capitalize"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping"
  }), "Plan: ", quotaData.level), isMockMode && /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 rounded-xl text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300 border border-amber-200/40"
  }, "Mock Mode"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-xl px-2.5 py-1 text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 font-semibold"
  }, "Interval:"), /*#__PURE__*/React.createElement("select", {
    value: refreshInterval,
    disabled: isMockMode,
    onChange: e => {
      const val = Number(e.target.value);
      setRefreshInterval(val);
      localStorage.setItem('zai_refresh_interval', val);
    },
    className: "bg-transparent border-none text-slate-700 dark:text-slate-300 font-bold focus:ring-0 cursor-pointer outline-none"
  }, /*#__PURE__*/React.createElement("option", {
    value: 0
  }, "Manual"), /*#__PURE__*/React.createElement("option", {
    value: 30
  }, "30s"), /*#__PURE__*/React.createElement("option", {
    value: 60
  }, "1m"), /*#__PURE__*/React.createElement("option", {
    value: 300
  }, "5m"), /*#__PURE__*/React.createElement("option", {
    value: 900
  }, "15m"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIsMockMode(!isMockMode);
    },
    className: `px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${isMockMode ? 'bg-amber-600 border-amber-600 text-white' : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900'}`
  }, "Simulation"), /*#__PURE__*/React.createElement("button", {
    onClick: handleForceRefresh,
    disabled: loading || isMockMode || !isServerConfigured,
    className: "p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-900 transition-colors disabled:opacity-50",
    title: "Force refresh (reloads page)"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "refresh",
    className: `w-4 h-4 ${loading ? 'animate-spin text-brand-500' : ''}`
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDarkMode(!darkMode),
    className: "p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-900 transition-colors",
    title: "Toggle theme"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: darkMode ? 'sun' : 'moon',
    className: "w-4 h-4"
  })))), error && /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-200/50 dark:border-red-900/30 flex gap-2.5 items-start text-sm mb-6 shadow-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    className: "w-5 h-5 flex-shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold"
  }, "Backend Service Notification"), /*#__PURE__*/React.createElement("p", {
    className: "mt-0.5"
  }, error))), isMockMode && /*#__PURE__*/React.createElement("section", {
    className: "bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 mb-8 shadow-sm"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-3 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-amber-500 animate-ping"
  }), "Simulation Panel (Adjust Slider Values to Test Dashboard Layouts)"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-slate-500 mb-1"
  }, "Select Tier Limits"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, ['lite', 'pro', 'max'].map(tier => /*#__PURE__*/React.createElement("button", {
    key: tier,
    onClick: () => setMockPlanTier(tier),
    className: `flex-1 py-1.5 px-3 rounded-lg text-xs font-bold uppercase border transition-all ${mockPlanTier === tier ? 'bg-amber-600 border-amber-600 text-white shadow-sm' : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900'}`
  }, tier)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-slate-500 mb-1"
  }, "5h Consumed Credits: ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-amber-700 dark:text-amber-400"
  }, mockConsumed5h, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "100",
    step: "1",
    value: mockConsumed5h,
    onChange: e => setMockConsumed5h(Number(e.target.value)),
    className: "w-full accent-amber-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-slate-500 mb-1"
  }, "Weekly Consumed Credits: ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-amber-700 dark:text-amber-400"
  }, mockConsumedWeekly, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "100",
    step: "1",
    value: mockConsumedWeekly,
    onChange: e => setMockConsumedWeekly(Number(e.target.value)),
    className: "w-full accent-amber-500"
  })))), quotaData ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-center justify-between shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-3 rounded-2xl ${pacing5h?.status === 'critical' || pacingWeekly?.status === 'critical' ? 'bg-red-500/10 text-red-500' : pacing5h?.status === 'warning' || pacingWeekly?.status === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    className: "w-7 h-7"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold text-slate-900 dark:text-white"
  }, "Quota Pacing Assessment"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 dark:text-slate-400 mt-0.5"
  }, pacing5h?.status === 'critical' ? 'Your rolling 5h quota is critically low. Consider pausing coding tasks.' : pacing5h?.status === 'warning' ? 'Warning: You are consuming credits faster than the time window allows.' : 'Looking Great! Your coding quota usage is completely aligned with reset intervals.'), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-2 font-medium"
  }, "Reset Window pacing: ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-brand-600 dark:text-brand-400"
  }, "5h: ", pacing5h?.label || 'N/A'), " | ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-emerald-600 dark:text-emerald-400"
  }, "Weekly: ", pacingWeekly?.label || 'N/A'))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-600 text-white rounded-2xl p-5 shadow-lg shadow-brand-500/10 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider opacity-85"
  }, "Session Health Gauge"), /*#__PURE__*/React.createElement(Icon, {
    name: "lightning",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-extrabold"
  }, pacing5h ? Math.round(pacing5h.usagePercent) : 0, "% Used"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs opacity-75 mt-1"
  }, "Rolling 5-Hour Credit Window")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 w-full bg-black/25 rounded-full h-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-full h-2 transition-all duration-500",
    style: {
      width: `${pacing5h ? Math.min(100, pacing5h.usagePercent) : 0}%`
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: gridClass
  }, limit5h && pacing5h && /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-800 transition-colors"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
  }, "Limit Window"), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-extrabold text-slate-900 dark:text-white mt-0.5"
  }, "5-Hour Rolling Credits")), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 text-[11px] font-bold rounded-lg uppercase bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 border border-brand-200/50"
  }, "Rolling")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2 mb-4"
  }, limit5h.currentValue !== undefined && limit5h.usage !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black text-slate-900 dark:text-white"
  }, limit5h.currentValue.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-sm font-semibold"
  }, "/ ", limit5h.usage.toLocaleString(), " credits used")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black text-slate-900 dark:text-white"
  }, pacing5h.usagePercent.toFixed(0), "%"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-sm font-semibold"
  }, " used"))), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs font-bold text-slate-500 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, pacing5h.usagePercent.toFixed(0), "% consumed"), limit5h.remaining !== undefined ? /*#__PURE__*/React.createElement("span", null, limit5h.remaining.toLocaleString(), " credits left") : /*#__PURE__*/React.createElement("span", null, (100 - pacing5h.usagePercent).toFixed(0), "% left")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-100 dark:bg-slate-900 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200/30 dark:border-slate-800/40"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full rounded-full transition-all duration-500 ${pacing5h.usagePercent > 85 ? 'bg-red-500' : pacing5h.usagePercent > 60 ? 'bg-amber-500' : 'bg-brand-500'}`,
    style: {
      width: `${Math.min(100, pacing5h.usagePercent)}%`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-900/40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-slate-500"
  }, "Pace: ", pacing5h.label), /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-bold ${pacing5h.status === 'critical' ? 'text-red-500' : pacing5h.status === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`
  }, pacing5h.difference > 0 ? `+${pacing5h.difference.toFixed(0)}% Ahead` : `${pacing5h.difference.toFixed(0)}% Behind`)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "Used Credits"), /*#__PURE__*/React.createElement("span", null, pacing5h.usagePercent.toFixed(0), "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-500 rounded-full h-1.5",
    style: {
      width: `${pacing5h.usagePercent}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "Time Elapsed (Estimated)"), /*#__PURE__*/React.createElement("span", null, pacing5h.timeElapsedPercent.toFixed(0), "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-500 rounded-full h-1.5",
    style: {
      width: `${pacing5h.timeElapsedPercent}%`
    }
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 mt-3 italic"
  }, pacing5h.description))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-100 dark:border-slate-900 pt-4 mt-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-500"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider"
  }, "Next Credit Recovering In"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-mono font-black text-slate-800 dark:text-white leading-none mt-0.5"
  }, formatCountdown(pacing5h.timeRemainingMs)), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-500 mt-1 block"
  }, "Target Time: ", new Date(limit5h.nextResetTime).toLocaleTimeString(), " (", new Date(limit5h.nextResetTime).toLocaleDateString(), ")"))))), limitWeekly && pacingWeekly && /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-355 dark:hover:border-slate-800 transition-colors"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
  }, "Limit Window"), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-extrabold text-slate-900 dark:text-white mt-0.5"
  }, "Weekly Usage Pool")), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 text-[11px] font-bold rounded-lg uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/50"
  }, "Fixed Cycle")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2 mb-4"
  }, limitWeekly.currentValue !== undefined && limitWeekly.usage !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black text-slate-900 dark:text-white"
  }, limitWeekly.currentValue.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-sm font-semibold"
  }, "/ ", limitWeekly.usage.toLocaleString(), " credits used")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black text-slate-900 dark:text-white"
  }, pacingWeekly.usagePercent.toFixed(0), "%"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-sm font-semibold"
  }, " used"))), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs font-bold text-slate-500 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, pacingWeekly.usagePercent.toFixed(0), "% consumed"), limitWeekly.remaining !== undefined ? /*#__PURE__*/React.createElement("span", null, limitWeekly.remaining.toLocaleString(), " credits left") : /*#__PURE__*/React.createElement("span", null, (100 - pacingWeekly.usagePercent).toFixed(0), "% left")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-100 dark:bg-slate-900 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200/30 dark:border-slate-800/40"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full rounded-full transition-all duration-500 ${pacingWeekly.usagePercent > 85 ? 'bg-red-500' : pacingWeekly.usagePercent > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`,
    style: {
      width: `${Math.min(100, pacingWeekly.usagePercent)}%`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-900/40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-slate-500"
  }, "Pace: ", pacingWeekly.label), /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-bold ${pacingWeekly.status === 'critical' ? 'text-red-500' : pacingWeekly.status === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`
  }, pacingWeekly.difference > 0 ? `+${pacingWeekly.difference.toFixed(0)}% Ahead` : `${pacingWeekly.difference.toFixed(0)}% Behind`)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "Used Credits"), /*#__PURE__*/React.createElement("span", null, pacingWeekly.usagePercent.toFixed(0), "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-500 rounded-full h-1.5",
    style: {
      width: `${pacingWeekly.usagePercent}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "Time Elapsed (Weekly Cycle)"), /*#__PURE__*/React.createElement("span", null, pacingWeekly.timeElapsedPercent.toFixed(0), "%")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-500 rounded-full h-1.5",
    style: {
      width: `${pacingWeekly.timeElapsedPercent}%`
    }
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 mt-3 italic"
  }, pacingWeekly.description))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-100 dark:border-slate-900 pt-4 mt-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-500"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider"
  }, "Weekly Window Resets In"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-mono font-black text-slate-800 dark:text-white leading-none mt-0.5"
  }, formatCountdown(pacingWeekly.timeRemainingMs)), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-500 mt-1 block"
  }, "Target Time: ", new Date(limitWeekly.nextResetTime).toLocaleDateString(), " at ", new Date(limitWeekly.nextResetTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })))))), limitSearch && pacingSearch && /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-355 dark:hover:border-slate-800 transition-colors"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
  }, "Limit Window"), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-extrabold text-slate-900 dark:text-white mt-0.5"
  }, "MCP Tool Calls")), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 text-[11px] font-bold rounded-lg uppercase bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/50"
  }, "Monthly")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2 mb-4"
  }, limitSearch.currentValue !== undefined && limitSearch.usage !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black text-slate-900 dark:text-white"
  }, limitSearch.currentValue.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-sm font-semibold"
  }, "/ ", limitSearch.usage.toLocaleString(), " queries used")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black text-slate-900 dark:text-white"
  }, pacingSearch.usagePercent.toFixed(0), "%"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-sm font-semibold"
  }, " used"))), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs font-bold text-slate-500 mb-1"
  }, /*#__PURE__*/React.createElement("span", null, pacingSearch.usagePercent.toFixed(0), "% consumed"), limitSearch.remaining !== undefined ? /*#__PURE__*/React.createElement("span", null, limitSearch.remaining.toLocaleString(), " left") : /*#__PURE__*/React.createElement("span", null, (100 - pacingSearch.usagePercent).toFixed(0), "% left")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-100 dark:bg-slate-900 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200/30 dark:border-slate-800/40"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full rounded-full transition-all duration-500 ${pacingSearch.usagePercent > 85 ? 'bg-red-500' : pacingSearch.usagePercent > 60 ? 'bg-amber-500' : 'bg-blue-500'}`,
    style: {
      width: `${Math.min(100, pacingSearch.usagePercent)}%`
    }
  }))), limitSearch.usageDetails && limitSearch.usageDetails.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-900/40"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2"
  }, "Usage breakdown:"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, limitSearch.usageDetails.map(detail => /*#__PURE__*/React.createElement("div", {
    key: detail.modelCode,
    className: "flex justify-between items-center text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-slate-600 dark:text-slate-400"
  }, detail.modelCode), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-800 dark:text-white"
  }, detail.usage.toLocaleString(), " calls")))))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-100 dark:border-slate-900 pt-4 mt-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-500"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider"
  }, "Monthly Reset In"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-mono font-black text-slate-800 dark:text-white leading-none mt-0.5"
  }, formatCountdown(pacingSearch.timeRemainingMs)), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-500 mt-1 block"
  }, "Target Time: ", new Date(limitSearch.nextResetTime).toLocaleDateString())))))), /*#__PURE__*/React.createElement("section", {
    className: "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl p-6 mb-8 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chart",
    className: "text-slate-400 w-6 h-6"
  }), "Historical Burn Rate Tracking"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 dark:text-slate-400 mt-0.5"
  }, "Checkpoints logged automatically by server background daemon (hourly)")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleAddManualCheckpoint,
    className: "px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors",
    title: "Force a backend update & checkpoint log"
  }, "Log Point"), history.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: exportHistoryToCSV,
    className: "px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
  }, "Export CSV"), /*#__PURE__*/React.createElement("button", {
    onClick: clearHistory,
    className: "px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
  }, "Clear")))), renderHistoryChart())) : /*#__PURE__*/React.createElement("section", {
    className: "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl p-10 shadow-sm text-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lightning",
    className: "w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4 animate-bounce"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-bold text-slate-800 dark:text-white"
  }, "Connecting to Z.ai API Service..."), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-400 mt-1 max-w-md mx-auto"
  }, "Loading your account's quota limits and rolling cycles.")), /*#__PURE__*/React.createElement("footer", {
    className: "mt-8 bg-slate-100 dark:bg-slate-950/30 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 text-sm text-slate-500 dark:text-slate-400"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-slate-800 dark:text-slate-300 mb-3 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    className: "w-5 h-5 text-brand-500"
  }), "About Z.ai GLM Coding Plan Quotas"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-700 dark:text-slate-300"
  }, "5-Hour Rolling Limit:"), " Unlike standard static daily reset times, the 5-hour quota uses a rolling session. Credits return to your pool exactly 5 hours after they were consumed."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-700 dark:text-slate-300"
  }, "Weekly Quota Cap:"), " Resets once per week strictly based on the 7-day cycle established when you started your subscription plan.")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-700 dark:text-slate-300"
  }, "Peak hour multiplier:"), " Be aware that during high-congestion periods (e.g. SGT 14:00 - 18:00 weekdays), usage costs might be subject to multipliers (e.g. 1.2x tokens), which will consume your credit quotas faster."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-700 dark:text-slate-300"
  }, "Pacing Recommendation:"), " This dashboard compares your consumed credit percentage to the elapsed timeframe. If your Used % outpaces Elapsed %, we suggest slowing down or taking a short break to let your rolling pool recharge.")))));
};

// Render React Root
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(/*#__PURE__*/React.createElement(App, null));
