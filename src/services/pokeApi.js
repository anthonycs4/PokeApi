const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  return data.results;
};

export const fetchPokemonByUrl = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

export const fetchPokemonByName = async (name) => {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

export async function fetchTypes() {
  const res = await fetch(`${BASE_URL}/type`);
  const data = await res.json();
  return data.results;
}

export async function fetchGenerations() {
  const res = await fetch(`${BASE_URL}/generation`);
  const data = await res.json();
  return data.results;
}

export async function fetchSpecies(name) {
  const res = await fetch(`${BASE_URL}/pokemon-species/${name}`);
  return await res.json();
}
