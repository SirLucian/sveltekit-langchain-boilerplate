<script>
  import { generateImage } from "../ImageGeneration.js";
  import { showModal } from "../Modal.svelte";

  async function handleGenerateImage() {
    const image = await generateImage();
    showModal(image);
  }
</script>

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={handleGenerateImage}>
  Generate Image
</button>