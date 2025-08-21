// Simple Chart Implementation - Fallback for Chart.js
class SimpleChart {
    constructor(canvasId, type = 'line') {
        this.canvas = document.getElementById(canvasId);
        this.type = type;
        if (!this.canvas) {
            console.error(`Canvas ${canvasId} not found`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.padding = 60;
    }

    drawLine(data, options = {}) {
        const { labels, datasets } = data;
        const { title = '', colors = ['#0d9488', '#1e40af', '#059669'] } = options;
        
        this.ctx.fillStyle = '#1e293b';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw title
        if (title) {
            this.ctx.fillStyle = '#f8fafc';
            this.ctx.font = 'bold 16px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(title, this.width / 2, 30);
        }

        const chartWidth = this.width - (this.padding * 2);
        const chartHeight = this.height - (this.padding * 2);
        const maxValue = Math.max(...datasets.flatMap(d => d.data));
        const minValue = Math.min(...datasets.flatMap(d => d.data));
        const valueRange = maxValue - minValue;

        // Draw grid
        this.ctx.strokeStyle = '#334155';
        this.ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let i = 0; i <= labels.length; i++) {
            const x = this.padding + (i * chartWidth / labels.length);
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.padding);
            this.ctx.lineTo(x, this.height - this.padding);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = this.padding + (i * chartHeight / 5);
            this.ctx.beginPath();
            this.ctx.moveTo(this.padding, y);
            this.ctx.lineTo(this.width - this.padding, y);
            this.ctx.stroke();
        }

        // Draw labels
        this.ctx.fillStyle = '#cbd5e1';
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'center';
        
        labels.forEach((label, i) => {
            const x = this.padding + (i * chartWidth / (labels.length - 1));
            this.ctx.fillText(label, x, this.height - 10);
        });

        // Draw y-axis labels
        this.ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const value = minValue + (valueRange * (5 - i) / 5);
            const y = this.padding + (i * chartHeight / 5);
            this.ctx.fillText('₹' + Math.round(value) + 'L', this.padding - 10, y + 5);
        }

        // Draw data lines
        datasets.forEach((dataset, datasetIndex) => {
            const color = colors[datasetIndex] || colors[0];
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();

            dataset.data.forEach((value, i) => {
                const x = this.padding + (i * chartWidth / (labels.length - 1));
                const y = this.padding + chartHeight - ((value - minValue) / valueRange * chartHeight);
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
                
                // Draw data points
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 4, 0, 2 * Math.PI);
                this.ctx.fill();
            });
            
            this.ctx.stroke();
        });

        // Draw legend
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'left';
        let legendY = 50;
        
        datasets.forEach((dataset, i) => {
            const color = colors[i] || colors[0];
            this.ctx.fillStyle = color;
            this.ctx.fillRect(20, legendY + (i * 20), 15, 10);
            this.ctx.fillStyle = '#f8fafc';
            this.ctx.fillText(dataset.label, 40, legendY + (i * 20) + 8);
        });
    }

    drawBar(data, options = {}) {
        const { labels, datasets } = data;
        const { title = '', colors = ['#0d9488'] } = options;
        
        this.ctx.fillStyle = '#1e293b';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw title
        if (title) {
            this.ctx.fillStyle = '#f8fafc';
            this.ctx.font = 'bold 16px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(title, this.width / 2, 30);
        }

        const chartWidth = this.width - (this.padding * 2);
        const chartHeight = this.height - (this.padding * 2);
        const maxValue = Math.max(...datasets[0].data);
        const barWidth = chartWidth / labels.length * 0.6;

        // Draw grid
        this.ctx.strokeStyle = '#334155';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = this.padding + (i * chartHeight / 5);
            this.ctx.beginPath();
            this.ctx.moveTo(this.padding, y);
            this.ctx.lineTo(this.width - this.padding, y);
            this.ctx.stroke();
        }

        // Draw bars
        const dataset = datasets[0];
        dataset.data.forEach((value, i) => {
            const x = this.padding + (i * chartWidth / labels.length) + (chartWidth / labels.length - barWidth) / 2;
            const barHeight = (value / maxValue) * chartHeight;
            const y = this.height - this.padding - barHeight;
            
            // Bar color based on value (DSCR example)
            const color = value >= 1.25 ? '#059669' : '#f59e0b';
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, barWidth, barHeight);
            
            // Value label on top
            this.ctx.fillStyle = '#f8fafc';
            this.ctx.font = '12px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(value.toFixed(2), x + barWidth/2, y - 5);
        });

        // Draw x-axis labels
        this.ctx.fillStyle = '#cbd5e1';
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'center';
        
        labels.forEach((label, i) => {
            const x = this.padding + (i * chartWidth / labels.length) + (chartWidth / labels.length) / 2;
            this.ctx.fillText(label, x, this.height - 10);
        });

        // Draw y-axis labels
        this.ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const value = (maxValue * (5 - i) / 5);
            const y = this.padding + (i * chartHeight / 5);
            this.ctx.fillText(value.toFixed(1), this.padding - 10, y + 5);
        }
    }

    drawDoughnut(data, options = {}) {
        const { labels, datasets } = data;
        const { title = '', colors = ['#0d9488', '#1e40af', '#059669', '#f59e0b', '#dc2626', '#8b5cf6'] } = options;
        
        this.ctx.fillStyle = '#1e293b';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw title
        if (title) {
            this.ctx.fillStyle = '#f8fafc';
            this.ctx.font = 'bold 16px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(title, this.width / 2, 30);
        }

        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(centerX, centerY) - 100;
        const innerRadius = radius * 0.6;
        
        const dataset = datasets[0];
        const total = dataset.data.reduce((sum, val) => sum + val, 0);
        let currentAngle = -Math.PI / 2;

        // Draw segments
        dataset.data.forEach((value, i) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            const color = colors[i] || colors[0];
            
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            this.ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Draw percentage labels
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelRadius = (radius + innerRadius) / 2;
            const labelX = centerX + Math.cos(labelAngle) * labelRadius;
            const labelY = centerY + Math.sin(labelAngle) * labelRadius;
            
            this.ctx.fillStyle = '#f8fafc';
            this.ctx.font = 'bold 12px sans-serif';
            this.ctx.textAlign = 'center';
            const percentage = ((value / total) * 100).toFixed(1);
            this.ctx.fillText(percentage + '%', labelX, labelY);
            
            currentAngle += sliceAngle;
        });

        // Draw legend
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'left';
        let legendY = 60;
        
        labels.forEach((label, i) => {
            const color = colors[i] || colors[0];
            this.ctx.fillStyle = color;
            this.ctx.fillRect(20, legendY + (i * 20), 15, 10);
            this.ctx.fillStyle = '#f8fafc';
            this.ctx.fillText(label + ': ₹' + dataset.data[i] + 'L', 40, legendY + (i * 20) + 8);
        });
    }
}

// Make available globally
window.SimpleChart = SimpleChart;