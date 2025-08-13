const pdfmakeStyles = {
  // 1 Блок Шапка документа---------------------------------
  clientInfo: {
    fontSize: 14,
    bold: false,
    margin: [0, 0, 0, 5],
  },
  mainLogo: {
    fontSize: 22,
    bold: true,
    color: "#ff008a",
  },
  mainTitle: {
    fontSize: 22,
    bold: true,
  },
  descriptionText: {
    fontSize: 16,
  },
  descriptionTextAccent: {
    fontSize: 16,
    bold: true,
  },
  mainListTitle: {
    fontSize: 16,
    alignment: "center",
    bold: true,
    margin: [0, 0, 0, 20],
  },
  mainListText: {
    fontSize: 14,
    margin: [0, 0, 0, 10],
  },
  // 2 Блок "Явно проявленные паттерны"------------------
  dominantTitle: {
    fontSize: 18,
    bold: true,
    alignment: "center",
    margin: [0, 0, 0, 5],
  },
  dominantSubTitle: {
    fontSize: 14,
    bold: true,
    alignment: "left",
    margin: [0, 20, 0, 10],
  },
  abbreviationLabel: {
    fontSize: 11,
    alignment: "left",
    margin: [0, 5, 0, 10],
    color: "#505050",
    bold: false,
  },

  categoryShortLabel: {
    fontSize: 11,
    bold: true,
    color: "#222",
  },
  benefitLabel: {
    fontSize: 10,
    italics: true,
    color: "#505050",
  },

  // 3 Блок "Паттерны по категориям" -------------------
  categoryTitle: {
    fontSize: 18,
    bold: true,
    alignment: "center",
    margin: [0, 0, 0, 5],
  },

  //Название категории
  categoryHeader: {
    fontSize: 16,
    bold: true,
    alignment: "center",
  },
  //Описание категории
  categoryDescription: {
    fontSize: 14,
    alignment: "left",
    color: "#71717a",
    margin: [0, 5, 0, 20],
  },
  //Название подкатегории
  subCategoryHeader: {
    fontSize: 11,
    bold: true,
    margin: [0, 5, 0, 5],
  },
  //Статус паттерна в подкатегории
  statusPattern: {
    fontSize: 9,
    bold: true,
    color: "#505050",
    margin: [0, 5, 0, 10],
    decoration: "underline",
  },

  //Название паттерна
  percentageText: {
    fontSize: 10,
    color: "#71717a",
    alignment: "left",
    margin: [0, 0, 0, 5],
  },
  //% выроженности паттерна
  percentageCell: {
    fontSize: 10,
    margin: [0, 0, 25, 5],
    color: "#71717a",
  },
  //-------------------------
  noQuestions: {
    fontSize: 14,
    italics: true,
    color: "#ff0000",
    margin: [0, 10, 0, 15],
  },
  sectionTitle: {
    fontSize: 18,
    bold: true,
    alignment: "center",
    margin: [0, 0, 0, 10],
  },
  descriptionPatternTitle: {
    fontSize: 14,
    color: "#000",
    bold: true,
    alignment: "center",
    margin: [0, 10, 0, 5],
  },
  patternTitle: {
    fontSize: 12,
    color: "#71717a",
    bold: true,
    decoration: "underline",
    alignment: "left",
    margin: [20, 0, 0, 2],
  },
  descriptionPattern: {
    fontSize: 12,
    color: "#71717a",
    alignment: "left",
    margin: [0, 2, 0, 5],
  },

  abbreviationText: {
    fontSize: 12,
    alignment: "center",
    color: "#505050",
  },
  percentageTextGreen: {
    color: "#03d666",
    fontSize: 10,
    bold: true,
    margin: [0, 0, 0, 10],
  },
  secondTitle: {
    fontSize: 18,
    bold: true,
    alignment: "center",
  },
  secondText: {
    fontSize: 14,
    alignment: "left",
  },
  secondTextLink: {
    fontSize: 12,
    alignment: "left",
  },
  secondLink: {
    color: "blue",
    fontSize: 12,
    width: "auto",
  },
  secondList: {
    fontSize: 12,
    margin: [0, 0, 0, 5],
  },
  pages: {
    fontSize: 10,
    color: "#505050",
  },
};

export default pdfmakeStyles;
