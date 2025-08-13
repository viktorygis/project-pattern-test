// src/components/Sections/ResultsSections/HistogramSection.jsx

import React from 'react';
import PatternBarChart from '../../Charts/PatternBarChart';

const HistogramSection = ({ categories, patternResults }) => (
  <div className="histogram">
    <PatternBarChart
      categories={Array.isArray(categories) ? categories : []}
      patternResults={Array.isArray(patternResults) ? patternResults : []}
    />
  </div>
);

export default HistogramSection;