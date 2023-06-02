<script lang="ts">
    import { enhance } from "$app/forms";
    let loading = false;
    let prompt = "";
    let count = 1;
    let error = false;
</script>

<style>
  .form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    margin-top: 2rem;
  }
</style>

<div class="form-container">

  <h1>WorldSeed</h1>

  <form action="?/generate" method="post" use:enhance={({ form, data, action, cancel, submitter }) => {
    loading = true;
    return async ({ result, update }) => {
      if(result.status === 200){
        prompt = result.data.prompt;
        console.log(prompt)
      } else {
        error = true;
      }
      loading = false;
    };
  }}>
    <input type="text" name="keyword">
    <input type="range" name="count" bind:value={count} min=1 max=3>
    <button  aria-busy={loading} type="submit">{loading ? "Please Wait..." : `Generate ${count} ${count === 0 ? ' Image' : " Images"}`}</button>
  </form>

  {#if prompt !== "" && !loading}

    <article>
      <h2>Prompts</h2>
      <p>{prompt}</p>
    </article>

  {/if}

  {#if error}
    <p>There was an error processing your request. Please try again.</p>
  {/if}
</div>