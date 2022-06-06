<script>
  import autoComplete from '@tarekraafat/autocomplete.js';
  import { onMount } from 'svelte';
  import KeywordCharts from './KeywordCharts.svelte';

  let value = '';
  let keywords;
  let keywordData;

  onMount(async () => {
    const res = await fetch(`/api/keyword`);
    keywords = await res.json();

    const autoCompleteJS = new autoComplete({
      placeHolder: 'Suche nach Keyword',
      data: {
        src: keywords,
        cache: true,
      },
      resultItem: {
        highlight: true,
      },
      events: {
        input: {
          selection: (event) => {
            value = event.detail.selection.value;
          },
        },
      },
    });
  });

  const handleClick = async () => {
    keywordData = undefined;
    const res = await fetch(`/api/keywordData?name=${value}`);
    keywordData = await res.json();
  };
</script>

<div class="mt-3 p-3 flex justify-center">
  <input bind:value id="autoComplete" />
  <button
    on:click={handleClick}
    class="bg-neutral-800 p-2 rounded ml-3 tracking-widest hover:bg-neutral-700"
    >Metriken anzeigen</button
  >
</div>
{#if keywordData}
  <div class="flex justify-between text-center w-full py-3">
    <div class="flex-1 py-2">
      <div class="text-xl font-semibold">{keywordData.articleCount}</div>
      <div class="text-neutral-500 text-sm">Artikel</div>
    </div>
    <div class="flex-1 py-2 border-x border-neutral-600">
      <div class="text-xl font-semibold">{keywordData.commentCount}</div>
      <div class="text-neutral-500 text-sm">Kommentare</div>
    </div>
    <div class="flex-1 py-2">
      <div class="text-xl font-semibold">
        {keywordData.commentsPerArticle.toFixed(2)}
      </div>
      <div class="text-neutral-500 text-sm">Kommentare pro Artikel</div>
    </div>
  </div>
  <KeywordCharts {keywordData} />
{/if}
