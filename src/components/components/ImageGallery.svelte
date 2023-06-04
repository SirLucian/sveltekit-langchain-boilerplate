<!-- /src/components/ImageGallery.svelte -->

<script>
  import { onMount } from 'svelte';
  import { getImages } from '../utils/api'; // assuming we have a function to get the generated images from the API

  let images = [];

  onMount(async () => {
    images = await getImages(); // get the generated images from the API
  });
</script>

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {#each images as image}
    <div class="relative">
      <img src={image.url} alt={image.prompt} class="w-full h-full object-cover rounded-lg shadow-md">
      <div class="absolute inset-0 bg-black opacity-0 hover:opacity-75 transition-opacity duration-300">
        <p class="text-white text-center absolute inset-0 flex items-center justify-center">{image.prompt}</p>
      </div>
    </div>
  {/each}
</div> 

<!-- This component displays the generated images in a gallery format. It uses the `getImages` function from the `utils/api.js` file to get the generated images from the API. It then loops through the `images` array and displays each image with its corresponding prompt in a grid format. The `hover` effect on each image displays the prompt in the center of the image when hovered over. -->