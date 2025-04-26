import React, { useState, useEffect } from 'react';
import FlavorSearch from './components/FlavorSearch';
import FlavorResults from './components/FlavorResults';
import FlavorVisualization from './components/FlavorVisualization';
import './App.css';
import flavorData from './assets/flavorData.json';

function App() {
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [matchingPairings, setMatchingPairings] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  // Extract all unique ingredients for the dropdown
  useEffect(() => {
    const ingredients = flavorData.map(item => item.main);
    setAllIngredients(ingredients.sort());
  }, []);

  // Find matching pairings when selected flavors change
  useEffect(() => {
    if (selectedFlavors.length === 0) {
      setMatchingPairings([]);
      return;
    }

    // Find all pairings for each selected flavor
    const allPairings = selectedFlavors.map(flavor => {
      const flavorObj = flavorData.find(item => item.main === flavor);
      return flavorObj ? flavorObj.pairing : [];
    });

    // Find the intersection of all pairings
    let commonPairings = allPairings[0];
    for (let i = 1; i < allPairings.length; i++) {
      commonPairings = commonPairings.filter(item => 
        allPairings[i].includes(item)
      );
    }

    setMatchingPairings(commonPairings);
  }, [selectedFlavors]);

  return (
    <div className="app">
      <header className="header">
        <h1>Flavor Mapper</h1>
        <p>Explore a database of food pairings recommended by top chefs!</p>
      </header>
      
      <div className="container">
        <div className="app-layout">
          <div className="search-container">
            <FlavorSearch 
              allIngredients={allIngredients} 
              selectedFlavors={selectedFlavors} 
              setSelectedFlavors={setSelectedFlavors} 
            />
            <FlavorResults 
              matchingPairings={matchingPairings} 
              selectedFlavors={selectedFlavors}
            />
          </div>
          
          <div className="visualization-container">
            <FlavorVisualization 
              selectedFlavors={selectedFlavors} 
              matchingPairings={matchingPairings} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
