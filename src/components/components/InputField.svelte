<!-- /src/components/InputField.svelte -->

<script>
  export let placeholder = "Enter your keywords here";
  export let value = "";
  export let disabled = false;
  export let onInput = () => {};
</script>

<input
  type="text"
  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
  placeholder={placeholder}
  value={value}
  disabled={disabled}
  on:input={onInput}
> 

<style>
  input:focus {
    border-color: #2563EB;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
</style>