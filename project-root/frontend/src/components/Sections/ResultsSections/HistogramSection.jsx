
//project-root\frontend\src\components\Sections\ResultsSections\HistogramSection.jsx
import React from 'react';
import PatternBarChart from '../../Charts/PatternBarChart';

const HistogramSection = ({ categories, patternResults, topCategory }) => (
	<div className="histogram">
		<PatternBarChart
			categories={Array.isArray(categories) ? categories : []}
			patternResults={Array.isArray(patternResults) ? patternResults : []}
			topCategoryFromResults={topCategory} // <-- передаем топовую категорию!
		/>
	</div>
);

export default HistogramSection;