<script lang="ts">
  import { onMount } from 'svelte';
  import { init } from '$lib/pixi';
  
  let canvasContainer: HTMLDivElement;

  onMount(async () => {
    const canvas = await init();
    canvasContainer.appendChild(canvas);
  });
</script>

<main>
  <div bind:this={canvasContainer}></div>
</main>
