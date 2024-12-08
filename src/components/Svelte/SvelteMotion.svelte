<script>
  import { circInOut } from 'svelte/easing';
  import { Tween } from 'svelte/motion';
  import Button from '@/components/Button/Button.svelte';
  import SvelteStack from './SvelteStack.svelte';

  let isMoving = false;

  const progress = new Tween(0, {
    duration: 300,
    easing: circInOut,
  });

  const set = (value) => {
    isMoving = true;
    progress.set(value).then(() => {
      isMoving = false;
    });
  };
</script>

<SvelteStack>
  <p>{isMoving ? 'move' : 'stop'}</p>
  <progress value={progress.current}></progress>
  <div class="buttons">
    <Button onclick={() => set(0)} label="0" />
    <Button onclick={() => set(0.5)} label="50" />
    <Button onclick={() => set(1)} label="100" />
  </div>
</SvelteStack>
