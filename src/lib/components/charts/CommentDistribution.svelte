<script>
  import Chart from 'chart.js/auto/auto.js';
  import { onMount } from 'svelte';

  let chartCanvas;

  let labels = [];
  let data = [];

  onMount(async () => {
    const res = await fetch(`/api/commentDistribution`);
    let distriution = await res.json();

    for (let newspaper of distriution.newspapers) {
      labels = [
        ...labels,
        newspaper.name.charAt(0).toUpperCase() + newspaper.name.slice(1),
      ];
    }

    for (let newspaper of distriution.newspapers) {
      data = [...data, newspaper.count];
    }

    new Chart(chartCanvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Kommentare nach Zeitung',
          },
        },
        maintainAspectRatio: false,
      },
    });
  });
</script>

<div class="flex-1 p-3 min-w-[300px] min-h-[300px]">
  <canvas bind:this={chartCanvas} aria-label="chart" />
</div>
