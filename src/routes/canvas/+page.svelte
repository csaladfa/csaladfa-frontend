<script lang="ts">
  import { onMount } from 'svelte';
  import Canvas from '$lib/canvas';

  let canvasContainer: HTMLDivElement;

  onMount(() => {
    Canvas.init(canvasContainer);

    return () => Canvas.destroy()
  });
</script>

<main>
  <div bind:this={canvasContainer}></div>
</main>
