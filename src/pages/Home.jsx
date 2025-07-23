import { useEffect, useState } from "react";
import {
  fetchPokemonList,
  fetchPokemonByUrl,
  fetchPokemonByName,
  fetchSpecies,
} from "../services/pokeApi";

import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [generationFilter, setGenerationFilter] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchPokemonList(200);
      const detailed = await Promise.all(
        data.map(async (p) => await fetchPokemonByUrl(p.url))
      );
      setPokemonList(detailed);
      setFiltered(detailed);
    };
    load();
  }, []);
  
  const handleSearch = async (value) => {
    if (value.trim() === "") {
      setFiltered(pokemonList);
      setCurrentPage(1);
      return;
    }

    const input = value.toLowerCase();
    const exact = await fetchPokemonByName(input);

    const partialMatches = pokemonList.filter((p) =>
      p.name.toLowerCase().includes(input)
    );

    if (exact) {
      const alreadyIncluded = partialMatches.some((p) => p.name === exact.name);
      const newList = alreadyIncluded
        ? partialMatches
        : [exact, ...partialMatches];
      setFiltered(newList);
    } else {
      setFiltered(partialMatches);
    }

    setCurrentPage(1);
  };

  useEffect(() => {
    const applyFilters = async () => {
      let data = [...pokemonList];

      if (typeFilter) {
        data = data.filter((p) =>
          p.types.some((t) => t.type.name === typeFilter)
        );
      }

      if (generationFilter) {
        const filteredByGen = [];

        for (const p of data) {
          const species = await fetchSpecies(p.name);
          if (species.generation.name === generationFilter) {
            filteredByGen.push(p);
          }
        }

        data = filteredByGen;
      }

      setFiltered(data);
      setCurrentPage(1);
    };

    applyFilters();
  }, [typeFilter, generationFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedList = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar de filtros */}
      <Sidebar
        onFilter={({ type, generation }) => {
          setTypeFilter(type);
          setGenerationFilter(generation);
        }}
      />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden pokedex-bg-animated">
          <div className="blob red"></div>
  <div className="blob blue"></div>
  <div className="blob purple"></div>
        {/* Cabecera y buscador */}
        <div className="shrink-0">
          <h1 className="text-3xl font-bold text-center mb-4">📘 Pokédex</h1>
<div className="div-buscador">
        <SearchBar onSearch={handleSearch} />
          <div className="items-per-page-container">
  <label className="items-per-page-label">Pokémon por página:</label>
  <select
    value={itemsPerPage}
    onChange={(e) => {
      setItemsPerPage(parseInt(e.target.value));
      setCurrentPage(1);
    }}
    className="items-per-page-select"
  >
    <option value={10}>10</option>
    <option value={20}>20</option>
    <option value={50}>50</option>
    <option value={100}>100</option>
  </select>
</div>

</div>
  
        </div>

        {/* Scroll elegante y tarjetas con aparición progresiva */}
<div className="flex-1 overflow-hidden scroll-fade-wrapper">
  <div className="h-full overflow-y-auto px-1 card-scroll">
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      style={{ gap: "40px 0px" }}
    >
      {paginatedList.length > 0 ? (
        paginatedList.map((p) => (
          <div className="fade-card" key={p.name}>
            <PokemonCard pokemon={p} />
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No se encontró ningún Pokémon.
        </p>
      )}
    </div>
  </div>
</div>

        {/* Paginación fija abajo */}
        <div className="shrink-0">
  {totalPages > 1 && (
    <div className="pagination-container">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="pagination-button"
      >
        ⬅️ Anterior
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`pagination-number ${
            currentPage === index + 1 ? "active" : ""
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="pagination-button"
      >
        Siguiente ➡️
      </button>
    </div>
  )}
</div>

      </div>
    </div>
  );
}

export default Home;
