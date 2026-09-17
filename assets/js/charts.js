let revenueChartInstance = null;
let trafficChartInstance = null;

const chartDataSets = {
  '7d': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    revenue: [4200, 5100, 4800, 6200, 7500, 8100, 9400],
    traffic: [40, 25, 20, 15]
  },
  '30d': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    revenue: [28400, 32100, 29800, 38130],
    traffic: [45, 25, 18, 12]
  },
  '1y': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [85000, 92000, 105000, 112000, 120000, 128430, 135000, 142000, 150000, 158000, 165000, 178000],
    traffic: [50, 20, 18, 12]
  }
};

function initCharts() {
  const revCtx = document.getElementById('revenueChart')?.getContext('2d');
  const trafCtx = document.getElementById('trafficChart')?.getContext('2d');

  if (!revCtx || !trafCtx) return;

  revenueChartInstance = new Chart(revCtx, {
    type: 'line',
    data: {
      labels: chartDataSets['30d'].labels,
      datasets: [{
        label: 'Revenue ($)',
        data: chartDataSets['30d'].revenue,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4f46e5',
        pointRadius: 4,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });

  trafficChartInstance = new Chart(trafCtx, {
    type: 'doughnut',
    data: {
      labels: ['Organic', 'Direct', 'Social', 'Referral'],
      datasets: [{
        data: chartDataSets['30d'].traffic,
        backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'],
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } }
    }
  });
}

function updateChartData(timeframe) {
  if (!revenueChartInstance || !trafficChartInstance) return;

  const selectedData = chartDataSets[timeframe];

  revenueChartInstance.data.labels = selectedData.labels;
  revenueChartInstance.data.datasets[0].data = selectedData.revenue;
  revenueChartInstance.update();

  trafficChartInstance.data.datasets[0].data = selectedData.traffic;
  trafficChartInstance.update();
}