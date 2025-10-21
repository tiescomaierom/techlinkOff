import React from 'react';
import './../styles/Sidebar.css'; // Adjust path as needed

function Sidebar({ filterOptions }) {
  return (
    <aside className="sidebar">
      {Object.entries(filterOptions).map(([category, options]) => (
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