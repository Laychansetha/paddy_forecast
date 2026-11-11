// IRCC Long-Term Forecast Dashboard Application Logic

let currentScenario = 'baseline';
let currentUnitCurrency = 'USD'; // 'USD' or 'KHR'

let charts = {};
let dashboardInitialized = false;

// SHA-256 Credential Hashes (username_lowercase:password)
const AUTH_HASHES = {
    phil: 'c7c8796d583dbba8e5ce2851c446f852e184353286730ce34c7e9a4878977ab5',
    admin: '9f3096a1a99c92cd1907e438da425a06a4d38cfdfc9ef3b676bde9809bd2b21c'
};

// Pure-JS SHA-256 (works identically across https://, localhost, and file://)
function sha256Hex(str) {
    const ascii = unescape(encodeURIComponent(str));
    const rightRotate = (value, amount) => (value >>> amount) | (value << (32 - amount));
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let result = '';
    const words = [];
    const asciiBitLength = ascii.length * 8;
    const hash = [];
    const k = [];
    let primeCounter = 0;

    const isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (let i = 0; i < 313; i += candidate) isComposite[i] = candidate;
            hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        }
    }

    let padded = ascii + '\x80';
    while ((padded.length % 64) - 56) padded += '\x00';
    for (let i = 0; i < padded.length; i++) {
        const j = padded.charCodeAt(i);
        if (j >> 8) return '';
        words[i >> 2] |= j << (((3 - i) % 4) * 8);
    }
    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength;

    for (let j = 0; j < words.length;) {
        const w = words.slice(j, (j += 16));
        const oldHash = hash.slice(0);
        for (let i = 0; i < 64; i++) {
            const w15 = w[i - 15], w2 = w[i - 2];
            const a = hash[0], e = hash[4];
            const temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
                + ((e & hash[5]) ^ ((~e) & hash[6]))
                + k[i]
                + (w[i] = (i < 16) ? w[i] : (
                    w[i - 16]
                    + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
                    + w[i - 7]
                    + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
                ) | 0);
            const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
                + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
            hash[7] = hash[6];
            hash[6] = hash[5];
            hash[5] = hash[4];
            hash[4] = (hash[3] + temp1) | 0;
            hash[3] = hash[2];
            hash[2] = hash[1];
            hash[1] = hash[0];
            hash[0] = (temp1 + temp2) | 0;
        }
        for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 3; j + 1; j--) {
            const b = (hash[i] >> (j * 8)) & 255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
}

function unlockDashboard() {
    const loginScreen = document.getElementById('loginScreen');
    const dashboardShell = document.getElementById('dashboardShell');
    if (loginScreen) loginScreen.classList.add('hidden');
    if (dashboardShell) dashboardShell.classList.remove('hidden');

    if (!dashboardInitialized) {
        initTabs();
        initControls();
        dashboardInitialized = true;
    }
    renderAll();
}

function initAuth() {
    const loginScreen = document.getElementById('loginScreen');
    const dashboardShell = document.getElementById('dashboardShell');
    if (!loginScreen || !dashboardShell) {
        initTabs();
        initControls();
        renderAll();
        return;
    }

    const savedUser = sessionStorage.getItem('ircc_auth_user');
    if (savedUser && AUTH_HASHES[savedUser]) {
        unlockDashboard();
    } else {
        const userInput = document.getElementById('loginUsername');
        if (userInput) userInput.focus();
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const rawUser = (document.getElementById('loginUsername')?.value || '').trim().toLowerCase();
            const rawPwd = document.getElementById('loginPassword')?.value || '';
            const errBox = document.getElementById('loginError');

            const expectedHash = AUTH_HASHES[rawUser];
            if (expectedHash && sha256Hex(`${rawUser}:${rawPwd}`) === expectedHash) {
                if (errBox) errBox.classList.add('hidden');
                sessionStorage.setItem('ircc_auth_user', rawUser);
                unlockDashboard();
            } else {
                if (errBox) errBox.classList.remove('hidden');
                const pwdInput = document.getElementById('loginPassword');
                if (pwdInput) { pwdInput.value = ''; pwdInput.focus(); }
            }
        });
    }

    const togglePwd = document.getElementById('togglePwdVisibility');
    if (togglePwd) {
        togglePwd.addEventListener('click', () => {
            const pwdInput = document.getElementById('loginPassword');
            if (pwdInput) pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
        });
    }

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            sessionStorage.removeItem('ircc_auth_user');
            if (dashboardShell) dashboardShell.classList.add('hidden');
            if (loginScreen) loginScreen.classList.remove('hidden');
            const loginFormEl = document.getElementById('loginForm');
            if (loginFormEl) loginFormEl.reset();
            const userInput = document.getElementById('loginUsername');
            if (userInput) userInput.focus();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initAuth();
});

// Tab navigation
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.add('hidden'));

            btn.classList.add('active');
            const targetEl = document.getElementById(target);
            if (targetEl) targetEl.classList.remove('hidden');

            Object.values(charts).forEach(chart => {
                if (chart) chart.resize();
            });
        });
    });
}

// Controls & Table Exports
function initControls() {
    const btnExportCSV = document.getElementById('btnExportCSV');
    if (btnExportCSV) {
        btnExportCSV.addEventListener('click', () => exportTableCSV('masterTableContainer', 'IRCC_Paddy_Purchase_Forecast_2026_2033.csv'));
    }

    const btnExportExcel = document.getElementById('btnExportExcel');
    if (btnExportExcel) {
        btnExportExcel.addEventListener('click', () => exportTableExcel('masterTableContainer', {
            filename: 'IRCC_Paddy_Purchase_Forecast_2026_2033.xls',
            sheetName: 'Paddy Forecast 2026-2033',
            sheetTitle: 'Ibis Rice Conservation Company (IRCC) — Paddy Purchase & Farmer Forecast (2026 - 2033)'
        }));
    }

    const btnExportBreakdownCSV = document.getElementById('btnExportBreakdownCSV');
    if (btnExportBreakdownCSV) {
        btnExportBreakdownCSV.addEventListener('click', () => exportTableCSV('transitionBreakdownTableContainer', 'IRCC_Transition_Breakdown_By_Variety_2026_2033.csv'));
    }

    const btnExportBreakdownExcel = document.getElementById('btnExportBreakdownExcel');
    if (btnExportBreakdownExcel) {
        btnExportBreakdownExcel.addEventListener('click', () => exportTableExcel('transitionBreakdownTableContainer', {
            filename: 'IRCC_Transition_Breakdown_By_Variety_2026_2033.xls',
            sheetName: 'Transition by Variety 2026-2033',
            sheetTitle: 'Ibis Rice Conservation Company (IRCC) — Transition Breakdown by Variety (Part 2 & Part 3, 2026 - 2033)'
        }));
    }
}

// Master Render Function
function renderAll() {
    const data = window.FORECAST_DATA;
    if (!data) {
        console.error('Forecast data not loaded!');
        return;
    }

    const scenarioData = data.scenarios[currentScenario];
    const historicalData = data.historical;

    renderKPICards(scenarioData, data.meta);
    renderCharts(scenarioData, historicalData, data.scenarios, data.meta);
    renderMasterTable(scenarioData, data.meta);
    renderTransitionBreakdownTable(scenarioData, historicalData, data.meta);
    renderHistoricalTables(historicalData, data.meta);
    renderTransitionTable(scenarioData);
}

// 1. KPI Scorecards
function renderKPICards(sc) {
    const lastIdx = sc.years.length - 1;
    const vol2033 = Math.round(sc.part1_organic_purchases_mt.total[lastIdx]);
    const vol2026 = Math.round(sc.part1_organic_purchases_mt.total[0]);
    const volGrowth = (((vol2033 - vol2026) / vol2026) * 100).toFixed(1);
    const signVol = Number(volGrowth) >= 0 ? '↑ +' : '↓ ';

    document.getElementById('kpiOrganicVol').textContent = `${vol2033.toLocaleString()} MT`;
    document.getElementById('kpiOrganicVolSub').textContent = `${signVol}${volGrowth}% vs 2026 (${vol2026.toLocaleString()} MT)`;

    const elig2033 = sc.farmers.certified_organic_eligible[lastIdx];
    const sell2033 = sc.farmers.selling_paddy[lastIdx];
    const exSell2033 = sc.farmers.existing_organic_selling[lastIdx];
    const grSell2033 = sc.farmers.graduated_organic_selling[lastIdx];

    document.getElementById('kpiSellingFarmers').textContent = `${elig2033.toLocaleString()} eligible`;
    document.getElementById('kpiSellingFarmersSub').textContent = `${sell2033.toLocaleString()} sellers (${exSell2033.toLocaleString()} Existing + ${grSell2033.toLocaleString()} Grads)`;

    const transVol2033 = Math.round(sc.part2_transition_volumes_mt.combined_volume[lastIdx]);
    const elig4Trans2033 = Math.round(sc.incentive_commitments.eligible4_base_volume_kg[lastIdx] / 1000);
    const transFarmers2033 = sc.farmers.total_transition[lastIdx];
    document.getElementById('kpiTransitionVol').textContent = `${transVol2033.toLocaleString()} MT / yr`;
    document.getElementById('kpiTransitionVolSub').textContent = `${elig4Trans2033.toLocaleString()} MT eligible • ${transFarmers2033.toLocaleString()} farmers`;

    const incUsd2033 = Math.round(sc.incentive_commitments.total_incentive_usd[lastIdx]);
    const incKhr2033 = sc.incentive_commitments.total_incentive_khr[lastIdx];
    document.getElementById('kpiIncentive').textContent = `$${incUsd2033.toLocaleString()}`;
    document.getElementById('kpiIncentiveSub').textContent = `≈ ${(incKhr2033 / 1000000).toFixed(1)} Million KHR (@ 4,100 KHR/$)`;
}

// 2. Charts Rendering
function renderCharts(sc, hist, allScenarios, meta) {
    const hYears = hist.years; // [2022..2026]
    const fYears = sc.years.slice(1); // [2027..2033]

    // Chart A1: Actuals (2022–2025) + Forecast Zone (2026–2033)
    const combinedYears = [...hYears.map(String), ...fYears.map(String)];
    const getHistVarMT = (vk) => hYears.map(y => hist.organic_sales[String(y)].actual_kg[vk] / 1000);
    const getProjVarMT = (vk) => sc.part1_organic_purchases_kg[vk].slice(1).map(v => v / 1000);

    const fullPR = [...getHistVarMT('phka_rumduol'), ...getProjVarMT('phka_rumduol')];
    const fullWR = [...getHistVarMT('white_rice'), ...getProjVarMT('white_rice')];
    const fullRJ = [...getHistVarMT('red_jasmine'), ...getProjVarMT('red_jasmine')];
    const fullSD = [...getHistVarMT('seed'), ...getProjVarMT('seed')];

    const forecastDividerPlugin = {
        id: 'forecastDivider',
        beforeDatasetsDraw(chart) {
            const { ctx, chartArea, scales } = chart;
            if (!chartArea || !scales.x) return;
            const splitX = (scales.x.getPixelForValue(3) + scales.x.getPixelForValue(4)) / 2;
            ctx.save();
            ctx.fillStyle = 'rgba(16, 185, 129, 0.045)';
            ctx.fillRect(splitX, chartArea.top, chartArea.right - splitX, chartArea.bottom - chartArea.top);
            ctx.strokeStyle = 'rgba(100, 116, 139, 0.45)';
            ctx.lineWidth = 1.25;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(splitX, chartArea.top);
            ctx.lineTo(splitX, chartArea.bottom);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.font = '700 10px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#475569';
            ctx.textAlign = 'right';
            ctx.fillText('Actuals (2022–2025)', splitX - 8, chartArea.top + 11);
            ctx.fillStyle = '#059669';
            ctx.textAlign = 'left';
            ctx.fillText('Forecast (2026–2033) →', splitX + 8, chartArea.top + 11);
            ctx.restore();
        },
        afterDatasetsDraw(chart) {
            const { ctx, scales } = chart;
            const topMeta = chart.getDatasetMeta(3);
            if (!topMeta || !topMeta.data || !scales.y) return;
            ctx.save();
            ctx.font = '700 9.5px Inter, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#1e293b';
            topMeta.data.forEach((bar, idx) => {
                let visTot = 0;
                chart.data.datasets.forEach((ds, dsIdx) => {
                    if (chart.isDatasetVisible(dsIdx)) visTot += (ds.data[idx] || 0);
                });
                const yTop = scales.y.getPixelForValue(visTot);
                ctx.fillText(Math.round(visTot).toLocaleString(), bar.x, yTop - 6);
            });
            ctx.restore();
        }
    };

    if (charts.trajectory) charts.trajectory.destroy();
    const ctxTraj = document.getElementById('chartTrajectory');
    if (ctxTraj) {
        charts.trajectory = new Chart(ctxTraj, {
            type: 'bar',
            data: {
                labels: combinedYears,
                datasets: [
                    { label: 'Phka Rumduol', data: fullPR, backgroundColor: '#059669', borderColor: '#ffffff', borderWidth: 1, borderRadius: 2, barPercentage: 0.68, categoryPercentage: 0.84 },
                    { label: 'White Rice', data: fullWR, backgroundColor: '#0ea5e9', borderColor: '#ffffff', borderWidth: 1, borderRadius: 2, barPercentage: 0.68, categoryPercentage: 0.84 },
                    { label: 'Red Jasmine', data: fullRJ, backgroundColor: '#e11d48', borderColor: '#ffffff', borderWidth: 1, borderRadius: 2, barPercentage: 0.68, categoryPercentage: 0.84 },
                    { label: 'Seed', data: fullSD, backgroundColor: '#f59e0b', borderColor: '#ffffff', borderWidth: 1, borderRadius: { topLeft: 5, topRight: 5 }, barPercentage: 0.68, categoryPercentage: 0.84 }
                ]
            },
            plugins: [forecastDividerPlugin],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: {
                    x: { stacked: true, grid: { display: false }, border: { display: false }, ticks: { font: { size: 10.5, weight: '600' }, color: '#475569' } },
                    y: {
                        stacked: true,
                        min: 0,
                        max: 5000,
                        border: { display: false },
                        grid: { color: 'rgba(148, 163, 184, 0.16)' },
                        title: { display: true, text: 'Volume (MT)', font: { size: 11, weight: '600' }, color: '#64748b' },
                        ticks: { stepSize: 1000, callback: v => v.toLocaleString(), font: { size: 11 }, color: '#64748b' }
                    }
                },
                plugins: {
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.94)',
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: {
                            label: (ctx) => ` ${ctx.dataset.label}: ${Math.round(ctx.parsed.y).toLocaleString()} MT`,
                            footer: (items) => {
                                const sum = items.reduce((acc, it) => acc + (it.parsed.y || 0), 0);
                                return `Total: ${Math.round(sum).toLocaleString()} MT`;
                            }
                        }
                    },
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, boxHeight: 8, padding: 14, font: { size: 11, weight: '500' }, color: '#334155' }
                    }
                }
            }
        });
    }

    // Chart A2: Farmer Supply Cohorts & Transition Pipeline (5 clean monotone smooth curves + breathing room)
    if (charts.farmerPipeline) charts.farmerPipeline.destroy();
    const ctxFarmers = document.getElementById('chartFarmerPipeline');
    if (ctxFarmers) {
        const ctx2d = ctxFarmers.getContext('2d');
        const totGrad = ctx2d.createLinearGradient(0, 0, 0, 300);
        totGrad.addColorStop(0, 'rgba(225, 29, 72, 0.09)');
        totGrad.addColorStop(1, 'rgba(225, 29, 72, 0.0)');

        const orgGrad = ctx2d.createLinearGradient(0, 0, 0, 300);
        orgGrad.addColorStop(0, 'rgba(5, 150, 105, 0.14)');
        orgGrad.addColorStop(1, 'rgba(5, 150, 105, 0.0)');

        charts.farmerPipeline = new Chart(ctxFarmers, {
            type: 'line',
            data: {
                labels: sc.years.map(String),
                datasets: [
                    {
                        label: 'Total Active',
                        data: sc.farmers.total_active,
                        borderColor: '#e11d48',
                        backgroundColor: totGrad,
                        borderWidth: 2.75,
                        fill: true,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4,
                        pointRadius: 3.5,
                        pointHoverRadius: 6.5,
                        pointHitRadius: 14,
                        pointBackgroundColor: '#e11d48',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 1.5
                    },
                    {
                        label: 'Organic (Eligible)',
                        data: sc.farmers.certified_organic_eligible,
                        borderColor: '#059669',
                        backgroundColor: orgGrad,
                        borderWidth: 2.75,
                        fill: true,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4,
                        pointRadius: 3.5,
                        pointHoverRadius: 6,
                        pointHitRadius: 12,
                        pointBackgroundColor: '#059669',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 1.5
                    },
                    {
                        label: 'WF',
                        data: sc.farmers.transition_yr0,
                        borderColor: '#7c3aed',
                        backgroundColor: '#7c3aed',
                        borderWidth: 2.2,
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4,
                        pointRadius: 3,
                        pointHoverRadius: 5.5,
                        pointHitRadius: 12,
                        pointBackgroundColor: '#7c3aed',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 1.5
                    },
                    {
                        label: 'Ibis I',
                        data: sc.farmers.transition_yr1,
                        borderColor: '#0284c7',
                        backgroundColor: '#0284c7',
                        borderWidth: 2.2,
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4,
                        pointRadius: 3,
                        pointHoverRadius: 5.5,
                        pointHitRadius: 12,
                        pointBackgroundColor: '#0284c7',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 1.5
                    },
                    {
                        label: 'Ibis II',
                        data: sc.farmers.transition_yr2,
                        borderColor: '#d97706',
                        backgroundColor: '#d97706',
                        borderWidth: 2.2,
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4,
                        pointRadius: 3,
                        pointHoverRadius: 5.5,
                        pointHitRadius: 12,
                        pointBackgroundColor: '#d97706',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 1.5
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 8, right: 10, bottom: 4, left: 2 } },
                interaction: { mode: 'nearest', intersect: true },
                scales: {
                    x: { grid: { display: false }, border: { display: false }, ticks: { padding: 8, font: { size: 11, weight: '600' }, color: '#475569' } },
                    y: {
                        min: 0,
                        max: sc.farmers.total_active[sc.farmers.total_active.length - 1] > 3500 ? undefined : 3500,
                        border: { display: false },
                        grid: { color: 'rgba(148, 163, 184, 0.16)' },
                        title: { display: true, text: 'Farmers', font: { size: 11, weight: '600' }, color: '#64748b' },
                        ticks: { stepSize: 500, padding: 8, callback: v => v.toLocaleString(), font: { size: 11 }, color: '#64748b' }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, boxHeight: 8, padding: 14, font: { size: 11, weight: '500' }, color: '#334155' }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.94)',
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: {
                            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`,
                            afterBody: (items) => {
                                if (!items.length || items[0].datasetIndex !== 0) return [];
                                const i = items[0].dataIndex;
                                const ex = sc.farmers.existing_organic_eligible[i];
                                const gr = sc.farmers.graduated_organic_eligible_pool[i];
                                const sell = sc.farmers.selling_paddy[i];
                                const wf = sc.farmers.transition_yr0[i];
                                const y1 = sc.farmers.transition_yr1[i];
                                const y2 = sc.farmers.transition_yr2[i];
                                return [
                                    `  • Certified Organic = ${ex.toLocaleString()} Existing + ${gr.toLocaleString()} Graduated Pool`,
                                    `  • Est. Sellers: ${sell.toLocaleString()} | WF: ${wf} | Ibis I: ${y1} | Ibis II: ${y2}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    }

    // Chart B1: Organic Realization Rate History (4 Eligible Varieties ONLY)
    if (charts.realization) charts.realization.destroy();
    const ctxReal = document.getElementById('chartRealization');
    if (ctxReal) {
        const realRates = hYears.map(y => Number(hist.organic_sales[String(y)].realization_eligible4_pct.toFixed(1)));
        const avgSimple = Number(meta.historical_summary.simple_5yr_realization_pct.toFixed(1));
        const actMT = hYears.map(y => Math.round(hist.organic_sales[String(y)].actual_kg.eligible4_total / 1000).toLocaleString());
        const estMT = hYears.map(y => Math.round(hist.organic_sales[String(y)].expected_kg.eligible4_total / 1000).toLocaleString());

        const r2d = ctxReal.getContext('2d');
        const gActual = r2d.createLinearGradient(0, 40, 0, 250);
        gActual.addColorStop(0, '#059669');
        gActual.addColorStop(1, '#34d399');

        const gNear = r2d.createLinearGradient(0, 40, 0, 250);
        gNear.addColorStop(0, '#0284c7');
        gNear.addColorStop(1, '#38bdf8');

        const gAvg = r2d.createLinearGradient(0, 40, 0, 250);
        gAvg.addColorStop(0, '#4f46e5');
        gAvg.addColorStop(1, '#818cf8');

        const realizationVisualPlugin = {
            id: 'realizationVisuals',
            beforeDatasetsDraw(chart) {
                const { ctx, chartArea, scales } = chart;
                if (!chartArea || !scales.y) return;
                const y80 = scales.y.getPixelForValue(80);
                ctx.save();
                ctx.fillStyle = 'rgba(239, 68, 68, 0.045)';
                ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, y80 - chartArea.top);
                ctx.restore();
            },
            afterDatasetsDraw(chart) {
                const { ctx, chartArea, scales } = chart;
                const metaSet = chart.getDatasetMeta(0);
                if (!metaSet || !metaSet.data) return;
                ctx.save();
                ctx.font = '700 11px Inter, system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#ffffff';
                metaSet.data.forEach((bar, idx) => {
                    const val = chart.data.datasets[0].data[idx];
                    ctx.fillText(`${val}%`, bar.x, bar.y + 18);
                });
                if (scales.y) {
                    const y80 = scales.y.getPixelForValue(80);
                    ctx.font = '600 10px Inter, system-ui, sans-serif';
                    ctx.textAlign = 'right';
                    ctx.fillStyle = '#dc2626';
                    ctx.fillText('Initial 80% Rule', chartArea.right - 6, y80 - 7);
                }
                ctx.restore();
            }
        };

        charts.realization = new Chart(ctxReal, {
            type: 'bar',
            data: {
                labels: [...hYears.map(String), '5-Yr Avg'],
                datasets: [
                    {
                        label: 'Actual % Delivered',
                        data: [...realRates, avgSimple],
                        backgroundColor: [gActual, gActual, gActual, gActual, gNear, gAvg],
                        borderRadius: { topLeft: 7, topRight: 7 },
                        barPercentage: 0.56,
                        categoryPercentage: 0.8
                    },
                    {
                        type: 'line',
                        label: 'Initial 80% Assumption',
                        data: [80, 80, 80, 80, 80, 80],
                        borderColor: '#ef4444',
                        backgroundColor: '#ef4444',
                        borderDash: [4, 4],
                        borderWidth: 1.25,
                        pointRadius: 0
                    }
                ]
            },
            plugins: [realizationVisualPlugin],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: {
                    x: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 11, weight: '600' }, color: '#475569' } },
                    y: {
                        min: 45,
                        max: 95,
                        border: { display: false },
                        grid: { color: 'rgba(148, 163, 184, 0.16)' },
                        title: { display: true, text: '% of Estimate Sold', font: { size: 11, weight: '600' }, color: '#64748b' },
                        ticks: { stepSize: 10, callback: v => v + '%', font: { size: 11 }, color: '#64748b' }
                    }
                },
                plugins: {
                    legend: { position: 'top', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, boxHeight: 8, padding: 16, font: { size: 11, weight: '500' }, color: '#334155' } },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.94)',
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: {
                            afterBody: (items) => {
                                const idx = items[0].dataIndex;
                                if (idx < 5) return [`  (${actMT[idx]} MT delivered vs. ${estMT[idx]} MT estimated)`];
                                return ['  (5-year average actual delivery rate)'];
                            }
                        }
                    }
                }
            }
        });
    }

    // Chart B2: Eligible Transition Incentive Commitments (Sticky Rice Excluded)
    if (charts.incentive) charts.incentive.destroy();
    const ctxInc = document.getElementById('chartIncentive');
    if (ctxInc) {
        const isUSD = currentUnitCurrency === 'USD';
        const dWF = isUSD ? sc.incentive_commitments.yr0_incentive_usd.map(v => Math.round(v)) : sc.incentive_commitments.yr0_incentive_khr.map(v => Math.round(v / 1000000));
        const dY1 = isUSD ? sc.incentive_commitments.yr1_incentive_usd.map(v => Math.round(v)) : sc.incentive_commitments.yr1_incentive_khr.map(v => Math.round(v / 1000000));
        const dY2 = isUSD ? sc.incentive_commitments.yr2_incentive_usd.map(v => Math.round(v)) : sc.incentive_commitments.yr2_incentive_khr.map(v => Math.round(v / 1000000));

        const incentiveLabelPlugin = {
            id: 'incentiveLabels',
            afterDatasetsDraw(chart) {
                const { ctx, scales } = chart;
                const firstMeta = chart.getDatasetMeta(0);
                if (!firstMeta || !firstMeta.data || !scales.y) return;
                ctx.save();
                ctx.font = '700 11px Inter, system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#0f172a';
                firstMeta.data.forEach((bar, idx) => {
                    let visTot = 0;
                    chart.data.datasets.forEach((ds, dsIdx) => {
                        if (chart.isDatasetVisible(dsIdx)) visTot += (ds.data[idx] || 0);
                    });
                    const yTop = scales.y.getPixelForValue(visTot);
                    const txt = isUSD ? `$${Math.round(visTot / 1000)}k` : `${visTot}M`;
                    ctx.fillText(txt, bar.x, yTop - 7);
                });
                ctx.restore();
            }
        };

        charts.incentive = new Chart(ctxInc, {
            type: 'bar',
            data: {
                labels: sc.years.map(String),
                datasets: [
                    { label: 'WF (200 KHR/kg)', data: dWF, backgroundColor: '#7c3aed', borderRadius: 2, barPercentage: 0.58, categoryPercentage: 0.82 },
                    { label: 'Ibis I (200 KHR/kg)', data: dY1, backgroundColor: '#0ea5e9', borderRadius: 2, barPercentage: 0.58, categoryPercentage: 0.82 },
                    { label: 'Ibis II (250 KHR/kg)', data: dY2, backgroundColor: '#f59e0b', borderRadius: { topLeft: 6, topRight: 6 }, barPercentage: 0.58, categoryPercentage: 0.82 }
                ]
            },
            plugins: [incentiveLabelPlugin],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: {
                    x: { stacked: true, grid: { display: false }, border: { display: false }, ticks: { font: { size: 11, weight: '600' }, color: '#475569' } },
                    y: {
                        stacked: true,
                        suggestedMax: isUSD ? 140000 : 560,
                        border: { display: false },
                        grid: { color: 'rgba(148, 163, 184, 0.16)' },
                        title: { display: true, text: isUSD ? 'Budget ($ USD)' : 'Budget (Million KHR)', font: { size: 11, weight: '600' }, color: '#64748b' },
                        ticks: { callback: v => isUSD ? `$${v.toLocaleString()}` : `${v.toLocaleString()}M`, font: { size: 11 }, color: '#64748b' }
                    }
                },
                plugins: {
                    legend: { position: 'top', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, boxHeight: 8, padding: 14, font: { size: 11, weight: '500' }, color: '#334155' } },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.94)',
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: {
                            label: (ctx) => isUSD ? ` ${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}` : ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}M KHR`,
                            footer: (items) => {
                                const tot = items.reduce((acc, it) => acc + (it.parsed.y || 0), 0);
                                return isUSD ? `Total (Sticky Rice Excluded): $${tot.toLocaleString()} USD` : `Total: ${tot.toLocaleString()} Million KHR`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Chart C1: Scenario Sensitivity Chart
    if (charts.scenarios) charts.scenarios.destroy();
    const ctxScen = document.getElementById('chartScenarios');
    if (ctxScen) {
        charts.scenarios = new Chart(ctxScen, {
            type: 'line',
            data: {
                labels: sc.years.map(String),
                datasets: [
                    { label: 'Best Case (650 new/yr, 9.0% NC)', data: allScenarios.optimistic.part1_organic_purchases_mt.total.map(v => Math.round(v)), borderColor: '#059669', backgroundColor: '#059669', borderWidth: 2.5, tension: 0.35, pointRadius: 3.5, pointHoverRadius: 6, pointBorderColor: '#fff', pointBorderWidth: 1.5 },
                    { label: 'Main Plan (500 new/yr, 11.59% NC)', data: allScenarios.baseline.part1_organic_purchases_mt.total.map(v => Math.round(v)), borderColor: '#0284c7', backgroundColor: '#0284c7', borderWidth: 3, tension: 0.35, pointRadius: 3.5, pointHoverRadius: 6, pointBorderColor: '#fff', pointBorderWidth: 1.5 },
                    { label: 'Risk Case (400 new/yr, 15.13% NC)', data: allScenarios.conservative.part1_organic_purchases_mt.total.map(v => Math.round(v)), borderColor: '#e11d48', backgroundColor: '#e11d48', borderWidth: 2.5, tension: 0.35, pointRadius: 3.5, pointHoverRadius: 6, pointBorderColor: '#fff', pointBorderWidth: 1.5 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: {
                    x: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 11 }, color: '#475569' } },
                    y: { border: { display: false }, grid: { color: 'rgba(148, 163, 184, 0.16)' }, title: { display: true, text: 'Organic Purchases (MT)', font: { size: 11, weight: '600' }, color: '#64748b' }, ticks: { callback: v => v.toLocaleString() + ' MT', font: { size: 11 }, color: '#64748b' } }
                },
                plugins: {
                    legend: { position: 'top', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, boxHeight: 8, padding: 14, font: { size: 11, weight: '500' }, color: '#334155' } },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.94)',
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: {
                            label: (ctx) => ` ${ctx.dataset.label}: ${Math.round(ctx.parsed.y).toLocaleString()} MT`
                        }
                    }
                }
            }
        });
    }
}

// Shared helpers for executive forecast tables (Master + Transition Variety Breakdown)
function escAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function allocateExactByWeights(totalInt, weightsPct) {
    const raw = weightsPct.map(w => totalInt * (w / 100));
    const floored = raw.map(v => Math.floor(v));
    let remainder = totalInt - floored.reduce((a, b) => a + b, 0);
    const order = raw
        .map((v, idx) => ({ idx, frac: v - floored[idx] }))
        .sort((a, b) => b.frac - a.frac);
    for (let i = 0; i < order.length && remainder > 0; i++) {
        floored[order[i].idx] += 1;
        remainder -= 1;
    }
    return floored;
}

function createForecastTableHelpers(years, titleLeft, opts = {}) {
    const compact = Boolean(opts.compact);
    const cellPad = compact ? 'px-3 py-1' : 'px-4 py-2.5';
    const secPad = compact ? 'px-4 py-1.5' : 'px-5 py-2.5';
    const lblPad = compact ? 'pl-8 pr-3 py-1 font-medium text-slate-700' : 'pl-9 pr-5 py-2.5 font-medium text-slate-700';
    const headPadLeft = compact ? 'px-4 py-2.5' : 'px-5 py-3.5';
    const headPadYr = compact ? 'px-3 py-2.5 text-[13.5px]' : 'px-4 py-3.5 text-[15px]';

    const formulaCell = (valStr, title, calc, roundFormula, whyText, extraClass = '') => `
        <td class="${cellPad} text-right tabular-nums cursor-help hover:bg-emerald-100/70 hover:text-emerald-950 transition-colors ${extraClass}"
            data-ftitle="${escAttr(title)}"
            data-fcalc="${escAttr(calc)}"
            data-fexcel="${escAttr(roundFormula)}"
            data-fwhy="${escAttr(whyText)}">${valStr}</td>`;

    const sectionRow = (label, pillColor, rowBg, textColor, borderCls) => `
        <tr class="${rowBg} ${borderCls}">
            <td colspan="${years.length + 1}" class="${secPad}">
                <div class="flex items-center gap-2 ${textColor} ${compact ? 'text-[11.5px]' : 'text-[12.5px]'} font-bold uppercase tracking-wider">
                    <span class="inline-block w-1.5 ${compact ? 'h-3.5' : 'h-4'} rounded-full ${pillColor} shrink-0"></span>
                    <span>${label}</span>
                </div>
            </td>
        </tr>`;

    const labelCell = (text, dotColor = null, rowBg = 'bg-white group-hover:bg-slate-50', extraCls = lblPad) => `
        <td class="sticky left-0 z-10 ${rowBg} ${extraCls} whitespace-nowrap border-r border-slate-200/70 transition-colors">
            <div class="flex items-center gap-2">
                ${dotColor ? `<span class="inline-block w-1.5 h-1.5 rounded-full shrink-0" style="background-color:${dotColor}"></span>` : ''}
                <span>${text}</span>
            </div>
        </td>`;

    const tableHead = `
        <thead class="bg-slate-100/95 text-slate-700 border-b-2 border-slate-200">
            <tr>
                <th class="sticky left-0 z-10 bg-slate-100 ${headPadLeft} text-xs font-bold uppercase tracking-wider text-slate-600 border-r border-slate-200/80 min-w-[240px]">${titleLeft}</th>
                ${years.map((y, idx) => `<th class="${headPadYr} text-right font-bold tracking-tight min-w-[72px] ${idx === 0 ? 'bg-sky-50/80 text-sky-950 border-r border-slate-200/80' : 'text-slate-800'}">${y}</th>`).join('')}
            </tr>
        </thead>`;

    return { formulaCell, sectionRow, labelCell, tableHead };
}

// 3. Master Forecast Table (Two-Component Supply + 2022–2026 Variety Mix)
function renderMasterTable(sc, meta) {
    const years = sc.years;
    const unit = 'MT';
    const ncPct = sc.parameters.nc_rate_pct.toFixed(2);
    const retPct = sc.parameters.retention_rate_pct.toFixed(2);
    const intake = sc.parameters.annual_new_intake;
    const shares5yr = meta.variety_shares_pct.part1_organic_2022_2026_eligible4;

    const fmtVol = (v) => Math.round(v).toLocaleString();
    const p1Kg = sc.part1_organic_purchases_kg;
    const p1Mt = sc.part1_organic_purchases_mt;
    const cmp = sc.part1_supply_components;
    const p2Mt = sc.part2_transition_volumes_mt;
    const f = sc.farmers;

    const { formulaCell, sectionRow, labelCell, tableHead } = createForecastTableHelpers(years, `Section / Metric (${sc.label})`);

    const buildVarietyCells = (label, key) => {
        const arr = p1Mt[key];
        const sharePct = shares5yr[key].toFixed(2);
        return arr.map((v, idx) => {
            const yr = years[idx];
            if (idx === 0) {
                return formulaCell(
                    fmtVol(v),
                    `Part 1 • ${label} • 2026 (Actual)`,
                    `2026 Audited Actual: ${p1Kg[key][0].toLocaleString()} kg (${Math.round(v).toLocaleString()} MT)`,
                    `= 2026 Audited Actual [${label}]`,
                    `Why: Audited 2026 actual sales (Sticky Rice completely excluded).`,
                    'bg-slate-50/70 border-r border-slate-200/80 font-medium text-slate-800'
                );
            }
            const totMT = fmtVol(p1Mt.total[idx]);
            return formulaCell(
                fmtVol(v),
                `Part 1 • ${label} • ${yr} (Projected)`,
                `${totMT} MT × ${sharePct}% (2022–2026 share) = ${fmtVol(v)} MT`,
                `=ROUND( (Comp A + Comp B) × ${sharePct}%, 0 )`,
                `Why: Distributes combined Existing + Newly Certified supply using the 2022–2026 4-variety baseline (${sharePct}%; Sticky Rice excluded).`,
                'text-slate-700'
            );
        }).join('');
    };

    const buildPart2Cells = (label, stageShort, key, fKey) => {
        const arr = p2Mt[key];
        return arr.map((v, idx) => {
            const yr = years[idx];
            const cnt = f[fKey][idx];
            if (idx === 0) {
                return formulaCell(
                    fmtVol(v),
                    `${label} • 2026 (Allocated Actual)`,
                    `2,614.4 MT × (${cnt} / 757 farmers) = ${fmtVol(v)} MT`,
                    `=ROUND( 2026 Col J × (${cnt} ÷ 757), 0 )`,
                    `Why: Tracks all 5 varieties produced (incl. Sticky Rice) for harvest analysis; Sticky Rice is excluded before calculating incentives.`,
                    'bg-slate-50/70 border-r border-slate-200/80 font-medium text-slate-800'
                );
            }
            const calc = `${cnt.toLocaleString()} ${stageShort} × 4,420 kg ÷ 1,000 = ${fmtVol(v)} MT`;
            return formulaCell(
                fmtVol(v),
                `${label} • ${yr} (Projected)`,
                calc,
                `=ROUND( Farmers[${stageShort}] × 4,420 kg ÷ 1,000, 0 )`,
                `Why: Total crop produced across all 5 varieties (incl. Sticky Rice); incentives pay 40% on the 4 eligible varieties only.`,
                'text-slate-700'
            );
        }).join('');
    };

    let html = `
        <table class="w-full text-[13.5px] text-left border-collapse">
            ${tableHead}
            <tbody class="divide-y divide-slate-100 font-sans">
                <!-- Part 1: 4 Eligible Varieties -->
                ${sectionRow(`Part 1: Organic Paddy Procurement (${unit})`, 'bg-emerald-500', 'bg-emerald-50/45', 'text-emerald-950', 'border-y border-emerald-200/70')}
                <tr class="group hover:bg-slate-50/90 transition-colors">${labelCell(`Phka Rumduol (${shares5yr.phka_rumduol.toFixed(1)}% base)`, '#059669')}${buildVarietyCells('Phka Rumduol', 'phka_rumduol')}</tr>
                <tr class="group hover:bg-slate-50/90 transition-colors">${labelCell(`White Rice (${shares5yr.white_rice.toFixed(1)}% base)`, '#0284c7')}${buildVarietyCells('White Rice', 'white_rice')}</tr>
                <tr class="group hover:bg-slate-50/90 transition-colors">${labelCell(`Red Jasmine (${shares5yr.red_jasmine.toFixed(1)}% base)`, '#e11d48')}${buildVarietyCells('Red Jasmine', 'red_jasmine')}</tr>
                <tr class="group hover:bg-slate-50/90 transition-colors">${labelCell(`Seed (${shares5yr.seed.toFixed(1)}% base)`, '#d97706')}${buildVarietyCells('Seed', 'seed')}</tr>
                <tr class="group bg-emerald-50/85 hover:bg-emerald-100/50 font-bold text-emerald-950 border-y border-emerald-200 transition-colors">
                    ${labelCell('Total Organic Volume', null, 'bg-emerald-50 group-hover:bg-emerald-100/80', 'px-5 py-3 font-bold text-emerald-950')}
                    ${p1Mt.total.map((v, idx) => {
                        const calc = idx === 0
                            ? `2026 Audited Actual = ${fmtVol(v)} MT`
                            : `${fmtVol(cmp.existing_volume_mt[idx])} (Exist) + ${fmtVol(cmp.graduated_volume_mt[idx])} (Grad) = ${fmtVol(v)} MT`;
                        return formulaCell(
                            fmtVol(v),
                            `Total Eligible Organic • ${years[idx]}`,
                            calc,
                            `=ROUND( Comp A + Comp B, 0 )`,
                            idx === 0
                                ? 'Why: Audited 2026 actual organic purchases (Sticky Rice excluded).'
                                : 'Why: Combines damped growth from existing farmers + newly certified conversion graduates (Sticky Rice excluded).',
                            idx === 0 ? 'py-3 bg-emerald-100/70 border-r border-emerald-200/80 font-bold' : 'py-3 font-bold'
                        );
                    }).join('')}
                </tr>

                <!-- Part 2 -->
                ${sectionRow(`Part 2: Conversion &amp; Transition Harvest (${unit})`, 'bg-sky-500', 'bg-sky-50/45', 'text-sky-950', 'border-y border-sky-200/70')}
                <tr class="group hover:bg-slate-50/90 transition-colors">${labelCell('Part 2.1 - Year 0 (WF) Total', '#7c3aed')}${buildPart2Cells('Part 2.1 - WF', 'WF', 'yr0_wf_volume', 'transition_yr0')}</tr>
                <tr class="group hover:bg-slate-50/90 transition-colors">${labelCell('Part 2.2 - Year 1 (Ibis I) Total', '#0284c7')}${buildPart2Cells('Part 2.2 - Ibis I', 'Ibis I', 'yr1_volume', 'transition_yr1')}</tr>
                <tr class="group hover:bg-slate-50/90 transition-colors">${labelCell('Part 2.3 - Year 2 (Ibis II) Total', '#d97706')}${buildPart2Cells('Part 2.3 - Ibis II', 'Ibis II', 'yr2_volume', 'transition_yr2')}</tr>
                <tr class="group bg-sky-50/85 hover:bg-sky-100/50 font-bold text-sky-950 border-y border-sky-200 transition-colors">
                    ${labelCell('Combined Transition Production', null, 'bg-sky-50 group-hover:bg-sky-100/80', 'px-5 py-3 font-bold text-sky-950')}
                    ${p2Mt.combined_volume.map((v, idx) => {
                        const calc = `${fmtVol(p2Mt.yr0_wf_volume[idx])} + ${fmtVol(p2Mt.yr1_volume[idx])} + ${fmtVol(p2Mt.yr2_volume[idx])} = ${fmtVol(v)} MT`;
                        return formulaCell(
                            fmtVol(v),
                            `Combined Transition • ${years[idx]}`,
                            calc,
                            `=ROUND( WF + Ibis I + Ibis II, 0 )`,
                            'Why: Total harvest across all 5 varieties (see Conversion & Incentives tab for Sticky Rice deduction in incentive budgets).',
                            idx === 0 ? 'py-3 bg-sky-100/70 border-r border-sky-200/80 font-bold' : 'py-3 font-bold'
                        );
                    }).join('')}
                </tr>

                <!-- Part 3 -->
                ${sectionRow('Part 3: Farmers', 'bg-amber-500', 'bg-amber-50/45', 'text-amber-950', 'border-y border-amber-200/70')}
                <tr class="group hover:bg-slate-50/90 transition-colors">
                    ${labelCell('Transition Year 0 (WF)', '#7c3aed')}
                    ${f.transition_yr0.map((v, idx) => formulaCell(v.toLocaleString(), `WF • ${years[idx]}`, idx === 0 ? '2026 Active WF = 332' : `${intake} × ${retPct}% = ${v}`, idx === 0 ? '= 2026 AFL WF' : `=ROUND( Intake × (1 - ${ncPct}% NC), 0 )`, 'Why: Active WF cohort after annual audit NC.', idx === 0 ? 'bg-slate-50/70 border-r border-slate-200/80 font-medium text-slate-800' : 'text-slate-700')).join('')}
                </tr>
                <tr class="group hover:bg-slate-50/90 transition-colors">
                    ${labelCell('Transition Year 1 (Ibis I)', '#0284c7')}
                    ${f.transition_yr1.map((v, idx) => formulaCell(v.toLocaleString(), `Ibis I • ${years[idx]}`, idx === 0 ? '2026 Active Ibis I = 12' : `${f.transition_yr0[idx - 1]} WF × ${retPct}% = ${v}`, idx === 0 ? '= 2026 AFL Ibis I' : `=ROUND( Prev WF × (1 - ${ncPct}% NC), 0 )`, 'Why: Cycle 2 cohort advancing from WF.', idx === 0 ? 'bg-slate-50/70 border-r border-slate-200/80 font-medium text-slate-800' : 'text-slate-700')).join('')}
                </tr>
                <tr class="group hover:bg-slate-50/90 transition-colors">
                    ${labelCell('Transition Year 2 (Ibis II)', '#d97706')}
                    ${f.transition_yr2.map((v, idx) => formulaCell(v.toLocaleString(), `Ibis II • ${years[idx]}`, idx === 0 ? '2026 Active Ibis II = 413' : `${f.transition_yr1[idx - 1]} Ibis I × ${retPct}% = ${v}`, idx === 0 ? '= 2026 AFL Ibis II' : `=ROUND( Prev Ibis I × (1 - ${ncPct}% NC), 0 )`, 'Why: Cycle 3 cohort advancing to Organic next year.', idx === 0 ? 'bg-slate-50/70 border-r border-slate-200/80 font-medium text-slate-800' : 'text-slate-700')).join('')}
                </tr>
                <tr class="group bg-amber-50/80 hover:bg-amber-100/50 font-bold text-amber-950 border-y border-amber-200 transition-colors">
                    ${labelCell('Total Active Compliant Farmers', null, 'bg-amber-50 group-hover:bg-amber-100/80', 'px-5 py-3 font-bold text-amber-950')}
                    ${f.total_active.map((v, idx) => formulaCell(v.toLocaleString(), `Total Active • ${years[idx]}`, `${f.certified_organic_eligible[idx].toLocaleString()} + ${f.transition_yr0[idx]} + ${f.transition_yr1[idx]} + ${f.transition_yr2[idx]} = ${v.toLocaleString()}`, '= Org + WF + Ibis I + Ibis II', 'Why: Total unique compliant farmers across all stages.', idx === 0 ? 'py-3 bg-amber-100/70 border-r border-amber-200/80 font-bold' : 'py-3 font-bold')).join('')}
                </tr>
                <tr class="group bg-rose-50/55 hover:bg-rose-100/40 text-rose-800 transition-colors">
                    ${labelCell('Non-Compliance (NC) Farmers / Projected Exits', '#e11d48', 'bg-rose-50 group-hover:bg-rose-100/60', 'pl-9 pr-5 py-2.5 font-medium text-rose-800')}
                    ${f.projected_nc_exits.map((v, idx) => formulaCell(v.toLocaleString(), `NC Exits • ${years[idx]}`, idx === 0 ? '2026 Audited NC = 336 (11.59%)' : `Annual ~${ncPct}% exits = ${v.toLocaleString()}`, idx === 0 ? '= general_data [2026 NC]' : `= (Prev Active + ${intake}) - Active`, 'Why: Annual non-compliance attrition.', idx === 0 ? 'bg-rose-100/55 border-r border-rose-200/70 font-medium' : 'font-medium')).join('')}
                </tr>
            </tbody>
        </table>
    `;

    const el = document.getElementById('masterTableContainer');
    if (el) {
        el.innerHTML = html;
        attachFormulaTooltips(el);
    }
}

// 3B. Transition Breakdown by Variety — Part 2 (Harvest MT) & Part 3 (Farmers)
function renderTransitionBreakdownTable(sc, hist, meta) {
    const years = sc.years;
    const stageShares = meta.variety_shares_pct.part2_stage_shares_by_year;
    const sh5 = meta.variety_shares_pct.part2_transition_2022_2026_all5;
    const sh26 = hist.transition_production['2026'].expected_shares_pct;
    const p2Mt = sc.part2_transition_volumes_mt;
    const f = sc.farmers;
    const fmtVol = (v) => Math.round(v).toLocaleString();

    const { formulaCell, sectionRow, labelCell, tableHead } = createForecastTableHelpers(years, `Section / Variety (${sc.label})`, { compact: true });

    const varieties = [
        { key: 'phka_rumduol', label: 'Phka Rumduol', dot: '#059669' },
        { key: 'white_rice', label: 'White Rice', dot: '#0284c7' },
        { key: 'red_jasmine', label: 'Red Jasmine', dot: '#e11d48' },
        { key: 'sticky_rice', label: 'Sticky Rice', dot: '#7c3aed' },
        { key: 'seed', label: 'Seed', dot: '#d97706' }
    ];

    const weightsForYear = (stageKey, idx) => {
        const sched = stageShares && stageShares[stageKey];
        const src = sched ? sched[idx] : (idx === 0 ? sh26 : sh5);
        return varieties.map(v => src[v.key]);
    };

    const buildAllocatedRows = (partTag, stageName, stageKey, totalsArr, unitLabel) => {
        const totalInts = totalsArr.map(v => Math.round(v));
        const matrix = years.map((_, idx) => allocateExactByWeights(totalInts[idx], weightsForYear(stageKey, idx)));
        const sched = stageShares && stageShares[stageKey];

        const headerTotalRow = `
            <tr class="group bg-slate-100/70 hover:bg-slate-100 font-semibold text-slate-900 border-t border-slate-200 transition-colors">
                ${labelCell(stageName, null, 'bg-slate-100/90 group-hover:bg-slate-100', 'px-4 py-1.5 font-semibold text-slate-800')}
                ${totalInts.map((tot, yIdx) => {
                    const sumStr = matrix[yIdx].map(n => n.toLocaleString()).join(' + ');
                    return formulaCell(
                        tot.toLocaleString(),
                        `${stageName} Total • ${years[yIdx]}`,
                        `${sumStr} = ${tot.toLocaleString()} ${unitLabel}`,
                        `=SUM( ${stageName} [All 5 Varieties] )`,
                        '',
                        yIdx === 0 ? 'py-1.5 bg-sky-50/75 border-r border-slate-200/80 font-bold' : 'py-1.5 font-bold'
                    );
                }).join('')}
            </tr>`;

        const varRows = varieties.map((vr, vIdx) => {
            let tag = '';
            if (vr.key === 'sticky_rice') tag = '3.35% fixed';
            else if (vr.key === 'seed') tag = '0.03% fixed';
            else if (sched) tag = `${sched[1][vr.key].toFixed(1)}%→${sched[sched.length - 1][vr.key].toFixed(1)}%`;
            else tag = `${sh5[vr.key].toFixed(1)}%`;

            const cells = years.map((yr, yIdx) => {
                const val = matrix[yIdx][vIdx];
                const src = sched ? sched[yIdx] : (yIdx === 0 ? sh26 : sh5);
                const pctUsed = src[vr.key].toFixed(2);
                const stageTotStr = totalInts[yIdx].toLocaleString();
                const basis = yIdx === 0 ? '2026 actual mix' : `${yr} mix`;
                return formulaCell(
                    val.toLocaleString(),
                    `${partTag} • ${vr.label} • ${yr}`,
                    `${stageTotStr} ${unitLabel} × ${pctUsed}% (${basis}) = ${val.toLocaleString()} ${unitLabel}`,
                    `=ROUND( ${stageName} × ${pctUsed}%, 0 )`,
                    '',
                    yIdx === 0 ? 'bg-slate-50/60 border-r border-slate-200/80 text-slate-700' : 'text-slate-600'
                );
            }).join('');
            return `<tr class="group hover:bg-slate-50/90 transition-colors">${labelCell(`${vr.label} (${tag})`, vr.dot, 'bg-white group-hover:bg-slate-50', 'pl-8 pr-3 py-1 text-slate-600')}${cells}</tr>`;
        }).join('');

        return headerTotalRow + varRows;
    };

    const html = `
        <table class="w-full text-[12.5px] text-left border-collapse">
            ${tableHead}
            <tbody class="divide-y divide-slate-100 font-sans">
                <!-- Part 2 separated by variety for each transition -->
                ${sectionRow('Part 2: Conversion &amp; Transition Harvest by Variety (MT)', 'bg-sky-500', 'bg-sky-50/45', 'text-sky-950', 'border-y border-sky-200/70')}
                ${buildAllocatedRows('Part 2.1 WF', 'Part 2.1 - Year 0 (WF)', 'wf', p2Mt.yr0_wf_volume, 'MT')}
                ${buildAllocatedRows('Part 2.2 Ibis I', 'Part 2.2 - Year 1 (Ibis I)', 'ibis_i', p2Mt.yr1_volume, 'MT')}
                ${buildAllocatedRows('Part 2.3 Ibis II', 'Part 2.3 - Year 2 (Ibis II)', 'ibis_ii', p2Mt.yr2_volume, 'MT')}
                <tr class="group bg-sky-50/85 hover:bg-sky-100/50 font-bold text-sky-950 border-y border-sky-200 transition-colors">
                    ${labelCell('Combined Transition Production', null, 'bg-sky-50 group-hover:bg-sky-100/80', 'px-4 py-1.5 font-bold text-sky-950')}
                    ${p2Mt.combined_volume.map((v, idx) => {
                        const calc = `${fmtVol(p2Mt.yr0_wf_volume[idx])} + ${fmtVol(p2Mt.yr1_volume[idx])} + ${fmtVol(p2Mt.yr2_volume[idx])} = ${fmtVol(v)} MT`;
                        return formulaCell(
                            fmtVol(v),
                            `Combined Transition • ${years[idx]}`,
                            calc,
                            `=ROUND( WF + Ibis I + Ibis II, 0 )`,
                            '',
                            idx === 0 ? 'py-1.5 bg-sky-100/70 border-r border-sky-200/80 font-bold' : 'py-1.5 font-bold'
                        );
                    }).join('')}
                </tr>

                <!-- Part 3: Farmers (transition counts only) -->
                ${sectionRow('Part 3: Farmers', 'bg-amber-500', 'bg-amber-50/45', 'text-amber-950', 'border-y border-amber-200/70')}
                <tr class="group hover:bg-slate-50/90 transition-colors">
                    ${labelCell('Transition Year 0 (WF)', '#7c3aed', 'bg-white group-hover:bg-slate-50', 'pl-6 pr-3 py-1.5 font-medium text-slate-700')}
                    ${f.transition_yr0.map((v, idx) => formulaCell(
                        v.toLocaleString(),
                        `WF • ${years[idx]}`,
                        idx === 0 ? '2026 Active WF = 332' : `${sc.parameters.annual_new_intake} × ${sc.parameters.retention_rate_pct.toFixed(2)}% = ${v}`,
                        idx === 0 ? '= 2026 AFL WF' : `=ROUND( Intake × (1 - ${sc.parameters.nc_rate_pct.toFixed(2)}% NC), 0 )`,
                        '',
                        idx === 0 ? 'py-1.5 bg-slate-50/60 border-r border-slate-200/80 font-medium text-slate-800' : 'py-1.5 text-slate-700'
                    )).join('')}
                </tr>
                <tr class="group hover:bg-slate-50/90 transition-colors">
                    ${labelCell('Transition Year 1 (Ibis I)', '#0284c7', 'bg-white group-hover:bg-slate-50', 'pl-6 pr-3 py-1.5 font-medium text-slate-700')}
                    ${f.transition_yr1.map((v, idx) => formulaCell(
                        v.toLocaleString(),
                        `Ibis I • ${years[idx]}`,
                        idx === 0 ? '2026 Active Ibis I = 12' : `${f.transition_yr0[idx - 1]} WF × ${sc.parameters.retention_rate_pct.toFixed(2)}% = ${v}`,
                        idx === 0 ? '= 2026 AFL Ibis I' : `=ROUND( Prev WF × (1 - ${sc.parameters.nc_rate_pct.toFixed(2)}% NC), 0 )`,
                        '',
                        idx === 0 ? 'py-1.5 bg-slate-50/60 border-r border-slate-200/80 font-medium text-slate-800' : 'py-1.5 text-slate-700'
                    )).join('')}
                </tr>
                <tr class="group hover:bg-slate-50/90 transition-colors">
                    ${labelCell('Transition Year 2 (Ibis II)', '#d97706', 'bg-white group-hover:bg-slate-50', 'pl-6 pr-3 py-1.5 font-medium text-slate-700')}
                    ${f.transition_yr2.map((v, idx) => formulaCell(
                        v.toLocaleString(),
                        `Ibis II • ${years[idx]}`,
                        idx === 0 ? '2026 Active Ibis II = 413' : `${f.transition_yr1[idx - 1]} Ibis I × ${sc.parameters.retention_rate_pct.toFixed(2)}% = ${v}`,
                        idx === 0 ? '= 2026 AFL Ibis II' : `=ROUND( Prev Ibis I × (1 - ${sc.parameters.nc_rate_pct.toFixed(2)}% NC), 0 )`,
                        '',
                        idx === 0 ? 'py-1.5 bg-slate-50/60 border-r border-slate-200/80 font-medium text-slate-800' : 'py-1.5 text-slate-700'
                    )).join('')}
                </tr>
                <tr class="group bg-amber-50/80 hover:bg-amber-100/50 font-bold text-amber-950 border-y border-amber-200 transition-colors">
                    ${labelCell('Total Transition Farmers', null, 'bg-amber-50 group-hover:bg-amber-100/80', 'px-4 py-1.5 font-bold text-amber-950')}
                    ${f.total_transition.map((v, idx) => formulaCell(
                        v.toLocaleString(),
                        `Total Transition Farmers • ${years[idx]}`,
                        `${f.transition_yr0[idx]} + ${f.transition_yr1[idx]} + ${f.transition_yr2[idx]} = ${v.toLocaleString()} farmers`,
                        `=SUM( WF + Ibis I + Ibis II )`,
                        '',
                        idx === 0 ? 'py-1.5 bg-amber-100/70 border-r border-amber-200/80 font-bold' : 'py-1.5 font-bold'
                    )).join('')}
                </tr>
                <tr class="group bg-emerald-50/75 hover:bg-emerald-100/45 font-bold text-emerald-950 border-b border-emerald-200 transition-colors">
                    ${labelCell('Total Active Compliant Farmers', null, 'bg-emerald-50 group-hover:bg-emerald-100/70', 'px-4 py-1.5 font-bold text-emerald-950')}
                    ${f.total_active.map((v, idx) => formulaCell(
                        v.toLocaleString(),
                        `Total Active Compliant • ${years[idx]}`,
                        `${f.certified_organic_eligible[idx].toLocaleString()} Org + ${f.total_transition[idx].toLocaleString()} Trans = ${v.toLocaleString()}`,
                        `= Cert. Organic + Total Transition`,
                        '',
                        idx === 0 ? 'py-1.5 bg-emerald-100/70 border-r border-emerald-200/80 font-bold' : 'py-1.5 font-bold'
                    )).join('')}
                </tr>
                <tr class="group bg-rose-50/55 hover:bg-rose-100/40 text-rose-800 transition-colors">
                    ${labelCell('Non-Compliance (NC) Farmers / Projected Exits', '#e11d48', 'bg-rose-50 group-hover:bg-rose-100/60', 'pl-6 pr-3 py-1.5 font-medium text-rose-800')}
                    ${f.projected_nc_exits.map((v, idx) => formulaCell(
                        v.toLocaleString(),
                        `NC Exits • ${years[idx]}`,
                        idx === 0 ? '2026 Audited NC = 336 (11.59%)' : `Annual ~${sc.parameters.nc_rate_pct.toFixed(2)}% exits = ${v.toLocaleString()}`,
                        idx === 0 ? '= general_data [2026 NC]' : `= (Prev Active + ${sc.parameters.annual_new_intake}) - Active`,
                        '',
                        idx === 0 ? 'py-1.5 bg-rose-100/55 border-r border-rose-200/70 font-medium' : 'py-1.5 font-medium'
                    )).join('')}
                </tr>
            </tbody>
        </table>
    `;

    const el = document.getElementById('transitionBreakdownTableContainer');
    if (el) {
        el.innerHTML = html;
        attachFormulaTooltips(el);
    }
}

function attachFormulaTooltips(container) {
    let tip = document.getElementById('cellFormulaTooltip');
    if (!tip) {
        tip = document.createElement('div');
        tip.id = 'cellFormulaTooltip';
        tip.className = 'fixed z-50 pointer-events-none hidden bg-slate-900/95 text-white text-xs rounded-xl shadow-2xl border border-slate-700/90 px-4 py-2.5 w-max max-w-[92vw] leading-snug';
        document.body.appendChild(tip);
    }

    const cells = container.querySelectorAll('td[data-ftitle]');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            tip.innerHTML = `
                <div class="font-bold text-emerald-400 mb-1.5 whitespace-nowrap">${cell.getAttribute('data-ftitle')}</div>
                <div class="font-mono text-[11px] text-amber-300 bg-slate-800/90 px-2.5 py-1 rounded border border-slate-700 mb-1.5 whitespace-nowrap">${cell.getAttribute('data-fexcel')}</div>
                <div class="text-slate-100 whitespace-nowrap">${cell.getAttribute('data-fcalc')}</div>
            `;
            tip.classList.remove('hidden');

            const rect = cell.getBoundingClientRect();
            const tipRect = tip.getBoundingClientRect();
            let top = rect.top - tipRect.height - 8;
            if (top < 8) top = rect.bottom + 8;
            let left = rect.left + rect.width / 2 - tipRect.width / 2;
            left = Math.max(8, Math.min(window.innerWidth - tipRect.width - 8, left));
            tip.style.top = `${top}px`;
            tip.style.left = `${left}px`;
        });
        cell.addEventListener('mouseleave', () => tip.classList.add('hidden'));
    });
}

// 4. Render AFL and Paddy Purchase Table (2022–2026)
function renderHistoricalTables(hist, meta) {
    const years = hist.years;
    const sum = (arr) => arr.reduce((a, b) => a + b, 0);

    const expF = years.map(y => hist.organic_sales[String(y)].exp_farmers);
    const actF = years.map(y => hist.organic_sales[String(y)].act_farmers);
    const sellRates = years.map(y => hist.organic_sales[String(y)].selling_rate_pct);
    const exp4 = years.map(y => hist.organic_sales[String(y)].expected_kg.eligible4_total);
    const act4 = years.map(y => hist.organic_sales[String(y)].actual_kg.eligible4_total);
    const ncArr = years.map(y => hist.compliance[String(y)].nc_farmers);

    const avgExpF = Math.round(sum(expF) / years.length);
    const avgActF = Math.round(sum(actF) / years.length);
    const avgSellRate = (sum(sellRates) / years.length).toFixed(1);
    const avgEstMT = Math.round(sum(exp4) / years.length / 1000);
    const avgActMT = Math.round(sum(act4) / years.length / 1000);
    const avgRealRate = meta.historical_summary.simple_5yr_realization_pct.toFixed(1);
    const avgNC = Math.round(sum(ncArr) / years.length);

    let html = `
        <table class="w-full text-[13.5px] text-left border-collapse">
            <thead class="bg-slate-100/95 text-slate-700 text-xs uppercase font-bold tracking-wider border-b-2 border-slate-200">
                <tr>
                    <th class="px-5 py-3.5">Harvest Year</th>
                    <th class="px-4 py-3.5 text-right">Registered Organic</th>
                    <th class="px-4 py-3.5 text-right">Selling Farmers</th>
                    <th class="px-4 py-3.5 text-right">Selling Rate</th>
                    <th class="px-4 py-3.5 text-right">Est. Volume (MT)</th>
                    <th class="px-4 py-3.5 text-right">Act. Purchased (MT)</th>
                    <th class="px-4 py-3.5 text-right">Realization Rate</th>
                    <th class="px-5 py-3.5 text-right">NC Farmers</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-sans tabular-nums">
                ${years.map(y => {
                    const o = hist.organic_sales[String(y)];
                    const c = hist.compliance[String(y)];
                    return `
                        <tr class="hover:bg-slate-50/90 transition-colors">
                            <td class="px-5 py-3 font-bold text-slate-800">${y}</td>
                            <td class="px-4 py-3 text-right text-slate-700">${o.exp_farmers.toLocaleString()}</td>
                            <td class="px-4 py-3 text-right text-slate-700">${o.act_farmers.toLocaleString()}</td>
                            <td class="px-4 py-3 text-right text-emerald-700 font-semibold">${o.selling_rate_pct.toFixed(1)}%</td>
                            <td class="px-4 py-3 text-right text-slate-700">${Math.round(o.expected_kg.eligible4_total / 1000).toLocaleString()} MT</td>
                            <td class="px-4 py-3 text-right font-bold text-slate-900">${Math.round(o.actual_kg.eligible4_total / 1000).toLocaleString()} MT</td>
                            <td class="px-4 py-3 text-right font-bold ${o.realization_eligible4_pct < 70 ? 'text-amber-700' : 'text-emerald-700'}">${o.realization_eligible4_pct.toFixed(1)}%</td>
                            <td class="px-5 py-3 text-right text-rose-600 font-medium">${c.nc_farmers.toLocaleString()}</td>
                        </tr>`;
                }).join('')}
                <tr class="bg-slate-100/80 font-bold border-t-2 border-slate-300 text-slate-900">
                    <td class="px-5 py-3">5-Year Average</td>
                    <td class="px-4 py-3 text-right">${avgExpF.toLocaleString()}</td>
                    <td class="px-4 py-3 text-right">${avgActF.toLocaleString()}</td>
                    <td class="px-4 py-3 text-right text-emerald-800">${avgSellRate}%</td>
                    <td class="px-4 py-3 text-right">${avgEstMT.toLocaleString()} MT</td>
                    <td class="px-4 py-3 text-right">${avgActMT.toLocaleString()} MT</td>
                    <td class="px-4 py-3 text-right text-emerald-800">${avgRealRate}%</td>
                    <td class="px-5 py-3 text-right text-rose-700">${avgNC.toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
    `;

    const el = document.getElementById('historicalTableContainer');
    if (el) el.innerHTML = html;
}

function renderTableRow(label, values, decimals = 0, extraRowClass = '') {
    return `
        <tr class="hover:bg-slate-50/90 transition-colors ${extraRowClass}">
            <td class="px-5 py-2.5 font-sans ${extraRowClass ? '' : 'text-slate-700'}">${label}</td>
            ${values.map((v, idx) => `<td class="px-4 py-2.5 text-right ${idx === 0 ? 'bg-slate-50/60 border-r border-slate-200/70' : ''}">${typeof v === 'number' ? v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : (v ?? '—')}</td>`).join('')}
        </tr>
    `;
}

// 5. Render Transition & Incentive Schedule Table
function renderTransitionTable(sc) {
    const years = sc.years;
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const tipCell = (valStr, title, calc, formula, why, extraClass = '') => `
        <td class="px-4 py-2.5 text-right cursor-help hover:bg-amber-100/70 hover:text-amber-950 transition-colors ${extraClass}"
            data-ftitle="${esc(title)}"
            data-fcalc="${esc(calc)}"
            data-fexcel="${esc(formula)}"
            data-fwhy="${esc(why)}">${valStr}</td>`;

    const buildIncCells = (stageLabel, fArr, usdArr, rateKhr) => usdArr.map((v, idx) => {
        const cnt = fArr[idx];
        const valRounded = Math.round(v);
        const eligPct = idx === 0 ? '97.54%' : '96.65%';
        const effKg = idx === 0 ? 1724.5 : 1708.8;
        return tipCell(
            `$${valRounded.toLocaleString()}`,
            `${stageLabel} Incentive • ${years[idx]}`,
            `${cnt.toLocaleString()} × 4,420 kg × ${eligPct} × 40% × ${rateKhr} ÷ 4,100 = $${valRounded.toLocaleString()}`,
            `=ROUND( ${stageLabel} × ${effKg} kg × ${rateKhr} ÷ 4,100, 0 )`,
            `Why: Sticky Rice is excluded from incentive calculations; only 4 eligible varieties qualify at ${rateKhr} KHR/kg.`,
            idx === 0 ? 'bg-slate-50/60 border-r border-slate-200/70 font-medium text-slate-800' : 'text-slate-700'
        );
    }).join('');

    const p2Kg = sc.part2_transition_volumes_kg;
    const inc = sc.incentive_commitments;

    let html = `
        <table class="w-full text-[13.5px] text-left border-collapse">
            <thead class="bg-slate-100/95 text-slate-700 text-xs uppercase font-bold tracking-wider border-b-2 border-slate-200">
                <tr>
                    <th class="px-5 py-3.5">Incentive Metric</th>
                    ${years.map((y, idx) => `<th class="px-4 py-3.5 text-right text-[14px] ${idx === 0 ? 'bg-sky-50/80 text-sky-950 border-r border-slate-200/80' : ''}">${y}</th>`).join('')}
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-sans tabular-nums">
                ${renderTableRow('Transition Year 0 (WF) Farmers', sc.farmers.transition_yr0)}
                ${renderTableRow('Transition Year 1 (Ibis I) Farmers', sc.farmers.transition_yr1)}
                ${renderTableRow('Transition Year 2 (Ibis II) Farmers', sc.farmers.transition_yr2)}
                ${renderTableRow('Yr 0 Total Farm Production (kg)', p2Kg.yr0_wf_volume)}
                ${renderTableRow('Yr 1 Total Farm Production (kg)', p2Kg.yr1_volume)}
                ${renderTableRow('Yr 2 Total Farm Production (kg)', p2Kg.yr2_volume)}
                <tr class="bg-slate-50/90 hover:bg-slate-100/70 font-bold text-slate-900 border-y border-slate-200 transition-colors">
                    <td class="px-5 py-2.5 font-sans">Total Transition Production (kg)</td>
                    ${p2Kg.combined_volume.map((v, idx) => `<td class="px-4 py-2.5 text-right ${idx === 0 ? 'bg-slate-100/80 border-r border-slate-200/80' : ''}">${Math.round(v).toLocaleString()}</td>`).join('')}
                </tr>
                ${renderTableRow('Eligible 40% Incentive Volume (kg)', inc.eligible_40pct_volume_kg)}
                <tr><td class="px-5 py-2.5 font-sans text-slate-700">Yr 0 Incentive @ 200 KHR/kg (USD)</td>${buildIncCells('WF (Yr 0)', sc.farmers.transition_yr0, inc.yr0_incentive_usd, 200)}</tr>
                <tr><td class="px-5 py-2.5 font-sans text-slate-700">Yr 1 Incentive @ 200 KHR/kg (USD)</td>${buildIncCells('Ibis I (Yr 1)', sc.farmers.transition_yr1, inc.yr1_incentive_usd, 200)}</tr>
                <tr><td class="px-5 py-2.5 font-sans text-slate-700">Yr 2 Incentive @ 250 KHR/kg (USD)</td>${buildIncCells('Ibis II (Yr 2)', sc.farmers.transition_yr2, inc.yr2_incentive_usd, 250)}</tr>
                <tr class="bg-amber-50/85 hover:bg-amber-100/60 font-bold text-amber-950 border-y border-amber-200 transition-colors">
                    <td class="px-5 py-3 font-sans">Total Incentive Commitment (USD)</td>
                    ${inc.total_incentive_usd.map((v, idx) => {
                        const y0 = Math.round(inc.yr0_incentive_usd[idx]);
                        const y1 = Math.round(inc.yr1_incentive_usd[idx]);
                        const y2 = Math.round(inc.yr2_incentive_usd[idx]);
                        const totUsd = Math.round(v);
                        const totM = (inc.total_incentive_khr[idx] / 1000000).toFixed(1);
                        return tipCell(
                            `$${totUsd.toLocaleString()}`,
                            `Total Eligible Incentive • ${years[idx]}`,
                            `$${y0.toLocaleString()} + $${y1.toLocaleString()} + $${y2.toLocaleString()} = $${totUsd.toLocaleString()} (${totM}M KHR)`,
                            `=ROUND( WF + Ibis I + Ibis II [4 Eligible Var.], 0 )`,
                            `Why: Sticky Rice is excluded from WF through Ibis II incentive budgets.`,
                            idx === 0 ? 'py-3 bg-amber-100/70 border-r border-amber-200/80 font-bold' : 'py-3 font-bold'
                        );
                    }).join('')}
                </tr>
            </tbody>
        </table>
    `;

    const el = document.getElementById('transitionTableContainer');
    if (el) {
        el.innerHTML = html;
        attachFormulaTooltips(el);
    }
}

// 6. Export Forecast Tables (exact visible web table layout & order) as CSV or Excel
function triggerFileDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportTableCSV(containerId, filename) {
    const table = document.querySelector(`#${containerId} table`);
    if (!table) return;

    const lines = [];
    table.querySelectorAll('tr').forEach(tr => {
        const cells = Array.from(tr.querySelectorAll('th, td')).map(cell => {
            const text = cell.textContent.replace(/\s+/g, ' ').trim();
            return `"${text.replace(/"/g, '""')}"`;
        });
        if (cells.length) lines.push(cells.join(','));
    });

    const csvContent = '\uFEFF' + lines.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    triggerFileDownload(blob, filename);
}

function exportTableExcel(containerId, opts) {
    const table = document.querySelector(`#${containerId} table`);
    if (!table) return;

    const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let rowsHtml = '';
    table.querySelectorAll('tr').forEach((tr, rIdx) => {
        const isHeader = rIdx === 0;
        const cells = Array.from(tr.querySelectorAll('th, td'));
        const isSection = cells.length === 1 && cells[0].hasAttribute('colspan');
        const rowText = (cells[0]?.textContent || '').replace(/\s+/g, ' ').trim();
        const isStageGroupRow = /^(Part 2\.\d|Part 3\.\d)/.test(rowText) && !isSection;

        let bg = '#ffffff';
        let weight = 'normal';
        let color = '#1e293b';
        if (isHeader) { bg = '#15803d'; color = '#ffffff'; weight = 'bold'; }
        else if (isSection) { bg = '#f1f5f9'; weight = 'bold'; color = '#0f172a'; }
        else if (rowText.includes('Total Organic Volume') || rowText.includes('Total Active Compliant Farmers')) { bg = '#dcfce7'; weight = 'bold'; color = '#14532d'; }
        else if (rowText.includes('Combined Transition Production')) { bg = '#dbeafe'; weight = 'bold'; color = '#1e3a8a'; }
        else if (rowText.includes('Total Transition Farmers')) { bg = '#fef3c7'; weight = 'bold'; color = '#78350f'; }
        else if (rowText.includes('Non-Compliance')) { bg = '#ffe4e6'; weight = 'bold'; color = '#9f1239'; }
        else if (isStageGroupRow) { bg = '#f8fafc'; weight = 'bold'; color = '#0f172a'; }

        rowsHtml += '<tr>';
        cells.forEach((cell, cIdx) => {
            const raw = cell.textContent.replace(/\s+/g, ' ').trim();
            const colspan = cell.getAttribute('colspan');
            const spanAttr = colspan ? ` colspan="${colspan}"` : '';
            const align = cIdx === 0 ? 'left' : 'right';
            const numClean = raw.replace(/,/g, '');
            const isNumeric = cIdx > 0 && !isHeader && /^-?\d+(\.\d+)?$/.test(numClean);
            const numFmt = isNumeric ? 'mso-number-format:\\#\\,\\#\\#0;' : '';
            const val = isNumeric ? numClean : escHtml(raw);
            rowsHtml += `<td${spanAttr} align="${align}" style="background:${bg};color:${color};font-weight:${weight};border:1px solid #cbd5e1;padding:5px 8px;${numFmt}">${val}</td>`;
        });
        rowsHtml += '</tr>';
    });

    const excelDoc = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office"
              xmlns:x="urn:schemas-microsoft-com:office:excel"
              xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="UTF-8">
            <!--[if gte mso 9]><xml>
                <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                    <x:Name>${escHtml(opts.sheetName)}</x:Name>
                    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>
            </xml><![endif]-->
        </head>
        <body style="font-family:Calibri,Arial,sans-serif;font-size:11pt;">
            <table>
                <tr><td colspan="9" style="font-size:13pt;font-weight:bold;color:#15803d;padding:6px 4px;">${escHtml(opts.sheetTitle)}</td></tr>
                ${rowsHtml}
            </table>
        </body>
        </html>`;

    const blob = new Blob([excelDoc], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    triggerFileDownload(blob, opts.filename);
}
