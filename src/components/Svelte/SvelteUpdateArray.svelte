<script>
  import Button from '@/components/Button/Button.svelte';
  import SvelteStack from './SvelteStack.svelte';

  let numbers = $state([1, 2, 3]);
  let sum = $derived(numbers.reduce((acc, cur) => acc + cur, 0));

  const onclick = () => {
    // 更新される変数の名前は、代入の左側に置かなければならない。
    numbers = [...numbers, numbers[numbers.length - 1] + 1];
  };
</script>

<SvelteStack>
  <Button {onclick} label="Add a number" />
  <p>{numbers.join(' + ')} = {sum}</p>
</SvelteStack>
