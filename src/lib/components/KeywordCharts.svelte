<script>
  import { onMount } from 'svelte';

  let articleCanvas;
  let commentCanvas;

  let articleLabels = [];
  let articleData = [];

  let commentLabels = [];
  let commentData = [];

  export let keywordData;

  onMount(() => {
    for (let newspaper of keywordData.articleDistr) {
      articleLabels = [
        ...articleLabels,
        newspaper.name.charAt(0).toUpperCase() + newspaper.name.slice(1),
      ];
    }

    for (let newspaper of keywordData.articleDistr) {
      articleData = [...articleData, newspaper.count];
    }

    for (let newspaper of keywordData.commentDistr) {
      commentLabels = [
        ...commentLabels,
        newspaper.name.charAt(0).toUpperCase() + newspaper.name.slice(1),
      ];
    }

    for (let newspaper of keywordData.commentDistr) {
      commentData = [...commentData, newspaper.count];
    }

    new Chart(articleCanvas, {
      type: 'bar',
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
          legend: false,
        },
        maintainAspectRatio: false,
      },
    });

    new Chart(commentCanvas, {
      type: 'bar',
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
          legend: false,
        },
        maintainAspectRatio: false,
      },
    });
  });
</script>

<div class="flex max-w-screen-lg flex-wrap">
  <div class="flex-1 p-2 min-w-[300px] min-h-[300px]">
    <canvas bind:this={articleCanvas} aria-label="articleChart" />
  </div>
  <div class="flex-1 p-2 min-w-[300px] min-h-[300px]">
    <canvas bind:this={commentCanvas} aria-label="commentChart" />
  </div>
</div>
