<script>
  import Chart from 'chart.js/auto/auto.js';
  import { onMount } from 'svelte';

  let articleCanvas;
  let commentCanvas;

  let articleLabels = [];
  let articleData = [];

  let commentLabels = [];
  let commentData = [];

  onMount(async () => {
    const res = await fetch(`/api/distribution`);
    let distriution = await res.json();

    for (let newspaper of distriution.articleDistr) {
      articleLabels = [
        ...articleLabels,
        newspaper.name.charAt(0).toUpperCase() + newspaper.name.slice(1),
      ];
    }

    for (let newspaper of distriution.articleDistr) {
      articleData = [...articleData, newspaper.count];
    }

    for (let newspaper of distriution.commentDistr) {
      commentLabels = [
        ...commentLabels,
        newspaper.name.charAt(0).toUpperCase() + newspaper.name.slice(1),
      ];
    }

    for (let newspaper of distriution.commentDistr) {
      commentData = [...commentData, newspaper.count];
    }

    new Chart(articleCanvas, {
      type: 'pie',
      data: {
        labels: articleLabels,
        datasets: [
          {
            data: articleData,
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
            text: 'Artikel nach Zeitung',
          },
        },
        maintainAspectRatio: false,
      },
    });

    new Chart(commentCanvas, {
      type: 'pie',
      data: {
        labels: commentLabels,
        datasets: [
          {
            data: commentData,
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
            text: 'Artikel nach Kommentaren',
          },
        },
        maintainAspectRatio: false,
      },
    });
  });
</script>

<div class="flex-1 p-2 min-w-[300px] min-h-[300px]">
  <canvas bind:this={articleCanvas} aria-label="articleChart" />
</div>
<div class="flex-1 p-2 min-w-[300px] min-h-[300px]">
  <canvas bind:this={commentCanvas} aria-label="commentChart" />
</div>
