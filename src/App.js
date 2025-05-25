import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FlavorSearch from './components/FlavorSearch';
import FlavorResults from './components/FlavorResults';
import FlavorVisualization from './components/FlavorVisualization';
import './App.css';
import flavorData from './assets/flavorData.json';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [matchingPairings, setMatchingPairings] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // 0 for Graph, 1 for List
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Flavor Mapper</h1>
        <p>Explore a database of food pairings recommended by top chefs!</p>
      </header>
      
      <div className="container">
        <div className="app-layout">
          <div className="search-panel"> {/* Renamed from search-container */}
            <FlavorSearch 
              allIngredients={allIngredients} 
              selectedFlavors={selectedFlavors} 
              setSelectedFlavors={setSelectedFlavors} 
            />
          </div>
          
          <div className="content-panel"> {/* Renamed from visualization-container */}
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="flavor view tabs">
                  <Tab label="Graph" {...a11yProps(0)} />
                  <Tab label="List" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={activeTab} index={0}>
                <FlavorVisualization 
                  selectedFlavors={selectedFlavors} 
                  matchingPairings={matchingPairings} 
                />
              </CustomTabPanel>
              <CustomTabPanel value={activeTab} index={1}>
                <FlavorResults 
                  matchingPairings={matchingPairings} 
                  selectedFlavors={selectedFlavors}
                />
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
