import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './FlavorVisualization.css';

const FlavorVisualization = ({ selectedFlavors, matchingPairings }) => {
  const svgRef = useRef();
  
  useEffect(() => {
    if (!selectedFlavors.length) {
      const emptyMessage = d3.select(svgRef.current)
        .html(null)
        .append('text')
        .attr('x', '50%')
        .attr('y', '50%')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('class', 'empty-visualization-text')
        .text('Select ingredients to see flavor connections');
      return;
    }

    // Clear previous visualization
    d3.select(svgRef.current).html(null);

    // Create data structure for the visualization
    const nodes = [
      ...selectedFlavors.map(flavor => ({ id: flavor, group: 1, selected: true })),
      ...matchingPairings.map(pairing => ({ id: pairing, group: 2, selected: false }))
    ];

    const links = [];
    
    // Create links from each selected flavor to each matching pairing
    selectedFlavors.forEach(flavor => {
      matchingPairings.forEach(pairing => {
        links.push({
          source: flavor,
          target: pairing,
          value: 1
        });
      });
    });

    // If there are no connections to show
    if (links.length === 0 && selectedFlavors.length > 0) {
      const emptyMessage = d3.select(svgRef.current)
        .html(null)
        .append('text')
        .attr('x', '50%')
        .attr('y', '50%')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('class', 'empty-visualization-text')
        .text('No common pairings found for these ingredients together');
      return;
    }

    // Get dimensions of the container
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight || 400;

    // Create the force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // Create the SVG elements
    const svg = d3.select(svgRef.current);

    // Add links (connections)
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.value));

    // Add nodes (ingredients)
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g');

    // Add circles for each node
    const circles = node.append('circle')
      .attr('r', d => d.selected ? 20 : 15)
      .attr('fill', d => d.selected ? '#3498db' : '#e74c3c')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add labels for each node
    const labels = node.append('text')
      .text(d => d.id)
      .attr('x', 0)
      .attr('y', d => d.selected ? 30 : 25)
      .attr('text-anchor', 'middle')
      .attr('class', d => d.selected ? 'node-text selected' : 'node-text');

    // Add title for hover effect
    node.append('title')
      .text(d => d.id);

    // Update positions on each tick of the simulation
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => {
          // Keep nodes within bounds
          d.x = Math.max(20, Math.min(width - 20, d.x));
          d.y = Math.max(20, Math.min(height - 30, d.y));
          return `translate(${d.x},${d.y})`;
        });
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Clean up on unmount
    return () => {
      simulation.stop();
    };
  }, [selectedFlavors, matchingPairings]);

  return (
    <div className="flavor-visualization">
      <h2>Flavor Connections</h2>
      <div className="visualization-wrapper">
        <svg ref={svgRef} className="visualization-svg"></svg>
      </div>
      {selectedFlavors.length > 0 && matchingPairings.length > 0 && (
        <div className="visualization-legend">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#3498db' }}></span>
            <span>Selected ingredients</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#e74c3c' }}></span>
            <span>Matching pairings</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlavorVisualization;
