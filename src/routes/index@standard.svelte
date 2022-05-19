<script context="module">
  export async function load({ fetch }) {
    const response = await fetch('/api/count');

    return {
      status: response.status,
      props: {
        simpleMetrics: response.ok && (await response.json()),
      },
    };
  }
</script>

<script>
  import Charts from '$lib/components/Charts.svelte';

  export let simpleMetrics;
</script>

<div class="max-w-screen-lg mx-auto p-2">
  <div class="flex justify-between text-center w-full py-3">
    <div class="flex-1 py-2">
      <div class="text-xl font-semibold">{simpleMetrics.articleCount}</div>
      <div class="text-neutral-500 text-sm">Artikel</div>
    </div>
    <div class="flex-1 py-2 border-x border-neutral-600">
      <div class="text-xl font-semibold">{simpleMetrics.commentCount}</div>
      <div class="text-neutral-500 text-sm">Kommentare</div>
    </div>
    <div class="flex-1 py-2">
      <div class="text-xl font-semibold">
        {simpleMetrics.commentsPerArticle.toFixed(2)}
      </div>
      <div class="text-neutral-500 text-sm">Kommentare pro Artikel</div>
    </div>
  </div>
  <Charts />
</div>
