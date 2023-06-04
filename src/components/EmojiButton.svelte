<!-- /sveltekit-app/src/components/EmojiButton.svelte -->

<script>
  export let emoji;
  export let active = false;
  export let onClick;
  
  function handleClick() {
    onClick(emoji);
  }
</script>

<button
  class="flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  class:active="active"
  on:click={handleClick}
>
  <span class="sr-only">{emoji} emoji button</span>
  <span class="text-2xl">{emoji}</span>
</button>