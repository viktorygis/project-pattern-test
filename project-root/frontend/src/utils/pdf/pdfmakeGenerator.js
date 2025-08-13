import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import logoBase64 from "./logo";
import { pdfIntroBlock } from "./pdfIntroBlock";
import { pdfDominantPatternsBlock } from "./pdfDominantPatternsBlock";
import { pdfCategoryPatternsBlock } from "./pdfCategoryPatternsBlock";
import { pdfContactsBlock, pdfRepeatTestBlock, pdfAuthorBlock, pdfDominantPatternsDescriptionsBlock } from "./pdfContactsBlock";
import { getPatternPercentsByCategory } from "../../utils/resultsHelpers";
import pdfmakeStyles from "./pdfmakeStyles";

pdfMake.vfs = pdfFonts.vfs;

function isTelegramWebView() {
  return /Telegram/i.test(navigator.userAgent);
}

export function downloadPDF(resultsData) {
  if (!resultsData) {
    alert("Нет данных для создания PDF!");
    return;
  }

  const dominantPatternResults = getPatternPercentsByCategory(
    resultsData.categories,
    resultsData.patternResults
  );

  const docDefinition = {
    content: [
      ...pdfIntroBlock(resultsData, logoBase64),
      ...pdfDominantPatternsBlock(resultsData.categories, dominantPatternResults),
      ...pdfCategoryPatternsBlock(resultsData.categories, resultsData.patternResults),
      ...pdfContactsBlock(),
      ...pdfRepeatTestBlock(),
      ...pdfAuthorBlock(),
      ...pdfDominantPatternsDescriptionsBlock(resultsData.categories, dominantPatternResults),
    ],
    styles: pdfmakeStyles,
    footer: (currentPage, pageCount) => ({
      text: `Страница ${currentPage} из ${pageCount}`,
      alignment: "center",
      margin: [0, 10],
      style: "pages",
    }),
    pageMargins: [40, 60, 40, 60],
  };

  if (isTelegramWebView()) {
    alert("В браузере Telegram автоматическая загрузка PDF не поддерживается.\nPDF откроется в новом окне — сохраните его вручную через меню браузера.");
    pdfMake.createPdf(docDefinition).open();
  } else {
    pdfMake.createPdf(docDefinition).download("results.pdf");
  }
}

// <-- ВАЖНО: это снаружи функций -->
if (typeof window !== 'undefined') {
  window.generateDocDefinition = (resultsData) => {
    const dominantPatternResults = getPatternPercentsByCategory(
      resultsData.categories,
      resultsData.patternResults
    );

    return {
      content: [
        ...pdfIntroBlock(resultsData, logoBase64),
        ...pdfDominantPatternsBlock(resultsData.categories, dominantPatternResults),
        ...pdfCategoryPatternsBlock(resultsData.categories, resultsData.patternResults),
        ...pdfContactsBlock(),
        ...pdfRepeatTestBlock(),
        ...pdfAuthorBlock(),
        ...pdfDominantPatternsDescriptionsBlock(resultsData.categories, dominantPatternResults),
      ],
      styles: pdfmakeStyles,
      footer: (currentPage, pageCount) => ({
        text: `Страница ${currentPage} из ${pageCount}`,
        alignment: "center",
        margin: [0, 10],
        style: "pages",
      }),
      pageMargins: [40, 80, 40, 60],
    };
  };
}
