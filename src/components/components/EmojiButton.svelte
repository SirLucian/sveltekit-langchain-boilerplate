<!-- /src/components/EmojiButton.svelte -->

<script>
  export let emoji;
  export let onClick;
</script>

<button class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none" on:click={onClick}>
  <span class="text-2xl">{emoji}</span>
</button>

<style>
  button {
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #e5e7eb;
  }
</style>