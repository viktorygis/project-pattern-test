
//project-root\frontend\src\components\Charts\PatternBarChart.jsx
import React from "react";
import {
	getStrongPatternsByCategory,
	getTopCategoryByStrongPatterns
} from "../../utils/resultsHelpers";

/**
	* PatternBarChart
	* Визуализирует явно проявленные паттерны по категориям.
	* Рамка ("border") выделяет именно ту категорию, которую вычислила аналитика (topCategory).
	*
	* @param {Array} categories - список категорий паттернов
	* @param {Array} patternResults - результаты паттернов пользователя
	* @param {number} strongThreshold - порог для выделения сильных паттернов (по умолчанию 75)
	* @param {string} topCategoryFromResults - топовая категория из анализа (для полной синхронизации)
	*/
const PatternBarChart = ({
	categories,
	patternResults,
	strongThreshold = 75,
	topCategoryFromResults // желательно передавать пропсом из resultsData.topCategory
}) => {
	// Получаем массив категорий с явно выраженными паттернами
	const categoryWrappers = getStrongPatternsByCategory(categories, patternResults, strongThreshold);

	// Только категории, где есть strongPatterns
	const visibleCategoryWrappers = categoryWrappers.filter(
		(cat) => cat.strongPatterns.length > 0
	);

	// Используем topCategory из пропса для синхронизации с InterpretationSection
	const topCategory = topCategoryFromResults
		// если не передан проп, вычисляем сами (но лучше передавать пропсом!)
		|| getTopCategoryByStrongPatterns(categories, patternResults, strongThreshold);

	// Собираем легенду
	const legendItems = [];
	visibleCategoryWrappers.forEach((cat) => {
		cat.strongPatterns.forEach((p) => {
			if (p.abbr && !legendItems.find((l) => l.abbr === p.abbr)) {
				legendItems.push({ abbr: p.abbr, name: p.name });
			}
		});
	});

	// Для отладки (можно убрать)
	// console.log("[PatternBarChart] topCategory:", topCategory);
	// console.log("[PatternBarChart] visibleCategoryWrappers:", visibleCategoryWrappers);

	return (
		<div className="histogram__container">
			<div className="histogram__body">
				<h3 className="histogram__title">Явно проявленные паттерны</h3>
				<div className="histogram__content">
					{visibleCategoryWrappers.map((cat) => (
						<div
							key={cat.category}
							className={
								"histogram__category-wrapper" +
								(topCategory && cat.id === topCategory.id ? " border" : "")
							}
						>
							<div className="histogram__category-row">
								<div className="histogram__category">{cat.category}</div>
								<div className="histogram__columns">
									{cat.strongPatterns.map((p) => (
										<div className="histogram__column strong-pattern" key={p.name}>
											<span className="histogram__pattern">{p.name}</span>
											<span className="histogram__pattern-abr">{p.abbr}</span>
											<div className="histogram__bar-container">
												<div
													className={"histogram__bar " + p.cssClass}
													style={{ width: `${p.percent}%` }}
												></div>
											</div>
											<span
												className={
													"histogram__percentage" +
													(p.percent === 100 ? " maximum" : "")
												}
											>
												{p.percent}%
											</span>
										</div>
									))}
								</div>
							</div>
							{cat.description && (
								<div className="histogram__category-description">{cat.description}</div>
							)}
						</div>
					))}
					<div className="legend">
						<h4>Условные обозначения:</h4>
						<div className="legend__grid">
							{legendItems.map((l) => (
								<div className="legend__item" key={l.abbr}>
									<span className="abbreviation">{l.abbr}</span> <span>-</span> {l.name}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PatternBarChart;