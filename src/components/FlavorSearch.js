import React from 'react';
import Select from 'react-select';
import './FlavorSearch.css';

const FlavorSearch = ({ allIngredients, selectedFlavors, setSelectedFlavors }) => {
  // Convert the array of ingredients to the format expected by react-select
  const options = allIngredients.map(ingredient => ({
    value: ingredient,
    label: ingredient
  }));

  // Convert selectedFlavors to the format expected by react-select
  const selectedOptions = selectedFlavors.map(flavor => ({
    value: flavor,
    label: flavor
  }));

  const handleChange = (selectedOptions) => {
    // Convert back to simple array of flavor names
    setSelectedFlavors(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleClear = () => {
    setSelectedFlavors([]);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '4px',
      border: '1px solid #ddd',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #3498db',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e8f4fd',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#2980b9',
      fontWeight: 500,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#2980b9',
      '&:hover': {
        backgroundColor: '#3498db',
        color: 'white',
      },
    }),
  };

  return (
    <div className="flavor-search">
      <h2>Select Ingredients</h2>
      <p className="flavor-count">
        {allIngredients.length} different flavors to try. Start typing to see what's available:
      </p>
      
      <Select
        isMulti
        name="flavors"
        options={options}
        className="flavor-selector"
        placeholder="Type to search ingredients..."
        value={selectedOptions}
        onChange={handleChange}
        styles={customStyles}
      />
      
      <div className="button-container">
        <button 
          className="button"
          onClick={handleClear}
          disabled={selectedFlavors.length === 0}
        >
          Clear All
        </button>
      </div>
      
      {selectedFlavors.length > 0 && (
        <div className="info-box">
          Showing pairings that match with <strong>all</strong> selected ingredients.
        </div>
      )}
    </div>
  );
};

export default FlavorSearch;
