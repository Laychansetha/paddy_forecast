// IRCC Long-Term Forecast Dashboard Application Logic

let currentScenario = 'baseline';
let currentUnitVolume = 'MT'; // 'MT' or 'kg'
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
        // Fallback if login screen is absent
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

// Wait for DOM to load
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

            // Trigger chart resize on tab switch
            Object.values(charts).forEach(chart => {
                if (chart) chart.resize();
            });
        });
    });
}

// Controls (Scenario, Volume Unit, Currency Unit)
function initControls() {
    const scenarioSelect = document.getElementById('scenarioSelect');
    if (scenarioSelect) {
        scenarioSelect.addEventListener('change', (e) => {
            currentScenario = e.target.value;
            renderAll();
        });
    }

    const unitVolumeSelect = document.getElementById('unitVolumeSelect');
    if (unitVolumeSelect) {
        unitVolumeSelect.addEventListener('change', (e) => {
            currentUnitVolume = e.target.value;
            renderAll();
        });
    }

    const unitCurrencySelect = document.getElementById('unitCurrencySelect');
    if (unitCurrencySelect) {
        unitCurrencySelect.addEventListener('change', (e) => {
            currentUnitCurrency = e.target.value;
            renderAll();
        });
    }

    const btnExportCSV = document.getElementById('btnExportCSV');
    if (btnExportCSV) {
        btnExportCSV.addEventListener('click', exportMasterTableCSV);
    }

    const btnExportExcel = document.getElementById('btnExportExcel');
    if (btnExportExcel) {
        btnExportExcel.addEventListener('click', exportMasterTableExcel);
    }
}

// Master Render Function
function renderAll() {
    const data = window.FORECAST_DATA;
    if (!data) {
        console.error("Forecast data not loaded!");
        return;
    }

    const scenarioData = data.scenarios[currentScenario];
    const historicalData = data.historical;

    renderKPICards(scenarioData, data.meta);
    renderCharts(scenarioData, historicalData, data.scenarios);
    renderMasterTable(scenarioData);
    renderHistoricalTable(historicalData);
    renderTransitionTable(scenarioData);
}

// 1. KPI Cards
function renderKPICards(sc, meta) {
    const years = sc.years;
    const lastIdx = years.length - 1; // 2033
    const baseIdx = 0; // 2026

    // 2033 Total Organic Volume
    const vol2033 = Math.round(sc.part1_organic_purchases_mt.total[lastIdx]);
    const vol2026 = Math.round(sc.part1_organic_purchases_mt.total[baseIdx]);
    const volGrowth = (((vol2033 - vol2026) / vol2026) * 100).toFixed(1);

    document.getElementById('kpiOrganicVol').textContent = currentUnitVolume === 'MT' ? `${vol2033.toLocaleString()} MT` : `${(vol2033 * 1000).toLocaleString()} kg`;
    document.getElementById('kpiOrganicVolSub').textContent = `↑ +${volGrowth}% vs 2026 (${vol2026.toLocaleString()} MT)`;

    // 2033 Selling Farmers
    const farmers2033 = sc.farmers.selling_paddy[lastIdx];
    const farmers2026 = sc.farmers.selling_paddy[baseIdx];
    const farmerGrowth = farmers2033 - farmers2026;

    document.getElementById('kpiSellingFarmers').textContent = `${farmers2033.toLocaleString()} farmers`;
    document.getElementById('kpiSellingFarmersSub').textContent = `↑ +${farmerGrowth.toLocaleString()} organic sellers net`;

    // Steady State Transition Volume
    const transVol2033 = Math.round(sc.part2_transition_volumes_mt.combined_volume[lastIdx]);
    const transFarmers2033 = sc.farmers.transition_yr0[lastIdx] + sc.farmers.transition_yr1[lastIdx] + sc.farmers.transition_yr2[lastIdx];
    document.getElementById('kpiTransitionVol').textContent = currentUnitVolume === 'MT' ? `${transVol2033.toLocaleString()} MT/yr` : `${(transVol2033 * 1000).toLocaleString()} kg/yr`;
    document.getElementById('kpiTransitionVolSub').textContent = `From ${transFarmers2033.toLocaleString()} in-conversion farmers (Yr 0, 1, 2)`;

    // Steady State Incentive Budget
    const incUsd2033 = sc.incentive_commitments.total_incentive_usd[lastIdx];
    const incKhr2033 = sc.incentive_commitments.total_incentive_khr[lastIdx];

    if (currentUnitCurrency === 'USD') {
        document.getElementById('kpiIncentive').textContent = `$${incUsd2033.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
        document.getElementById('kpiIncentiveSub').textContent = `≈ ${(incKhr2033 / 1000000).toFixed(1)} Million KHR/yr`;
    } else {
        document.getElementById('kpiIncentive').textContent = `${(incKhr2033 / 1000000).toFixed(1)}M KHR`;
        document.getElementById('kpiIncentiveSub').textContent = `≈ $${incUsd2033.toLocaleString()} USD/yr`;
    }
}

// 2. Charts Rendering
function renderCharts(sc, hist, allScenarios) {
    const isMT = currentUnitVolume === 'MT';
    const mult = isMT ? 1 : 1000;
    const volUnit = isMT ? 'MT' : 'kg';

    // Chart A1: Historical Actuals (2022-2025) + Forecast Trajectory (2026 Near-Term + 2027-2033)
    const histYears = hist.years.slice(0, 4).map(String); // 2022-2025 actuals only
    const fcYears = sc.years.map(String); // 2026-2033 forecast
    const combinedYears = [...histYears, ...fcYears]; // 2022 to 2033

    // Build historical values (2022-2025 actuals)
    const histPR = hist.volumes_actual_kg.phka_rumduol.slice(0, 4).map(v => isMT ? v / 1000 : v);
    const histWR = hist.volumes_actual_kg.white_rice.slice(0, 4).map(v => isMT ? v / 1000 : v);
    const histRJ = hist.volumes_actual_kg.red_jasmine.slice(0, 4).map(v => isMT ? v / 1000 : v);
    const histSD = hist.volumes_actual_kg.seed.slice(0, 4).map(v => isMT ? v / 1000 : v);

    // Build forecast values (2026-2033)
    const fcPR = sc.part1_organic_purchases_mt.phka_rumduol.map(v => isMT ? v : v * 1000);
    const fcWR = sc.part1_organic_purchases_mt.white_rice.map(v => isMT ? v : v * 1000);
    const fcRJ = sc.part1_organic_purchases_mt.red_jasmine.map(v => isMT ? v : v * 1000);
    const fcSD = sc.part1_organic_purchases_mt.seed.map(v => isMT ? v : v * 1000);

    // Merge datasets (2022-2025 actuals + 2026-2033 forecast)
    const fullPR = [...histPR, ...fcPR];
    const fullWR = [...histWR, ...fcWR];
    const fullRJ = [...histRJ, ...fcRJ];
    const fullSD = [...histSD, ...fcSD];

    // Custom plugin: subtle shading & vertical divider between 2025 Actuals and 2026-2033 Forecast
    const forecastDividerPlugin = {
        id: 'forecastDivider',
        beforeDatasetsDraw(chart) {
            const { ctx, chartArea, scales } = chart;
            if (!chartArea || !scales.x) return;
            const splitX = (scales.x.getPixelForValue(3) + scales.x.getPixelForValue(4)) / 2;
            ctx.save();
            // Subtle green tint over forecast zone (2026-2033)
            ctx.fillStyle = 'rgba(16, 185, 129, 0.045)';
            ctx.fillRect(splitX, chartArea.top, chartArea.right - splitX, chartArea.bottom - chartArea.top);
            // Vertical dashed separator
            ctx.strokeStyle = 'rgba(100, 116, 139, 0.45)';
            ctx.lineWidth = 1.25;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(splitX, chartArea.top);
            ctx.lineTo(splitX, chartArea.bottom);
            ctx.stroke();
            // Crisp labels
            ctx.setLineDash([]);
            ctx.font = '600 10px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.textAlign = 'right';
            ctx.fillText('Actuals', splitX - 6, chartArea.top + 12);
            ctx.fillStyle = '#059669';
            ctx.textAlign = 'left';
            ctx.fillText('Forecast →', splitX + 6, chartArea.top + 12);
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
                    { label: 'Phka Rumduol', data: fullPR, backgroundColor: '#059669', borderRadius: 2, barPercentage: 0.72, categoryPercentage: 0.84 },
                    { label: 'White Rice', data: fullWR, backgroundColor: '#0ea5e9', borderRadius: 2, barPercentage: 0.72, categoryPercentage: 0.84 },
                    { label: 'Red Jasmine', data: fullRJ, backgroundColor: '#e11d48', borderRadius: 2, barPercentage: 0.72, categoryPercentage: 0.84 },
                    { label: 'Seed', data: fullSD, backgroundColor: '#f59e0b', borderRadius: { topLeft: 4, topRight: 4 }, barPercentage: 0.72, categoryPercentage: 0.84 }
                ]
            },
            plugins: [forecastDividerPlugin],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: {
                    x: { stacked: true, grid: { display: false }, border: { display: false }, ticks: { font: { size: 11 }, color: '#475569' } },
                    y: {
                        stacked: true,
                        border: { display: false },
                        grid: { color: 'rgba(148, 163, 184, 0.16)' },
                        title: { display: true, text: `Volume (${volUnit})`, font: { size: 11, weight: '600' }, color: '#64748b' },
                        ticks: { callback: v => v.toLocaleString(), font: { size: 11 }, color: '#64748b' }
                    }
                },
                plugins: {
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.94)',
                        padding: 10,
                        cornerRadius: 8,
                        callbacks: {
                            afterTitle: (items) => {
                                const yr = Number(items[0].label);
                                if (yr <= 2025) return 'Historical Actuals (2022–2025)';
                                if (yr === 2026) return '2026 Near-Term Forecast (Near Purchase)';
                                return 'Projected Forecast (2027–2033)';
                            },
                            footer: (items) => {
                                const sum = items.reduce((acc, it) => acc + (it.parsed.y || 0), 0);
                                return `Total: ${sum.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${volUnit}`;
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

    // Chart A2: Farmer Pipeline Chart (Sleek smooth lines + soft gradient + concise labels)
    if (charts.farmerPipeline) charts.farmerPipeline.destroy();
    const ctxFarmers = document.getElementById('chartFarmerPipeline');
    if (ctxFarmers) {
        const ctx2d = ctxFarmers.getContext('2d');
        const orgGrad = ctx2d.createLinearGradient(0, 0, 0, 280);
        orgGrad.addColorStop(0, 'rgba(5, 150, 105, 0.16)');
        orgGrad.addColorStop(1, 'rgba(5, 150, 105, 0.0)');

        const totGrad = ctx2d.createLinearGradient(0, 0, 0, 280);
        totGrad.addColorStop(0, 'rgba(225, 29, 72, 0.08)');
        totGrad.addColorStop(1, 'rgba(225, 29, 72, 0.0)');

        charts.farmerPipeline = new Chart(ctxFarmers, {
            type: 'line',
            data: {
                labels: sc.years.map(String),
                datasets: [
                    {
                        label: 'Total Active',
                        data: sc.farmers.total_active_farmers_incl_nonsell,
                        borderColor: '#e11d48',
                        backgroundColor: totGrad,
                        borderWidth: 2.75,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 3.5,
                        pointHoverRadius: 6.5,
                        pointHitRadius: 14,
                        pointBackgroundColor: '#e11d48',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 1.5
                    },
                    {
                        label: 'Organic',
                        data: sc.farmers.selling_paddy,
                        borderColor: '#059669',
                        backgroundColor: orgGrad,
                        borderWidth: 2.75,
                        fill: true,
                        tension: 0.35,
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
                        tension: 0.35,
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
                        tension: 0.35,
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
                        tension: 0.35,
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
                interaction: { mode: 'nearest', intersect: true },
                scales: {
                    x: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 11 }, color: '#475569' } },
                    y: {
                        min: 0,
                        suggestedMax: 3500,
                        border: { display: false },
                        grid: { color: 'rgba(148, 163, 184, 0.16)' },
                        title: { display: true, text: 'Farmers', font: { size: 11, weight: '600' }, color: '#64748b' },
                        ticks: { stepSize: 500, callback: v => v.toLocaleString(), font: { size: 11 }, color: '#64748b' }
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
                                const tot = sc.farmers.total_active_farmers_incl_nonsell[i];
                                const org = sc.farmers.selling_paddy[i];
                                const wf = sc.farmers.transition_yr0[i];
                                const y1 = sc.farmers.transition_yr1[i];
                                const y2 = sc.farmers.transition_yr2[i];
                                const nonSell = tot - (org + wf + y1 + y2);
                                const lines = [
                                    `  • Organic (Selling): ${org.toLocaleString()}`,
                                    `  • WF: ${wf.toLocaleString()}  |  Ibis I: ${y1.toLocaleString()}  |  Ibis II: ${y2.toLocaleString()}`,
                                    `  • Organic (Non-selling): ${nonSell.toLocaleString()}`
                                ];
                                if (i === 0) lines.push('  (AFL 2026 active base; excludes 336 NC)');
                                return lines;
                            }
                        }
                    }
                }
            }
        });
    }

    // Chart B1: Realization Rate History (Gradients + Direct % Labels + 80% Threshold Tag)
    if (charts.realization) charts.realization.destroy();
    const ctxReal = document.getElementById('chartRealization');
    if (ctxReal) {
        const actMT = hist.volumes_actual_kg.total.map(v => Math.round(v / 1000).toLocaleString());
        const estMT = hist.volumes_estimated_kg.total.map(v => Math.round(v / 1000).toLocaleString());

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
                const meta = chart.getDatasetMeta(0);
                if (!meta || !meta.data) return;
                ctx.save();
                ctx.font = '700 11px Inter, system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#ffffff';
                meta.data.forEach((bar, idx) => {
                    const val = chart.data.datasets[0].data[idx];
                    ctx.fillText(`${val}%`, bar.x, bar.y + 18);
                });
                // Crisp tag above thin 80% line
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
                labels: ['2022', '2023', '2024', '2025', '2026*', '5-Yr Avg'],
                datasets: [
                    {
                        label: 'Actual % Delivered',
                        data: [76.5, 76.1, 66.7, 67.8, 69.8, 71.4],
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

    // Chart B2: Multi-Year Incentive Commitments (Stacked by Stage: WF, Ibis I, Ibis II)
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
                        suggestedMax: isUSD ? 128000 : 530,
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
                                return isUSD ? `Total: $${tot.toLocaleString()} USD` : `Total: ${tot.toLocaleString()} Million KHR`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Chart C1: Scenario Comparison Chart (Total Organic MT across Baseline, Conservative, Optimistic)
    if (charts.scenarios) charts.scenarios.destroy();
    const ctxScen = document.getElementById('chartScenarios');
    if (ctxScen) {
        charts.scenarios = new Chart(ctxScen, {
            type: 'line',
            data: {
                labels: sc.years.map(String),
                datasets: [
                    { label: 'Best Case (650 new/yr, 8.5% NC)', data: allScenarios.optimistic.part1_organic_purchases_mt.total, borderColor: '#059669', backgroundColor: '#059669', borderWidth: 2.5, tension: 0.35, pointRadius: 3.5, pointHoverRadius: 6, pointBorderColor: '#fff', pointBorderWidth: 1.5 },
                    { label: 'Main Plan (500 new/yr, 11.59% NC)', data: allScenarios.baseline.part1_organic_purchases_mt.total, borderColor: '#0284c7', backgroundColor: '#0284c7', borderWidth: 3, tension: 0.35, pointRadius: 3.5, pointHoverRadius: 6, pointBorderColor: '#fff', pointBorderWidth: 1.5 },
                    { label: 'Risk Case (400 new/yr, 14.82% NC)', data: allScenarios.conservative.part1_organic_purchases_mt.total, borderColor: '#e11d48', backgroundColor: '#e11d48', borderWidth: 2.5, tension: 0.35, pointRadius: 3.5, pointHoverRadius: 6, pointBorderColor: '#fff', pointBorderWidth: 1.5 }
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
                    tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.94)', padding: 10, cornerRadius: 8 }
                }
            }
        });
    }
}

// 3. Render Master Table (Long Term Forecast 2026-2033)
function renderMasterTable(sc) {
    const years = sc.years;
    const excelCols = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const isMT = currentUnitVolume === 'MT';
    const unit = isMT ? 'MT' : 'kg';
    const ncPct = (sc.parameters.nc_rate * 100).toFixed(2);
    const retPct = ((1 - sc.parameters.nc_rate) * 100).toFixed(2);
    const intake = sc.parameters.new_intake_yr0;

    const fmtVol = (v) => Math.round(v).toLocaleString();
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const p1Kg = sc.part1_organic_purchases_kg;
    const p1Mt = sc.part1_organic_purchases_mt;
    const p2Kg = sc.part2_transition_volumes_kg;
    const p2Mt = sc.part2_transition_volumes_mt;
    const f = sc.farmers;

    const formulaCell = (valStr, title, calc, roundFormula, whyText, extraClass = '') => `
        <td class="px-3 py-1.5 text-right cursor-help hover:bg-emerald-100/60 transition-colors ${extraClass}"
            data-ftitle="${esc(title)}"
            data-fcalc="${esc(calc)}"
            data-fexcel="${esc(roundFormula)}"
            data-fwhy="${esc(whyText)}">
            <span class="border-b border-dotted border-slate-300">${valStr}</span>
        </td>`;

    const buildVarietyCells = (label, key, sharePct) => {
        const arr = isMT ? p1Mt[key] : p1Kg[key];
        const kgPerSeller = (p1Kg[key][0] / f.selling_paddy[0]).toFixed(2);
        return arr.map((v, idx) => {
            const yr = years[idx];
            if (idx === 0) {
                return formulaCell(
                    fmtVol(v),
                    `${label} • ${yr}`,
                    `2026 Near-Term Plan: ${Math.round(isMT ? p1Mt[key][0] : p1Kg[key][0]).toLocaleString()} ${unit} (${kgPerSeller} kg × 1,700 sellers)`,
                    `2026 Baseline = ROUND(${(isMT ? p1Mt[key][0] : p1Kg[key][0]).toLocaleString()}, 0)`,
                    `Why: Uses 2026 purchase plan & stable ${sharePct}% variety mix (farmers sell ~48.4% of harvest and keep ~51.6% for consumption).`
                );
            }
            const sellers = f.selling_paddy[idx];
            const calc = isMT
                ? `${sellers.toLocaleString()} Selling Paddy farmers × ${kgPerSeller} kg/farmer ÷ 1,000 = ${fmtVol(v)} MT`
                : `${sellers.toLocaleString()} Selling Paddy farmers × ${kgPerSeller} kg/farmer = ${fmtVol(v)} kg`;
            const roundFormula = isMT
                ? `=ROUND( Part 3 [Selling Paddy] × (2026 ${label} ÷ 2026 Selling Paddy) ÷ 1,000, 0 )`
                : `=ROUND( Part 3 [Selling Paddy] × (2026 ${label} ÷ 2026 Selling Paddy), 0 )`;
            const whyText = `Why: Only certified organic sellers deliver organic paddy; keeps stable ${sharePct}% ${label} mix and 48.4% sold share.`;
            return formulaCell(fmtVol(v), `${label} • ${yr}`, calc, roundFormula, whyText);
        }).join('');
    };

    const buildPart2Cells = (label, stageShort, key, fKey, aflLabel) => {
        const arr = isMT ? p2Mt[key] : p2Kg[key];
        return arr.map((v, idx) => {
            const yr = years[idx];
            if (idx === 0) {
                return formulaCell(
                    fmtVol(v),
                    `${label} • ${yr}`,
                    `2026 AFL ${aflLabel} estimate: ${Math.round(isMT ? p2Mt[key][0] : p2Kg[key][0]).toLocaleString()} ${unit} across ${f[fKey][0].toLocaleString()} ${stageShort} farmers`,
                    `=ROUND( 2026 AFL [${stageShort} Estimate], 0 )`,
                    `Why: Tracks conversion harvest volume separately from organic purchases to budget 40% transition incentives.`
                );
            }
            const cnt = f[fKey][idx];
            const calc = isMT
                ? `${cnt.toLocaleString()} ${stageShort} farmers × 4,420 kg (2.6 Ha × 1.7 MT/Ha) ÷ 1,000 = ${fmtVol(v)} MT`
                : `${cnt.toLocaleString()} ${stageShort} farmers × 4,420 kg (2.6 Ha × 1.7 MT/Ha) = ${fmtVol(v)} kg`;
            const roundFormula = isMT
                ? `=ROUND( Part 3 [${stageShort}] × (2.6 Ha × 1.7 MT/Ha), 0 )`
                : `=ROUND( Part 3 [${stageShort}] × 4,420 kg, 0 )`;
            const whyText = `Why: Transition incentives pay 40% of total farm production (not purchased paddy), based on 2.6 Ha × 1.7 MT/Ha.`;
            return formulaCell(fmtVol(v), `${label} • ${yr}`, calc, roundFormula, whyText);
        }).join('');
    };

    let html = `
        <table class="w-full text-xs text-left">
            <thead class="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                <tr>
                    <th class="px-4 py-3">Section / Variety</th>
                    ${years.map(y => `<th class="px-3 py-3 text-right">${y}</th>`).join('')}
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-mono">
                <!-- Part 1 -->
                <tr class="bg-slate-50/80 font-sans font-bold text-slate-900"><td colspan="${years.length + 1}" class="px-4 py-2">Part 1: Volumes by Variety (${unit})</td></tr>
                <tr><td class="px-4 py-1.5 font-sans text-slate-600">Phka Rumduol</td>${buildVarietyCells("Phka Rumduol", "phka_rumduol", "45.2")}</tr>
                <tr><td class="px-4 py-1.5 font-sans text-slate-600">White rice</td>${buildVarietyCells("White rice", "white_rice", "42.2")}</tr>
                <tr><td class="px-4 py-1.5 font-sans text-slate-600">Red Jasmine</td>${buildVarietyCells("Red Jasmine", "red_jasmine", "11.4")}</tr>
                <tr><td class="px-4 py-1.5 font-sans text-slate-600">Seed</td>${buildVarietyCells("Seed", "seed", "1.2")}</tr>
                <tr class="bg-emerald-50/60 font-bold text-emerald-900 border-t border-b border-emerald-200">
                    <td class="px-4 py-2 font-sans">Total Organic Volume</td>
                    ${(isMT ? p1Mt.total : p1Kg.total).map((v, idx) => {
                        const src = isMT ? p1Mt : p1Kg;
                        const calc = `${fmtVol(src.phka_rumduol[idx])} + ${fmtVol(src.white_rice[idx])} + ${fmtVol(src.red_jasmine[idx])} + ${fmtVol(src.seed[idx])} = ${fmtVol(v)} ${unit}`;
                        return formulaCell(
                            fmtVol(v),
                            `Total Organic Volume • ${years[idx]}`,
                            calc,
                            `=ROUND( Part 1 [Phka Rumduol + White Rice + Red Jasmine + Seed], 0 )`,
                            `Why: Total certified organic paddy expected for commercial purchase across all 4 rice varieties.`,
                            'py-2'
                        );
                    }).join('')}
                </tr>

                <!-- Part 2 -->
                <tr class="bg-slate-50/80 font-sans font-bold text-slate-900"><td colspan="${years.length + 1}" class="px-4 py-2">Part 2: Volumes in Transition (${unit}) - Total Farm Production (4,420 kg/farmer)</td></tr>
                <tr><td class="px-4 py-1.5 font-sans text-slate-600">Part 2.1 - Year 0 (WF) Total</td>${buildPart2Cells("Part 2.1 - WF", "WF", "yr0_wf_volume", "transition_yr0", "WF")}</tr>
                <tr><td class="px-4 py-1.5 font-sans text-slate-600">Part 2.2 - Year 1 (Ibis I) Total</td>${buildPart2Cells("Part 2.2 - Ibis I", "Ibis I", "yr1_volume", "transition_yr1", "Ibis I")}</tr>
                <tr><td class="px-4 py-1.5 font-sans text-slate-600">Part 2.3 - Year 2 (Ibis II) Total</td>${buildPart2Cells("Part 2.3 - Ibis II", "Ibis II", "yr2_volume", "transition_yr2", "Ibis II")}</tr>
                <tr class="bg-blue-50/60 font-bold text-blue-900 border-t border-b border-blue-200">
                    <td class="px-4 py-2 font-sans">Combined Transition Production</td>
                    ${(isMT ? p2Mt.combined_volume : p2Kg.combined_volume).map((v, idx) => {
                        const src = isMT ? p2Mt : p2Kg;
                        const calc = `${fmtVol(src.yr0_wf_volume[idx])} + ${fmtVol(src.yr1_volume[idx])} + ${fmtVol(src.yr2_volume[idx])} = ${fmtVol(v)} ${unit}`;
                        return formulaCell(
                            fmtVol(v),
                            `Combined Transition • ${years[idx]}`,
                            calc,
                            `=ROUND( Part 2.1 [WF] + Part 2.2 [Ibis I] + Part 2.3 [Ibis II], 0 )`,
                            `Why: Total crop produced by in-conversion farmers; 40% of this base determines annual transition incentive budgets.`,
                            'py-2'
                        );
                    }).join('')}
                </tr>

                <!-- Part 3 -->
                <tr class="bg-slate-50/80 font-sans font-bold text-slate-900"><td colspan="${years.length + 1}" class="px-4 py-2">Part 3: Farmers in IRCC Program (Headcount - Proportional ${ncPct}% NC Rate)</td></tr>
                <tr>
                    <td class="px-4 py-1.5 font-sans text-slate-600">Selling Paddy (Organic)</td>
                    ${f.selling_paddy.map((v, idx) => {
                        if (idx === 0) {
                            return formulaCell(
                                v.toLocaleString(),
                                `Selling Paddy • 2026`,
                                `2026 Audited Organic Sellers = 1,700 (out of 1,807 certified organic)`,
                                `2026 Baseline = ROUND( AFL [Selling Organic], 0 )`,
                                `Why: Uses actual 2026 sellers from AFL (107 certified farmers kept harvest for home use); NC is NOT deducted again in 2026.`
                            );
                        }
                        const calc = `(${f.selling_paddy[idx - 1].toLocaleString()} prev Organic + ${f.transition_yr2[idx - 1].toLocaleString()} prev Ibis II) × ${retPct}% = ${v.toLocaleString()}`;
                        const why = years[idx] === 2028
                            ? `Why: 2028 dips because only 11 Ibis II farmers graduate (from the tiny 2026 Ibis I group of 12), minus 11.59% proportional NC.`
                            : `Why: Prior-year Ibis II farmers complete their 4th harvest cycle to graduate into Organic, minus ${ncPct}% annual NC.`;
                        return formulaCell(
                            v.toLocaleString(),
                            `Selling Paddy • ${years[idx]}`,
                            calc,
                            `=ROUND( (Part 3 [Prev Organic] + Part 3 [Prev Ibis II]) × (1 - ${ncPct}% NC), 0 )`,
                            why
                        );
                    }).join('')}
                </tr>
                <tr>
                    <td class="px-4 py-1.5 font-sans text-slate-600">Transition Year 0 (WF)</td>
                    ${f.transition_yr0.map((v, idx) => {
                        if (idx === 0) {
                            return formulaCell(
                                v.toLocaleString(),
                                `WF • 2026`,
                                `2026 Active WF = 332 farmers`,
                                `2026 Baseline = ROUND( AFL [WF Active], 0 )`,
                                `Why: 2026 active count already excludes 2026 NC; starts the 4-harvest-cycle conversion pipeline.`
                            );
                        }
                        const calc = `${intake} new registrations × ${retPct}% (1 - ${ncPct}% NC) = ${v.toLocaleString()}`;
                        return formulaCell(
                            v.toLocaleString(),
                            `WF • ${years[idx]}`,
                            calc,
                            `=ROUND( Annual Intake [${intake}] × (1 - ${ncPct}% NC), 0 )`,
                            `Why: ~${intake} new farmers join in Jan–May; ${ncPct}% exit at the Sept audit, leaving ${v} compliant WF farmers.`
                        );
                    }).join('')}
                </tr>
                <tr>
                    <td class="px-4 py-1.5 font-sans text-slate-600">Transition Year 1 (Ibis I)</td>
                    ${f.transition_yr1.map((v, idx) => {
                        if (idx === 0) {
                            return formulaCell(
                                v.toLocaleString(),
                                `Ibis I • 2026`,
                                `2026 Active Ibis I = 12 farmers`,
                                `2026 Baseline = ROUND( AFL [Ibis I Active], 0 )`,
                                `Why: Reflects the small 2026 Ibis I cohort in AFL; already post-audit so no extra NC deduction in 2026.`
                            );
                        }
                        const calc = `${f.transition_yr0[idx - 1].toLocaleString()} prev WF × ${retPct}% (1 - ${ncPct}% NC) = ${v.toLocaleString()}`;
                        return formulaCell(
                            v.toLocaleString(),
                            `Ibis I • ${years[idx]}`,
                            calc,
                            `=ROUND( Part 3 [Prev Year WF] × (1 - ${ncPct}% NC), 0 )`,
                            `Why: Active WF farmers advance to their 2nd harvest cycle (Ibis I), retaining ${retPct}% after annual audit NC.`
                        );
                    }).join('')}
                </tr>
                <tr>
                    <td class="px-4 py-1.5 font-sans text-slate-600">Transition Year 2 (Ibis II)</td>
                    ${f.transition_yr2.map((v, idx) => {
                        if (idx === 0) {
                            return formulaCell(
                                v.toLocaleString(),
                                `Ibis II • 2026`,
                                `2026 Active Ibis II = 413 farmers`,
                                `2026 Baseline = ROUND( AFL [Ibis II Active], 0 )`,
                                `Why: These 413 Ibis II farmers complete conversion in 2026 and graduate into Selling Organic in 2027.`
                            );
                        }
                        const calc = `${f.transition_yr1[idx - 1].toLocaleString()} prev Ibis I × ${retPct}% (1 - ${ncPct}% NC) = ${v.toLocaleString()}`;
                        return formulaCell(
                            v.toLocaleString(),
                            `Ibis II • ${years[idx]}`,
                            calc,
                            `=ROUND( Part 3 [Prev Year Ibis I] × (1 - ${ncPct}% NC), 0 )`,
                            `Why: Ibis I farmers advance to their 3rd harvest cycle (Ibis II), retaining ${retPct}% after annual audit NC.`
                        );
                    }).join('')}
                </tr>
                <tr class="bg-amber-50/60 font-bold text-amber-900 border-t border-b border-amber-200">
                    <td class="px-4 py-2 font-sans">Total Pipeline Farmers (=SUM)</td>
                    ${f.total_farmers.map((v, idx) => {
                        const calc = `${f.selling_paddy[idx].toLocaleString()} + ${f.transition_yr0[idx].toLocaleString()} + ${f.transition_yr1[idx].toLocaleString()} + ${f.transition_yr2[idx].toLocaleString()} = ${v.toLocaleString()}`;
                        return formulaCell(
                            v.toLocaleString(),
                            `Total Pipeline • ${years[idx]}`,
                            calc,
                            `=ROUND( Part 3 [Selling Paddy + WF + Ibis I + Ibis II], 0 )`,
                            `Why: Total active farmers actively selling organic paddy or progressing through the 3 transition stages.`,
                            'py-2'
                        );
                    }).join('')}
                </tr>
                <tr class="bg-slate-100 font-bold text-slate-800">
                    <td class="px-4 py-2 font-sans">Total Active Farmers (incl. 107 non-selling organic)*</td>
                    ${f.total_active_farmers_incl_nonsell.map((v, idx) => {
                        const pipe = f.total_farmers[idx];
                        const nonSell = v - pipe;
                        const calc = `${pipe.toLocaleString()} pipeline + ${nonSell.toLocaleString()} non-selling organic = ${v.toLocaleString()} active`;
                        return formulaCell(
                            v.toLocaleString(),
                            `Total Active • ${years[idx]}`,
                            calc,
                            `=ROUND( Part 3 [Total Pipeline] + Certified [Non-selling Organic], 0 )`,
                            idx === 0
                                ? `Why: Reconciles directly to AFL 2026 active base (2,564 = 1,807 Organic + 332 WF + 12 Ibis I + 413 Ibis II; excludes 336 NC).`
                                : `Why: Total compliant farmers in the IRCC registry (including organic farmers retaining crop for home use).`,
                            'py-2'
                        );
                    }).join('')}
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

function attachFormulaTooltips(container) {
    let tip = document.getElementById('cellFormulaTooltip');
    if (!tip) {
        tip = document.createElement('div');
        tip.id = 'cellFormulaTooltip';
        tip.className = 'fixed z-50 pointer-events-none hidden bg-slate-900/95 text-white text-xs rounded-lg shadow-xl border border-slate-700 px-3.5 py-2.5 max-w-sm leading-relaxed';
        document.body.appendChild(tip);
    }

    const cells = container.querySelectorAll('td[data-ftitle]');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            const title = cell.getAttribute('data-ftitle');
            const calc = cell.getAttribute('data-fcalc');
            const formula = cell.getAttribute('data-fexcel');
            const why = cell.getAttribute('data-fwhy');
            tip.innerHTML = `
                <div class="font-bold text-emerald-400 mb-1">${title}</div>
                <div class="font-mono text-[11px] text-amber-300 bg-slate-800/90 px-2 py-1 rounded border border-slate-700 mb-1.5">${formula}</div>
                <div class="text-slate-100 mb-1">${calc}</div>
                <div class="text-[11px] text-slate-400 italic">${why}</div>
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
        cell.addEventListener('mouseleave', () => {
            tip.classList.add('hidden');
        });
    });
}

function renderTableRow(label, values, decimals = 0) {
    return `
        <tr>
            <td class="px-4 py-1.5 font-sans text-slate-600">${label}</td>
            ${values.map(v => `<td class="px-3 py-1.5 text-right">${typeof v === 'number' ? v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : v}</td>`).join('')}
        </tr>
    `;
}

// 4. Render Historical Table (2022-2026)
function renderHistoricalTable(hist) {
    const years = hist.years;
    let html = `
        <table class="w-full text-xs text-left">
            <thead class="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                <tr>
                    <th class="px-4 py-3">Harvest Year</th>
                    <th class="px-3 py-3 text-right">Registered Organic</th>
                    <th class="px-3 py-3 text-right">Selling Farmers</th>
                    <th class="px-3 py-3 text-right">Selling Rate</th>
                    <th class="px-3 py-3 text-right">Est. Volume (MT)</th>
                    <th class="px-3 py-3 text-right">Act. Purchased (MT)</th>
                    <th class="px-3 py-3 text-right">Realization Rate</th>
                    <th class="px-3 py-3 text-right">NC Farmers</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-mono">
                ${years.map((y, idx) => `
                    <tr>
                        <td class="px-4 py-2 font-sans font-bold text-slate-800">${y}</td>
                        <td class="px-3 py-2 text-right">${hist.farmers.organic_registered[idx].toLocaleString()}</td>
                        <td class="px-3 py-2 text-right">${hist.farmers.organic_selling[idx].toLocaleString()}</td>
                        <td class="px-3 py-2 text-right text-emerald-700 font-semibold">${hist.farmers.selling_rate_pct[idx]}%</td>
                        <td class="px-3 py-2 text-right">${Math.round(hist.volumes_estimated_kg.total[idx] / 1000).toLocaleString()} MT</td>
                        <td class="px-3 py-2 text-right font-bold text-slate-900">${Math.round(hist.volumes_actual_kg.total[idx] / 1000).toLocaleString()} MT</td>
                        <td class="px-3 py-2 text-right font-bold ${hist.realization_rates_pct.total[idx] < 70 ? 'text-amber-700' : 'text-emerald-700'}">${hist.realization_rates_pct.total[idx]}%</td>
                        <td class="px-3 py-2 text-right text-red-600">${hist.farmers.nc[idx]}</td>
                    </tr>
                `).join('')}
                <tr class="bg-slate-100/80 font-bold border-t-2 border-slate-300">
                    <td class="px-4 py-2 font-sans">5-Year Average</td>
                    <td class="px-3 py-2 text-right">1,628</td>
                    <td class="px-3 py-2 text-right">1,353</td>
                    <td class="px-3 py-2 text-right text-emerald-800">82.4%</td>
                    <td class="px-3 py-2 text-right">3,873 MT</td>
                    <td class="px-3 py-2 text-right">2,712 MT</td>
                    <td class="px-3 py-2 text-right text-emerald-800">71.4%</td>
                    <td class="px-3 py-2 text-right text-red-700">372</td>
                </tr>
            </tbody>
        </table>
    `;

    const el = document.getElementById('historicalTableContainer');
    if (el) el.innerHTML = html;
}

// 5. Render Transition & Incentive Schedule Table
function renderTransitionTable(sc) {
    const years = sc.years;
    const isUSD = currentUnitCurrency === 'USD';
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const tipCell = (valStr, title, calc, formula, why, extraClass = '') => `
        <td class="px-3 py-1.5 text-right cursor-help hover:bg-amber-100/60 transition-colors ${extraClass}"
            data-ftitle="${esc(title)}"
            data-fcalc="${esc(calc)}"
            data-fexcel="${esc(formula)}"
            data-fwhy="${esc(why)}">
            <span class="border-b border-dotted border-slate-300">${valStr}</span>
        </td>`;

    const buildIncCells = (stageLabel, fArr, usdArr, rateKhr) => usdArr.map((v, idx) => {
        const cnt = fArr[idx];
        const eligKg = cnt * 1768;
        const valRounded = Math.round(v);
        return tipCell(
            `$${valRounded.toLocaleString()}`,
            `${stageLabel} Incentive • ${years[idx]}`,
            `${cnt.toLocaleString()} farmers × 1,768 kg (40% of 4,420 kg) × ${rateKhr} KHR ÷ 4,100 = $${valRounded.toLocaleString()}`,
            `=ROUND( ${stageLabel} Farmers × 4,420 kg × 40% × ${rateKhr} KHR ÷ 4,100, 0 )`,
            `Why: Conservation incentive covers 40% of total farm production across all varieties at ${rateKhr} KHR/kg.`
        );
    }).join('');

    let html = `
        <table class="w-full text-xs text-left">
            <thead class="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                <tr>
                    <th class="px-4 py-3">Incentive Metric</th>
                    ${years.map(y => `<th class="px-3 py-3 text-right">${y}</th>`).join('')}
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-mono">
                ${renderTableRow("Transition Year 0 (WF) Farmers", sc.farmers.transition_yr0)}
                ${renderTableRow("Transition Year 1 (Ibis I) Farmers", sc.farmers.transition_yr1)}
                ${renderTableRow("Transition Year 2 (Ibis II) Farmers", sc.farmers.transition_yr2)}
                ${renderTableRow("Yr 0 Total Farm Production (kg)", sc.part2_transition_volumes_kg.yr0_wf_volume)}
                ${renderTableRow("Yr 1 Total Farm Production (kg)", sc.part2_transition_volumes_kg.yr1_volume)}
                ${renderTableRow("Yr 2 Total Farm Production (kg)", sc.part2_transition_volumes_kg.yr2_volume)}
                <tr class="bg-slate-50 font-bold">
                    <td class="px-4 py-1.5 font-sans">Total Transition Production (kg)</td>
                    ${sc.part2_transition_volumes_kg.combined_volume.map(v => `<td class="px-3 py-1.5 text-right">${v.toLocaleString()}</td>`).join('')}
                </tr>
                ${renderTableRow("Eligible 40% Incentive Volume (kg)", sc.part2_transition_volumes_kg.combined_volume.map((v, idx) => idx === 0 ? (sc.farmers.transition_yr0[0] + sc.farmers.transition_yr1[0] + sc.farmers.transition_yr2[0]) * 1768 : Math.round(v * 0.40)))}
                <tr><td class="px-4 py-1.5 font-sans text-slate-600">Yr 0 Incentive @ 200 KHR/kg (USD)</td>${buildIncCells("WF (Yr 0)", sc.farmers.transition_yr0, sc.incentive_commitments.yr0_incentive_usd, 200)}</tr>
                <tr><td class="px-4 py-1.5 font-sans text-slate-600">Yr 1 Incentive @ 200 KHR/kg (USD)</td>${buildIncCells("Ibis I (Yr 1)", sc.farmers.transition_yr1, sc.incentive_commitments.yr1_incentive_usd, 200)}</tr>
                <tr><td class="px-4 py-1.5 font-sans text-slate-600">Yr 2 Incentive @ 250 KHR/kg (USD)</td>${buildIncCells("Ibis II (Yr 2)", sc.farmers.transition_yr2, sc.incentive_commitments.yr2_incentive_usd, 250)}</tr>
                <tr class="bg-amber-50 font-bold text-amber-900 border-t border-b border-amber-200">
                    <td class="px-4 py-2 font-sans">Total Incentive Commitment (${isUSD ? 'USD' : 'Million KHR'})</td>
                    ${sc.incentive_commitments.total_incentive_usd.map((v, idx) => {
                        const y0 = Math.round(sc.incentive_commitments.yr0_incentive_usd[idx]);
                        const y1 = Math.round(sc.incentive_commitments.yr1_incentive_usd[idx]);
                        const y2 = Math.round(sc.incentive_commitments.yr2_incentive_usd[idx]);
                        const totUsd = Math.round(v);
                        const disp = isUSD ? `$${totUsd.toLocaleString()}` : `${Math.round(sc.incentive_commitments.total_incentive_khr[idx] / 1000000)}M KHR`;
                        return tipCell(
                            disp,
                            `Total Incentive • ${years[idx]}`,
                            `$${y0.toLocaleString()} (WF) + $${y1.toLocaleString()} (Ibis I) + $${y2.toLocaleString()} (Ibis II) = $${totUsd.toLocaleString()}`,
                            `=ROUND( WF Incentive + Ibis I Incentive + Ibis II Incentive, 0 )`,
                            `Why: Annual conservation incentive budget required to support active transition farmers.`,
                            'py-2'
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

// 6. Export Forecast Table (exact visible table data) as CSV or Excel
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

function exportMasterTableCSV() {
    const table = document.querySelector('#masterTableContainer table');
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
    triggerFileDownload(blob, 'IRCC_Paddy_Purchase_Forecast_2026_2033.csv');
}

function exportMasterTableExcel() {
    const table = document.querySelector('#masterTableContainer table');
    if (!table) return;

    const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let rowsHtml = '';
    table.querySelectorAll('tr').forEach((tr, rIdx) => {
        const isHeader = rIdx === 0;
        const cells = Array.from(tr.querySelectorAll('th, td'));
        const isSection = cells.length === 1 && cells[0].hasAttribute('colspan');
        const rowText = cells[0]?.textContent || '';

        let bg = '#ffffff';
        let weight = 'normal';
        let color = '#1e293b';
        if (isHeader) { bg = '#15803d'; color = '#ffffff'; weight = 'bold'; }
        else if (isSection) { bg = '#f1f5f9'; weight = 'bold'; color = '#0f172a'; }
        else if (rowText.includes('Total Organic Volume')) { bg = '#dcfce7'; weight = 'bold'; color = '#14532d'; }
        else if (rowText.includes('Combined Transition Production')) { bg = '#dbeafe'; weight = 'bold'; color = '#1e3a8a'; }
        else if (rowText.includes('Total Pipeline Farmers')) { bg = '#fef3c7'; weight = 'bold'; color = '#78350f'; }
        else if (rowText.includes('Total Active Farmers')) { bg = '#f1f5f9'; weight = 'bold'; color = '#0f172a'; }

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
                    <x:Name>Paddy Forecast 2026-2033</x:Name>
                    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>
            </xml><![endif]-->
        </head>
        <body style="font-family:Calibri,Arial,sans-serif;font-size:11pt;">
            <table>
                <tr><td colspan="9" style="font-size:13pt;font-weight:bold;color:#15803d;padding:6px 4px;">Ibis Rice Conservation Company (IRCC) — Paddy Purchase &amp; Farmer Forecast (2026 - 2033)</td></tr>
                ${rowsHtml}
            </table>
        </body>
        </html>`;

    const blob = new Blob([excelDoc], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    triggerFileDownload(blob, 'IRCC_Paddy_Purchase_Forecast_2026_2033.xls');
}

