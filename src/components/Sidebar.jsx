import { useEffect, useState } from "react";
import "../css/Sidebar.css";
import bug from "../assets/icons/bug.svg";
import fire from "../assets/icons/fire.svg";
import water from "../assets/icons/water.svg";
import grass from "../assets/icons/grass.svg";
import electric from "../assets/icons/electric.svg";
import psychic from "../assets/icons/psychic.svg";
import normal from "../assets/icons/normal.svg";
import fighting from "../assets/icons/fighting.svg";
import dark from "../assets/icons/dark.svg";
import fairy from "../assets/icons/fairy.svg";
import ghost from "../assets/icons/ghost.svg";
import rock from "../assets/icons/rock.svg";
import ground from "../assets/icons/ground.svg";
import poison from "../assets/icons/poison.svg";
import dragon from "../assets/icons/dragon.svg";
import ice from "../assets/icons/ice.svg";
import steel from "../assets/icons/steel.svg";
import flying from "../assets/icons/flying.svg";

// Mapeo de tipo => icono
const typeIcons = {
  bug,
  fire,
  water,
  grass,
  electric,
  psychic,
  normal,
  fighting,
  dark,
  fairy,
  ghost,
  rock,
  ground,
  poison,
  dragon,
  ice,
  steel,
  flying,
};

function Sidebar({ onFilter }) {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchFilters = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const data = await res.json();
      setTypes(data.results);
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    onFilter({ type: selectedType });
  }, [selectedType]);

  return (
    <aside className="sidebar">
      <h2>Filtrar</h2>
      <label>Tipo:</label>
      <div className="types-grid">
        <div className="type-option">
          <input
            type="radio"
            name="type"
            id="all"
            value=""
            checked={selectedType === ""}
            onChange={() => setSelectedType("")}
          />
          <label htmlFor="all">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
              alt="all"
              className="type-icon"
            />
            Todos
          </label>
        </div>

        {types.map((t) => (
          <div key={t.name} className="type-option">
            <input
              type="radio"
              name="type"
              id={t.name}
              value={t.name}
              checked={selectedType === t.name}
              onChange={() => setSelectedType(t.name)}
            />
            <label htmlFor={t.name}>
              <img
                src={typeIcons[t.name] || "https://cdn-icons-png.flaticon.com/512/616/616408.png"}
                alt={t.name}
                className="type-icon"
              />
              {t.name}
            </label>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
