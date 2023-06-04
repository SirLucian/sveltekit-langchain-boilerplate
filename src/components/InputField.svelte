<!-- /sveltekit-app/src/components/InputField.svelte -->

<script>
  export let label = "";
  export let type = "text";
  export let placeholder = "";
  export let value = "";

  const handleChange = (event) => {
    value = event.target.value;
  };
</script>

<div class="flex flex-col">
  {#if label}
  <label class="text-gray-700 font-bold mb-2">{label}</label>
  {/if}
  <input
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type={type}
    placeholder={placeholder}
    value={value}
    on:input={handleChange}
  />
</div>