<script>
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';

  let chartCanvas;
  let chartCanvas2;
  let labels = ['January', 'February', 'March', 'April', 'May', 'June'];
  let data = {
    labels: labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  let config = {
    type: 'line',
    data: data,
    options: { maintainAspectRatio: false },
  };

  onMount(() => {
    const myChart = new Chart(chartCanvas, config);
    const myChart2 = new Chart(chartCanvas2, config);
  });
</script>

<div class="flex max-w-screen-lg flex-wrap">
  <div class="flex-1 p-4 min-w-[300px] min-h-[300px]">
    <canvas bind:this={chartCanvas} aria-label="chart" />
  </div>
  <div class="flex-1 p-4 min-w-[300px] min-h-[300px]">
    <canvas bind:this={chartCanvas2} aria-label="chart" />
  </div>
</div>
