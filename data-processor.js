// Data Utility for CSV Processing and Chart Generation
class DataProcessor {
    constructor() {
        this.cache = new Map();
    }

    // Utility to parse CSV data
    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = [];
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const row = {};
            headers.forEach((header, index) => {
                const value = values[index];
                // Try to parse as number, otherwise keep as string
                row[header] = isNaN(value) ? value : parseFloat(value);
            });
            data.push(row);
        }
        
        return { headers, data };
    }

    // Load CSV data from file
    async loadCSV(filepath) {
        if (this.cache.has(filepath)) {
            return this.cache.get(filepath);
        }

        try {
            const response = await fetch(filepath);
            const csvText = await response.text();
            const parsed = this.parseCSV(csvText);
            this.cache.set(filepath, parsed);
            return parsed;
        } catch (error) {
            console.error(`Error loading CSV from ${filepath}:`, error);
            return { headers: [], data: [] };
        }
    }

    // Generate Revenue Chart from P&L data
    async generateRevenueChart(canvasId) {
        const plData = await this.loadCSV('data/pl_projections.csv');
        
        // Check if Chart.js is available, otherwise use fallback
        if (typeof Chart !== 'undefined') {
            const ctx = document.getElementById(canvasId).getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: plData.data.map(row => row.Year),
                    datasets: [
                        {
                            label: 'Revenue (₹ Lakhs)',
                            data: plData.data.map(row => row.Revenue),
                            borderColor: '#0d9488',
                            backgroundColor: 'rgba(13, 148, 136, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'EBITDA (₹ Lakhs)',
                            data: plData.data.map(row => row.EBITDA),
                            borderColor: '#1e40af',
                            backgroundColor: 'rgba(30, 64, 175, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'PAT (₹ Lakhs)',
                            data: plData.data.map(row => row.PAT),
                            borderColor: '#059669',
                            backgroundColor: 'rgba(5, 150, 105, 0.1)',
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: '7-Year Financial Projections',
                            color: '#f8fafc',
                            font: { size: 16, weight: 'bold' }
                        },
                        legend: {
                            labels: { color: '#f8fafc' }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: '#334155' },
                            ticks: { color: '#cbd5e1' }
                        },
                        y: {
                            grid: { color: '#334155' },
                            ticks: { 
                                color: '#cbd5e1',
                                callback: function(value) {
                                    return '₹' + value + 'L';
                                }
                            }
                        }
                    }
                }
            });
        } else {
            // Fallback to simple chart
            const chart = new SimpleChart(canvasId, 'line');
            chart.drawLine({
                labels: plData.data.map(row => row.Year),
                datasets: [
                    {
                        label: 'Revenue',
                        data: plData.data.map(row => row.Revenue)
                    },
                    {
                        label: 'EBITDA',
                        data: plData.data.map(row => row.EBITDA)
                    },
                    {
                        label: 'PAT',
                        data: plData.data.map(row => row.PAT)
                    }
                ]
            }, { title: '7-Year Financial Projections' });
        }
    }

    // Generate DSCR Chart
    async generateDSCRChart(canvasId) {
        const dscrData = await this.loadCSV('data/dscr_data.csv');
        
        if (typeof Chart !== 'undefined') {
            const ctx = document.getElementById(canvasId).getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dscrData.data.map(row => row.Year),
                    datasets: [
                        {
                            label: 'DSCR Ratio',
                            data: dscrData.data.map(row => row.DSCR),
                            backgroundColor: dscrData.data.map(row => 
                                row.DSCR >= 1.25 ? 'rgba(5, 150, 105, 0.8)' : 'rgba(245, 158, 11, 0.8)'
                            ),
                            borderColor: dscrData.data.map(row => 
                                row.DSCR >= 1.25 ? '#059669' : '#f59e0b'
                            ),
                            borderWidth: 2
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Debt Service Coverage Ratio (DSCR) Analysis',
                            color: '#f8fafc',
                            font: { size: 16, weight: 'bold' }
                        },
                        legend: {
                            labels: { color: '#f8fafc' }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: '#334155' },
                            ticks: { color: '#cbd5e1' }
                        },
                        y: {
                            grid: { color: '#334155' },
                            ticks: { color: '#cbd5e1' },
                            min: 0,
                            max: Math.max(...dscrData.data.map(row => row.DSCR)) + 1
                        }
                    }
                }
            });
        } else {
            // Fallback to simple chart
            const chart = new SimpleChart(canvasId, 'bar');
            chart.drawBar({
                labels: dscrData.data.map(row => row.Year),
                datasets: [
                    {
                        label: 'DSCR Ratio',
                        data: dscrData.data.map(row => row.DSCR)
                    }
                ]
            }, { title: 'Debt Service Coverage Ratio (DSCR) Analysis' });
        }
    }

    // Generate Balance Sheet Chart
    async generateBalanceSheetChart(canvasId) {
        const bsData = await this.loadCSV('data/balance_sheet_projections.csv');
        
        if (typeof Chart !== 'undefined') {
            const ctx = document.getElementById(canvasId).getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: bsData.data.map(row => row.Year),
                    datasets: [
                        {
                            label: 'Total Assets (₹ Lakhs)',
                            data: bsData.data.map(row => row['Total Assets']),
                            borderColor: '#0d9488',
                            backgroundColor: 'rgba(13, 148, 136, 0.1)',
                            fill: false,
                            tension: 0.4
                        },
                        {
                            label: 'Partners Capital (₹ Lakhs)',
                            data: bsData.data.map(row => row['Partners Capital']),
                            borderColor: '#1e40af',
                            backgroundColor: 'rgba(30, 64, 175, 0.1)',
                            fill: false,
                            tension: 0.4
                        },
                        {
                            label: 'Term Loans (₹ Lakhs)',
                            data: bsData.data.map(row => row['Term Loans']),
                            borderColor: '#dc2626',
                            backgroundColor: 'rgba(220, 38, 38, 0.1)',
                            fill: false,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Balance Sheet Projections',
                            color: '#f8fafc',
                            font: { size: 16, weight: 'bold' }
                        },
                        legend: {
                            labels: { color: '#f8fafc' }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: '#334155' },
                            ticks: { color: '#cbd5e1' }
                        },
                        y: {
                            grid: { color: '#334155' },
                            ticks: { 
                                color: '#cbd5e1',
                                callback: function(value) {
                                    return '₹' + value + 'L';
                                }
                            }
                        }
                    }
                }
            });
        } else {
            // Fallback to simple chart
            const chart = new SimpleChart(canvasId, 'line');
            chart.drawLine({
                labels: bsData.data.map(row => row.Year),
                datasets: [
                    {
                        label: 'Total Assets',
                        data: bsData.data.map(row => row['Total Assets'])
                    },
                    {
                        label: 'Partners Capital',
                        data: bsData.data.map(row => row['Partners Capital'])
                    },
                    {
                        label: 'Term Loans',
                        data: bsData.data.map(row => row['Term Loans'])
                    }
                ]
            }, { title: 'Balance Sheet Projections', colors: ['#0d9488', '#1e40af', '#dc2626'] });
        }
    }

    // Generate Machinery Breakdown Chart
    async generateMachineryChart(canvasId) {
        const machineryData = await this.loadCSV('data/machinery_breakdown.csv');
        
        if (typeof Chart !== 'undefined') {
            const ctx = document.getElementById(canvasId).getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: machineryData.data.map(row => row.Component),
                    datasets: [{
                        data: machineryData.data.map(row => row['Cost (₹ Lakhs)']),
                        backgroundColor: [
                            '#0d9488',
                            '#1e40af',
                            '#059669',
                            '#f59e0b',
                            '#dc2626',
                            '#8b5cf6'
                        ],
                        borderColor: '#1e293b',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Machinery Cost Breakdown',
                            color: '#f8fafc',
                            font: { size: 16, weight: 'bold' }
                        },
                        legend: {
                            labels: { color: '#f8fafc' },
                            position: 'bottom'
                        }
                    }
                }
            });
        } else {
            // Fallback to simple chart
            const chart = new SimpleChart(canvasId, 'doughnut');
            chart.drawDoughnut({
                labels: machineryData.data.map(row => row.Component),
                datasets: [{
                    data: machineryData.data.map(row => row['Cost (₹ Lakhs)'])
                }]
            }, { title: 'Machinery Cost Breakdown' });
        }
    }

    // Update financial metrics in dashboard
    async updateDashboardMetrics() {
        try {
            const plData = await this.loadCSV('data/pl_projections.csv');
            const dscrData = await this.loadCSV('data/dscr_data.csv');
            const machineryData = await this.loadCSV('data/machinery_breakdown.csv');

            // Calculate totals
            const totalRevenue = plData.data.reduce((sum, row) => sum + row.Revenue, 0);
            const avgDSCR = dscrData.data.reduce((sum, row) => sum + row.DSCR, 0) / dscrData.data.length;
            const totalMachineryCost = machineryData.data.reduce((sum, row) => sum + row['Cost (₹ Lakhs)'], 0);
            
            // Update dashboard cards (if they exist)
            const revenueCard = document.querySelector('.metric-card h3');
            if (revenueCard && totalRevenue) {
                revenueCard.textContent = `₹${(totalRevenue/100).toFixed(1)} Cr`;
            }

            console.log('Dashboard updated with real data:', {
                totalRevenue: totalRevenue + ' Lakhs',
                avgDSCR: avgDSCR.toFixed(2),
                machineryCost: totalMachineryCost + ' Lakhs'
            });

        } catch (error) {
            console.error('Error updating dashboard metrics:', error);
        }
    }
}

// Export for use in other scripts
window.DataProcessor = DataProcessor;