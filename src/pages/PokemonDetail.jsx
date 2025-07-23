import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPokemonByName, fetchSpecies } from "../services/pokeApi";
import "../css/PokemonDetail.css";
import SearchBar from "../components/SearchBar";


function PokemonDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPokemonByName(name);
      setPokemon(data);

      const spec = await fetchSpecies(name);
      setSpecies(spec);
    };
    load();
  }, [name]);

  if (!pokemon) return <div className="text-center mt-10">Cargando...</div>;
const primaryType = pokemon.types[0].type.name;

  return (
    <div className="detail-container">
      <button onClick={() => navigate("/")} className="back-button">
        ⬅️ Volver
      </button>

      <div  className={`detail-card animated-bg type-${primaryType}`}>
        <div className="detail-header">
          <div className="detail-img-wrapper">
            <img
  src={pokemon.sprites.front_default}
  alt={pokemon.name}
  className="pokemon-rotate"
/>

          </div>

          <div className="detail-info">
            <h1>{pokemon.name}</h1>
            <p>Altura: {pokemon.height / 10} m</p>
            <p>Peso: {pokemon.weight / 10} kg</p>
            <div className="types">
              {pokemon.types.map((t) => (
                <span key={t.type.name}>{t.type.name}</span>
              ))}
            </div>
            {species && <p>Generación: {species.generation.name}</p>}
          </div>
        </div>

        <div className="moves">
          <h2>Movimientos</h2>
          {pokemon.moves.slice(0, 10).map((move) => (
            <span key={move.move.name} className="move-badge">
              {move.move.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
