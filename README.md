# Flavor Mapper

A modern web application for exploring food pairings recommended by top chefs. This project is a React-based reimplementation of the original [Flavor Bible App](https://areeves87.shinyapps.io/flavor-bible/), which was built with R Shiny.

## Features

- Search and select from 600+ different ingredients
- Find ingredients that pair well with your selections
- Interactive visualization of flavor connections
- Clean, modern, and responsive UI
- Copy results to clipboard for future reference

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/Flavor-Mapper.git
cd Flavor-Mapper/flavor-mapper-react
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

The application will be available at http://localhost:3000

## Deployment

To build the app for production:

```
npm run build
```

This will create a `build` directory with optimized production files that can be deployed to any static hosting service like Netlify, Vercel, GitHub Pages, or AWS S3.

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [D3.js](https://d3js.org/) - Data visualization library
- [React Select](https://react-select.com/) - Advanced select component
- [Material UI](https://mui.com/) - UI component library

## Data Source

The data is based on "The Flavor Bible" by Karen Page and Andrew Dornenburg, which provides expert recommendations on flavor pairings from top chefs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original Flavor Bible App created with R Shiny
- Original data extraction and processing done by the initial project creator
