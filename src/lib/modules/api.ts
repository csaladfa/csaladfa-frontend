import dummy from '$lib/assets/dummy.json';

export function fetchAll() {
  return dummy;
}

export function fetchById(id: number) {
  return dummy.find((item) => item.id === id);
}
