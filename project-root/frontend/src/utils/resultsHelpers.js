//project-root\frontend\src\utils\responseTypeHelpers.js
import { determineResponseType } from "./responseTypeHelpers";

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ АНАЛИЗА РЕЗУЛЬТАТОВ ПАТТЕРНОВ

// Возвращает статистику по паттерну для подкатегории
export function getSubcategoryPatternStats(patternResults, subcategory) {
	const patternNames = (subcategory.patterns || []).map((p) => (p.pattern.ru || p.pattern.en || "").trim().toLowerCase());
	const counts = {};
	let total = 0;
	(patternResults || []).forEach((pat) => {
		const patNorm = (pat || "").trim().toLowerCase();
		if (patternNames.includes(patNorm)) {
			counts[patNorm] = (counts[patNorm] || 0) + 1;
			total++;
		}
	});
	const stats = {};
	patternNames.forEach((name) => {
		stats[name] = total > 0 ? Math.round(((counts[name] || 0) / total) * 100) : 0;
	});
	return stats;
}

// Для гистограммы: собирает проценты по всем паттернам
export function getPatternPercentsByCategory(categories, patternResults) {
	const percents = [];
	(categories || []).forEach((cat) => {
		(cat.subcategories || []).forEach((subcat) => {
			const stats = getSubcategoryPatternStats(patternResults, subcat);
			(subcat.patterns || []).forEach((pat) => {
				const name = (pat.pattern?.ru || pat.pattern?.en || "").trim();
				const key = name.toLowerCase();
				if (stats[key] > 0) {
					percents.push({ name, percent: stats[key] });
				}
			});
		});
	});
	return percents;
}

// Возвращает топ-5 проявленных паттернов
export function getTopPatterns({ categories, patternResults }) {
	const percents = getPatternPercentsByCategory(categories, patternResults);
	return percents
		.sort((a, b) => b.percent - a.percent)
		.slice(0, 5)
		.map((p) => p.name);
}

// Возвращает топовую категорию (где суммарно больше всего проявленность)
export function getTopCategory({ categories, patternResults }) {
	let maxCategory = "";
	let maxValue = 0;
	(categories || []).forEach((cat) => {
		let sum = 0;
		let total = 0;
		(cat.subcategories || []).forEach((subcat) => {
			const stats = getSubcategoryPatternStats(patternResults, subcat);
			(subcat.patterns || []).forEach((pat) => {
				const name = (pat.pattern?.ru || pat.pattern?.en || "").trim().toLowerCase();
				sum += stats[name] || 0;
				total++;
			});
		});
		const avg = total ? sum / total : 0;
		if (avg > maxValue) {
			maxValue = avg;
			maxCategory = cat.title?.ru || cat.title?.en || "";
		}
	});
	return maxCategory;
}
// Возвращает массив категорий с явно выраженными паттернами
export function getStrongPatternsByCategory(categories, patternResults, strongThreshold = 75) {
	return (categories || []).map((cat) => {
		const strongPatterns = [];
		(cat.subcategories || []).forEach((subcat) => {
			const stats = getSubcategoryPatternStats(patternResults, subcat);
			(subcat.patterns || []).forEach((pat) => {
				const nameRaw = pat.pattern?.ru || pat.pattern?.en || "";
				const name = nameRaw.trim().toLowerCase();
				const percent = stats[name] || 0;
				if (percent >= strongThreshold) {
					strongPatterns.push({
						name: nameRaw,
						abbr: pat.pattern?.abbreviation || "",
						percent,
						cssClass: cat.cssClass || "",
					});
				}
			});
		});
		return {
			id: cat.id, // <-- ДОБАВЬТЕ ЭТО!
			category: cat.title?.ru || cat.title?.en,
			titleRu: cat.title?.ru,
			titleEn: cat.title?.en,
			description: cat.description?.ru || cat.description?.en || "",
			cssClass: cat.cssClass || "",
			strongPatterns,
		};
	});
}
// Возвращает массив названий выраженных паттернов (проявленность >= strongThreshold)
export function getStrongPatternNames(categories, patternResults, strongThreshold = 75) {
	const strongPatternsByCategory = getStrongPatternsByCategory(categories, patternResults, strongThreshold);
	return strongPatternsByCategory.flatMap((cat) => cat.strongPatterns.map((p) => p.name));
}
// Возвращает топовую категорию по сильным паттернам (совместимо с PatternBarChart)
export function getTopCategoryByStrongPatterns(categories, patternResults, strongThreshold = 75) {
	const strongCategories = getStrongPatternsByCategory(categories, patternResults, strongThreshold).filter((cat) => cat.strongPatterns.length > 0);

	if (strongCategories.length === 0) return null;

	let maxCount = 0;
	let topCat = strongCategories[0];
	strongCategories.forEach((cat) => {
		if (cat.strongPatterns.length > maxCount) {
			maxCount = cat.strongPatterns.length;
			topCat = cat;
		}
	});

	return {
		id: topCat.id,
		title: topCat.category,
		titleRu: topCat.titleRu,
		titleEn: topCat.titleEn,
	};
}
// Возвращает текст-интерпретацию (можно доработать под свой текст)
export function getPatternMessage({ topCategory }) {
	if (topCategory === "Паттерны времени") {
		return "Вы ориентированы на эффективное управление своим временем и ресурсами.";
	}
	if (topCategory === "Паттерны поведения") {
		return "Ваши поведенческие стратегии формируют основу вашей активности.";
	}
	if (topCategory === "Паттерны коммуникации") {
		return "Ваша сильная сторона — коммуникация и взаимодействие с окружающими.";
	}
	if (topCategory === "Паттерны мышления") {
		return "Ваша особенность — оригинальность мышления и подходов к решению задач.";
	}
	return "У вас проявлен комплексный профиль паттернов.";
}

// Возможности и ограничения — пример (можно расширить)
export function getOpportunities({ topCategory }) {
	if (topCategory) {
		return `Ваши сильные стороны проявляются в категории: ${topCategory && topCategory.title}. Используйте их для развития!`;
	}
	return "";
}

// Модель поведения — пример
export function getBehaviorModel({ topPatterns }) {
	if (Array.isArray(topPatterns) && topPatterns.length > 0) {
		return `Ваш стиль поведения базируется на паттернах: ${topPatterns.slice(0, 3).join(", ")}.`;
	}
	return "";
}

// Сильные стороны — пример
export function getStrengths({ topPatterns }) {
	if (Array.isArray(topPatterns) && topPatterns.length > 0) {
		return `Ведущие паттерны: ${topPatterns.join(", ")} — это ваши ресурсы для развития.`;
	}
	return "";
}

// Главная сборка всех данных для ResultsScreen
export function createResultsData({ userData, categories, patternResults }) {
	const strongPatternNames = getStrongPatternNames(categories, patternResults, 75);
	const topPatterns = getTopPatterns({ categories, patternResults });
	const topCategory = getTopCategoryByStrongPatterns(categories, patternResults);
	const patternMessage = getPatternMessage({ topCategory });
	const responseType = determineResponseType(strongPatternNames);

	return {
		userData,
		categories,
		patternResults,
		topPatterns,
		topCategory,
		patternMessage,
		responseType,
		user: userData,
		date: new Date().toLocaleDateString("ru-RU"),
	};
}
