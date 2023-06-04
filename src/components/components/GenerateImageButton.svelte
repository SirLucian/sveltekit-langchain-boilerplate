<!-- /src/components/GenerateImageButton.svelte -->

<script>
  import { generateImage } from '../utils/imageGeneration';
  import { modal } from 'sveltemodal';
  
  let prompt = '';
  let vibe = '';
  
  async function handleClick() {
    const response = await generateImage(prompt, vibe);
    modal.open(`<img src="${response.url}" alt="${prompt}"/>`);
  }
</script>

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={handleClick}>
  Generate Image
</button>

<style>
  button {
    margin-top: 1rem;
  }
</style>