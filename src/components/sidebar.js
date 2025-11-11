import React from 'react';
import './../styles/Sidebar.css'; // Adjust path as needed

// se o componente receber props, garanta um valor padrão para filterOptions
function Sidebar(props) {
  // preserva compatibilidade: aceita prop filterOptions ou usa objeto vazio
  const { filterOptions = {}, selectedCategory, selectedOption, onSelect, onClear } = props || {};

  // garante que sempre trabalhemos com um objeto
  const safeFilterOptions = filterOptions || {};

  // exemplo de uso seguro: Object.entries(safeFilterOptions)
  const categories = Object.entries(safeFilterOptions);

  return (
    <aside className="sidebar">
      {categories.map(([category, options]) => (
        <div key={category} className="filter-category">
          <h3>{category}</h3>
          <ul>
            {options.map((option) => (
              <li key={option}>
                <label>
                  <input type="checkbox" name={category} value={option} />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;