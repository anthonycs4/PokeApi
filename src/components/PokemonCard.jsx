import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importa esto
import "../css/PokemonCard.css";
import { fetchPokemonByUrl } from "../services/pokeApi";

export default function PokemonCard({ pokemon, pokemonUrl }) {
  const [loadedPokemon, setLoadedPokemon] = useState(null);
  const navigate = useNavigate(); // ✅ Y usa esto

  useEffect(() => {
    const load = async () => {
      if (pokemon) {
        setLoadedPokemon(pokemon);
      } else if (pokemonUrl) {
        const data = await fetchPokemonByUrl(pokemonUrl);
        setLoadedPokemon(data);
      }
    };
    load();
  }, [pokemon, pokemonUrl]);

  if (!loadedPokemon) return null;

  const primaryType = loadedPokemon.types[0].type.name;

  return (
    <div
      className={`card-container type-${primaryType} transition-transform hover:scale-105`}
      onClick={() => navigate(`/pokemon/${loadedPokemon.name}`)} // ✅ Corregido
    >
      <div className="card-inner">
        {/* ---------- LADO FRONTAL ---------- */}
        <div className="card-face card-front">
          <img
            src={loadedPokemon.sprites.front_default}
            alt={loadedPokemon.name}
            className="w-20 h-20 mb-2 drop-shadow-md"
          />
          <h2 className="capitalize font-bold text-white text-lg">
            {loadedPokemon.name}
          </h2>

          <div className="flex gap-2 mt-2">
            {loadedPokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="badge backdrop-blur-md bg-white/40 text-xs capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- LADO TRASERO ---------- */}
        <div className="card-face card-back">
          <h3 className="font-bold mb-1 text-white">Datos</h3>
          <p className="text-xs text-white">Altura: {loadedPokemon.height}</p>
          <p className="text-xs text-white">Peso: {loadedPokemon.weight}</p>

          <p className="text-xs font-semibold text-white mt-2">Habilidades:</p>
          <ul className="text-xs text-white list-disc list-inside">
            {loadedPokemon.abilities.slice(0, 3).map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
