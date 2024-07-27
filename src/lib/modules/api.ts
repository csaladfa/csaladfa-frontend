import dummy from '$lib/assets/dummy.json';

export function getAll() {
  return dummy;
}

export function getById(id: number) {
  return dummy.find((item) => item.id === id);
}
