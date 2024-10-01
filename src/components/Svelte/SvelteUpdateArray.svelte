<script>
  import Button from '@/components/Button/Button.svelte';
  import SvelteStack from './SvelteStack.svelte';

  let numbers = [1, 2, 3];

  $: sum = numbers.reduce((acc, cur) => acc + cur, 0);

  const handleClick = () => {
    // 更新される変数の名前は、代入の左側に置かなければならない。
    numbers = [...numbers, numbers[numbers.length - 1] + 1];
  };
</script>

<SvelteStack>
  <Button on:click={handleClick} label="Add a number" />
  <p>{numbers.join(' + ')} = {sum}</p>
</SvelteStack>
