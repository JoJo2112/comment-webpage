<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export function load({ error, status }) {
    return {
      props: {
        status,
        error: error.message,
      },
    };
  }
</script>

<script>
  import '../app.css';
  export let status;
  export let error;
</script>

<div class="flex flex-col h-full justify-center items-center">
  <div class="flex items-center">
    <h1 class="p-3 border-r text-3xl">{status}</h1>
    <div class="p-3">
      <h1 class="text-xl font-light opacity-90">{error}</h1>
    </div>
  </div>
</div>
