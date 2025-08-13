
//src/utils/createResultsData.js
export function createResultsData({ userData, categories, patternResults }) {
  function getSubcategoryPatternStats(patternResults, subcategory) {
    // Нормализуем имена паттернов для сравнения
    const patternNames = (subcategory.patterns || []).map(
      p => (p.pattern.ru || p.pattern.en || '').trim().toLowerCase()
    );

    const counts = {};
    let total = 0;

    // Обрабатываем массив строк
    (patternResults || []).forEach(pattern => {
      const normalizedPattern = pattern.trim().toLowerCase();
      if (patternNames.includes(normalizedPattern)) {
        counts[normalizedPattern] = (counts[normalizedPattern] || 0) + 1;
        total++;
      }
    });

    const stats = {};
    patternNames.forEach(name => {
      stats[name] = total > 0 ? Math.round(((counts[name] || 0) / total) * 100) : 0;
    });

    return stats;
  }

  return {
    user: userData ? { name: userData.fullName || userData.name || "" } : { name: "" },
    date: new Date().toISOString().slice(0, 10),
    categories: (categories || []).map(cat => ({
      title: cat.title?.ru || cat.title?.en,
      subcategories: (cat.subcategories || []).map(sub => {
        const stats = getSubcategoryPatternStats(patternResults, sub);
        return {
          title: sub.title?.ru || sub.title?.en,
          patterns: (sub.patterns || []).map(pat => {
            const name = pat.pattern.ru || pat.pattern.en || "";
            const percent = stats[(name || '').trim().toLowerCase()] || 0;
            return { name, percent };
          }),
        };
      }),
    })),
  };
}