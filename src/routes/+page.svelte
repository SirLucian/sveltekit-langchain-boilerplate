<script>
  import { onMount } from 'svelte';

  let generationId = "";
  let prompt = "";
  let imageUrl = "";
  let tone = [
    'horrific',
    'seductive with regards to greed',
    'eery',
    'festive',
    'abandoned'
  ];

  const getImage = async (generationId) => {
    try {
      const response = await fetch(`api/generate`);
      const data = await response.json();
      imageUrl = data.output.image.url;
    } catch (error) {
      console.error(error);
    }
  };

  onMount(async () => {
    // Call the getImage function when the component is mounted
    await getImage(generationId);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    generationId = data.generationId;
    prompt = data.prompt;
    await getImage(generationId);
  };
</script>

<div class="form-container">
  <h1>WorldSeed</h1>

  <form on:submit="{handleSubmit}">
    <input type="text" name="keyword" />
    {#each tone as i}
      <label>
        <input type="checkbox" group={tone} value={i}>
        {i}
      </label>
    {/each}
    <button type="submit">Generate Image</button>
  </form>

  {#if prompt !== ""}
    <article>
      <h2>Prompts</h2>
      <p>{prompt}</p>
    </article>
  {/if}

  {#if imageUrl !== ""}
    <img src="{imageUrl}" alt="{prompt}" />
  {/if}
</div>