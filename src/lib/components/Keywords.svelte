<script>
  import autoComplete from '@tarekraafat/autocomplete.js';
  import { onMount } from 'svelte';

  let name = '';

  onMount(async () => {
    const res = await fetch(`/api/keyword`);
    let keywords = await res.json();

    const autoCompleteJS = new autoComplete({
      placeHolder: 'Search for Food...',
      data: {
        src: keywords,
        keys: ['name'],
        cache: true,
      },
      resultItem: {
        highlight: true,
      },
      events: {
        input: {
          selection: (event) => {
            const selection = event.detail.selection.value;
            name = selection.name;
          },
        },
      },
    });
  });
</script>

<div class="p-3 flex justify-center">
  <input bind:value={name} id="autoComplete" />
</div>
