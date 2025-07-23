import { useState } from "react";
import "../css/SearchBar.css";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(inputValue.trim());
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="🔎 Buscar Pokémon..."
        className="searchbar-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
