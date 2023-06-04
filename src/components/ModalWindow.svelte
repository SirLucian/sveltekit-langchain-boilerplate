<!-- /sveltekit-app/src/components/ModalWindow.svelte -->

<script>
  import { createEventDispatcher } from 'svelte';
  import Modal from 'sveltemodal';
  
  const dispatch = createEventDispatcher();
  
  export let imageUrl = '';
  
  function closeModal() {
    dispatch('close');
  }
</script>

<Modal on:close={closeModal}>
  <img src={imageUrl} alt="Generated Image" />
</Modal>