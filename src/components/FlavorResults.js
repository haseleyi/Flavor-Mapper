import React from 'react';
import './FlavorResults.css';

const FlavorResults = ({ matchingPairings, selectedFlavors }) => {
  if (selectedFlavors.length === 0) {
    return (
      <div className="flavor-results">
        
        <div className="empty-state">
          <p>Please select at least one ingredient to see matching flavors.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flavor-results">
      
      
      {selectedFlavors.length > 0 && (
        <div className="selected-ingredients">
          <h3>You selected:</h3>
          <div className="pairings-list">
            {selectedFlavors.map((flavor, index) => (
              <span key={index} className="pairing-tag selected">{flavor}</span>
            ))}
          </div>
        </div>
      )}
      
      {matchingPairings.length > 0 ? (
        <div className="matching-results">
          <h3>These flavors pair well with {selectedFlavors.length > 1 ? 'all your selections' : 'your selection'}:</h3>
          <div className="pairings-list">
            {matchingPairings.map((pairing, index) => (
              <span key={index} className="pairing-tag">{pairing}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-matches">
          <p>No common pairings found for these ingredients together.</p>
          <p>Try selecting fewer ingredients or different combinations.</p>
        </div>
      )}
      

    </div>
  );
};

export default FlavorResults;
