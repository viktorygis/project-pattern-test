import React, { useState } from 'react';
import ResultsHeader from './../Sections/ResultsSections/ResultsHeader';
import HistogramSection from './../Sections/ResultsSections/HistogramSection';
import InterpretationSection from './../Sections/ResultsSections/InterpretationSection';
import LiteratureSection from './../Sections/ResultsSections/LiteratureSection';
import CategoryResultsSection from './../Sections/ResultsSections/CategoryResultsSection';

const ResultsScreen = ({
	resultsData,
	answers,
	categories,
	patternResults,
	topPatterns,
	topCategory,
	patternMessage,
	opportunities,
	behaviorModel,
	strengths
}) => {


	const [showSuccess, setShowSuccess] = useState(false);
	const [loading, setLoading] = useState(false); // если нужно


	return (
		<div className="result">
			<ResultsHeader
				resultsData={resultsData}
				loading={loading}
				showSuccess={showSuccess}
				setShowSuccess={setShowSuccess}
			/>
			<div className="result-main">
				<h2 className="result-main__subtitle">Результаты вашего тестирования</h2>
				<HistogramSection
					categories={categories}
					patternResults={patternResults}
					topCategory={resultsData.topCategory}
				/>
				<InterpretationSection
					topCategory={resultsData.topCategory}
					patternMessage={patternMessage}
					topPatterns={topPatterns}
					opportunities={opportunities}
					strengths={strengths}
					responseType={resultsData.responseType}
				/>
				<LiteratureSection />
			</div>
			<CategoryResultsSection categories={categories} patternResults={patternResults} />
		</div>
	);
};

export default ResultsScreen;