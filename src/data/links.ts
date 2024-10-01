const baseUrl = import.meta.env.BASE_URL;
const links = [
  { href: `${baseUrl}`, label: 'top' },
  { href: `${baseUrl}sample/`, label: 'sample' },
  { href: `${baseUrl}svelte/`, label: 'svelte' },
];

export default links;
