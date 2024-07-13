<script lang="ts">
  import { onMount } from 'svelte';
  import Controller from '$lib/canvas/Controller';

  let canvasContainer: HTMLDivElement;

  onMount(() => {
    Controller.init(canvasContainer);

    return () => Controller.destroy()
  });
</script>

<main>
  <div bind:this={canvasContainer}></div>
</main>
