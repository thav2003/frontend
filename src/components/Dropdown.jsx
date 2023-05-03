import React, { useState } from 'react';
import "./css/Dropdown.scss"


export const Dropdown = ({ options, onSelect,text }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [showOptions, setShowOptions] = useState(false);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      onSelect(option);
      setShowOptions(false)
    };
  
    return (
      <div className="dropdown">
        <div className="selected-option" onClick={() => setShowOptions(!showOptions)}>
          {text?text:selectedOption}
        </div>
        {showOptions && (
          <ul className="options">
            {options.map((option) => (
              <li key={option} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default Dropdown;
