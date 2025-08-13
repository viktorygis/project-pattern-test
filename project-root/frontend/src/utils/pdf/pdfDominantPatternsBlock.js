const pageWidth = 595; // A4

function createCenteredLine(lineWidth = 180, yPosition = 0) {
  return {
    canvas: [
      {
        type: "rect",
        x: (pageWidth - lineWidth) / 2,
        y: yPosition,
        w: lineWidth,
        h: 1,
        color: "#ff008a",
      },
    ],
    margin: [0, 0, 0, 20],
    relativePosition: { x: -50, y: 0 },
  };
}

export function pdfDominantPatternsBlock(categories, patternResults, strongThreshold = 75) {
  // Приводим к массиву, если вдруг объект
  if (!Array.isArray(categories)) {
    categories = Object.values(categories || {});
  }

  // Собираем явно проявленные паттерны и их категории
  let dominantPatterns = [];
  let usedCategoryIds = new Set();

  (categories || []).forEach((cat) => {
    (cat.subcategories || []).forEach((subcat) => {
      (subcat.patterns || []).forEach((pat) => {
        const patName = pat.pattern?.ru || pat.pattern?.en || pat.name || "";
        const abbr = pat.pattern?.abbreviation || pat.abbreviation || "";
        const result = (patternResults || []).find(
          (r) =>
            (typeof r.name === "string" && r.name.trim().toLowerCase() === patName.trim().toLowerCase()) ||
            (typeof r.pattern?.ru === "string" && r.pattern.ru.trim().toLowerCase() === patName.trim().toLowerCase())
        );
        const percent = result?.percent || result?.percentage || 0;
        if (percent >= strongThreshold) {
          dominantPatterns.push({
            name: patName,
            abbr: abbr,
            percent,
            color: cat.color || "#71717a",
            category: cat.title?.ru || cat.title?.en || cat.name || "",
            categoryId: cat.id,
          });
          usedCategoryIds.add(cat.id);
        }
      });
    });
  });

  // Список уникальных категорий из всех переданных категорий (всегда четыре), чтобы справа вывести их описание
  const uniqueCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.title?.ru || cat.title?.en || cat.name || "",
    color: cat.color || "#cccccc",
    benefit: cat.benefit?.ru || cat.benefit?.en || "",
  }));

  // Левая колонка: паттерны — аббревиатура и название
  const patternsList = dominantPatterns.map((item) => ({
    text: `${item.abbr}: ${item.name}`,
    style: "abbreviationLabel",
  }));

  // Правая колонка: четыре категории, по одной на каждую
  const categoriesList = uniqueCategories.map((cat) => ({
    columns: [
      {
        width: 10,
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 1,
            w: 10,
            h: 10,
            color: cat.color,
          },
        ],
      },
      {
        width: "*",
        stack: [
          { text: cat.name, style: "categoryShortLabel", margin: [10, 0, 0, 0] },
          { text: cat.benefit, style: "benefitLabel", margin: [10, 0, 0, 8] },
        ],
      },
    ],
    margin: [0, 0, 0, 2],
    columnGap: 0, // <--- добавьте это!
    layout: "noBorders", // <--- добавьте это!
  }));

  //Заголовок "Явно проявленные паттерны"
  const content = [
    {
      text: "Явно проявленные паттерны",
      style: "dominantTitle",
      margin: [0, 0, 0, 5],
    },
    createCenteredLine(300, 0),
    { text: "", margin: [0, 0, 0, 24] },
  ];

  //выводим гистограмму и контент
  if (dominantPatterns.length) {
    // Гистограмма
    const dominantPatternsColumns = dominantPatterns.map((pat) => ({
      stack: [
        {
          text: `${pat.percent}%`,
          alignment: "center",
          margin: [0, 0, 0, 2],
          fontSize: 12,
          color: pat.percent === 100 ? "#03d666" : "#000",
        },
        {
          canvas: [
            {
              type: "rect",
              x: 0,
              y: 0,
              w: 8,
              h: 90,
              color: "#e0e0e0",
              r: 5,
            },
            {
              type: "rect",
              x: 0,
              y: 90 - Math.round((pat.percent / 100) * 90),
              w: 8,
              h: Math.round((pat.percent / 100) * 90),
              color: pat.color,
              r: 5,
            },
          ],
          margin: [0, 0, 0, 2],
          height: 90,
          width: 8,
          alignment: "center",
        },
        {
          text: pat.abbr,
          alignment: "center",
          margin: [0, 2, 0, 0],
          fontSize: 12,
          color: "#505050",
        },
      ],
      margin: [0, 0, 0, 5],
    }));

    content.push({
      columns: dominantPatternsColumns,
      columnGap: 8, // можно уменьшить при желании
    });

    // Условные обозначения - заголовок
    content.push({
      text: "Условные обозначения",
      style: "dominantSubTitle",
      margin: [0, 20, 0, 5],
    });

    // Условные обозначения: две колонки — паттерны и категории
    content.push({
      columns: [
        { width: "50%", stack: patternsList },
        { width: "50%", stack: categoriesList },
      ],
      columnGap: 32,
      margin: [0, 0, 0, 16],
    });
  } else {
    //Нет явно проявленных паттернов
    content.push({
      text: "Нет явно проявленных паттернов",
      style: "noQuestions",
      alignment: "center",
      margin: [0, 20, 0, 20],
    });
  }

  content.push({ text: "", pageBreak: "after" });
  return content;
}
