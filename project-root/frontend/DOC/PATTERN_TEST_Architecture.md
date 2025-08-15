# PATTERN_TEST_Architecture.md

> **Назначение:**
> Документация по архитектуре и структуре проекта PATTERN TEST.
> Описывает основные компоненты, логику, файлы, схемы, таблицы для быстрого понимания и расширения приложения.

---

## 📑 Оглавление

1. [Описание](#описание)
2. [Структура проекта](#структура-проекта)
3. [Таблица компонентов](#таблица-компонентов)
4. [Схема архитектуры](#схема-архитектуры)
5. [Краткое описание компонентов](#обзор-основных-компонентов)
6. [Данные (patterns.json, questions.json)](#данные-patternsjson-questionsjson)
7. [Документация и сервер](#документация-и-сервер)

---

## Описание

**PATTERN TEST** — веб-приложение для тестирования индивидуальных паттернов поведения, мышления, коммуникации и управления временем.
Пользователь проходит тест, результаты сохраняются на сервере и доступны по уникальной ссылке, а также через Telegram-бота.

---

## Структура проекта (директории и основные файлы)

```
src/
├── components/
│   ├── Charts/
│   │   └── PatternBarChart.jsx
│   ├── pages/
│   │   ├── PatternTestEntry.jsx
│   │   └── PatternTestResultPage.jsx
│   ├── Screens/
│   │   ├── FormScreen.jsx
│   │   ├── IntroScreen.jsx
│   │   ├── QuestionsScreen.jsx
│   │   └── ResultsScreen.jsx
│   ├── Sections/
│   │   ├── IntroSections/
│   │   │   ├── ContactsIntroSection.jsx
│   │   │   ├── InstructionIntroSection.jsx
│   │   │   ├── OfferIntroSection.jsx
│   │   │   ├── PatternsIntroSection.jsx
│   │   │   └── StartTestIntroSection.jsx
│   │   ├── ResultsSections/
│   │   │   ├── CategoryResultsSection.jsx
│   │   │   ├── HistogramSection.jsx
│   │   │   ├── InterpretationSection.jsx
│   │   │   ├── LiteratureSection.jsx
│   │   │   └── ResultsHeader.jsx
│   │   └── FileManager.jsx
├── styles/
│   ├── base/ (базовые стили)
│   │   ├── _buttons.scss
│   │   ├── _fonts.scss
│   │   ├── _global.scss
│   │   ├── _mixins.scss
│   │   ├── _reset.scss
│   │   ├── _variables.scss
│   ├── components/ (стили компонентов)
│   │   ├── screens/
│   │   │  ├── _form-start.scss
│   │   │  ├── _question-block.scss
│   │   │  └── _result-block.scss
│   │   ├── sections/
│   │   │  ├── intro-sections/
│   │   │  │  ├── _instruction-test.scss
│   │   │  │  ├── _offer-test.scss
│   │   │  │  ├── _patterns-description.scss
│   │   │  │  ├── _share.scss
│   │   │  │  ├── _trek.scss
│   │   │  ├── result-sections/
│   │   │  │  ├── _result-category.scss
│   │   │  │  ├── _result-header.scss
│   │   │  │  ├── _result-histogram.scss
│   │   │  │  ├── _result-interpretation.scss
│   │   │  │  └── _result-literature.scss
│   └── main.scss
├── utils/
│   ├── pdf/ (генерация PDF)
│   │   ├── logo.js
│   │   ├── pdfCategoryPatternsBlock.js
│   │   ├── pdfContactsBlock.js
│   │   ├── pdfDominantPatternsBlock.js
│   │   ├── pdfIntroBlock.js
│   │   ├── pdfmakeGenerator.js
│   │   └── pdfmakeStyles.js
│   ├── createResultsData.js
│   └── resultsHelpers.js
├── App.js
├── index.js
public/
├── data/
│   ├── patterns.json
│   └── questions.json
├── img/
DOC/
├── PATTERN_TEST_DOC.md
├── PATTERN_TEST_Architecture.md
├── PATTERN_TEST_PDF.md
README.md
server.js
```

---

## Таблица компонентов

| Компонент                   | Назначение                   | Входные данные          | Выходные данные        |
| --------------------------- | ---------------------------- | ----------------------- | ---------------------- |
| App.js                      | Главный файл, роутинг        | -                       | -                      |
| PatternTestEntry.jsx        | Контейнер теста, этапы       | -                       | -                      |
| PatternTestResultPage.jsx   | Страница результата по id    | id, данные              | patternResults         |
| IntroScreen.jsx             | Вводная страница             | -                       | -                      |
| FormScreen.jsx              | Форма пользователя           | userData                | userData               |
| QuestionsScreen.jsx         | Пошаговые вопросы            | questions.json          | answers (массив строк) |
| ResultsScreen.jsx           | Главный экран результатов    | patternResults, answers | Визуализация, PDF      |
| PatternBarChart.jsx         | Гистограмма паттернов        | patternResults          | График                 |
| ResultsHeader.jsx           | Заголовок результатов, PDF   | -                       | -                      |
| HistogramSection.jsx        | Гистограмма по категориям    | patternResults          | -                      |
| InterpretationSection.jsx   | Текстовая интерпретация      | patternResults          | -                      |
| LiteratureSection.jsx       | Рекомендации по литературе   | -                       | -                      |
| CategoryResultsSection.jsx  | Детализация по категориям    | patternResults          | -                      |
| FileManager.jsx             | Управление файлами данных    | -                       | -                      |
| pdfIntroBlock.js            | Блок PDF: вводная            | -                       | PDF                    |
| pdfDominantPatternsBlock.js | Блок PDF: гистограмма        | -                       | PDF                    |
| pdfCategoryPatternsBlock.js | Блок PDF: категории          | -                       | PDF                    |
| createResultsData.js        | Агрегация данных для рендера | answers, patterns.json  | patternResults         |
| resultsHelpers.js           | Вспомогательные вычисления   | patternResults          | проценты, топы, тексты |

---

## Схема архитектуры (текстовая)

```
[Frontend: React]
  ├─ IntroScreen
  ├─ FormScreen
  ├─ QuestionsScreen
  └─ ResultsScreen
         │
         ▼
[Utils: createResultsData.js, pdfmakeGenerator.js]
         │
         ▼
[Backend: server.js]
         │
         ▼
[Database (опционально)]
```

---

## Обзор основных компонентов

(раздели по смыслу — экраны, секции, утилиты, PDF, данные)

- **App.js** — главный роутер, точка входа приложения
- **PatternTestEntry.jsx** — контейнер теста, переходы между этапами
- **PatternTestResultPage.jsx** — страница результата, загрузка данных по id
- **IntroScreen.jsx** — приветствие, описание теста, инструкция, старт
- **FormScreen.jsx** — форма пользователя, валидация, сбор данных
- **QuestionsScreen.jsx** — пошаговое тестирование, сохранение ответов
- **ResultsScreen.jsx** — итоговые результаты, визуализация, PDF
- **Sections/** — тематические блоки для Intro, Results, FileManager
- **Charts/PatternBarChart.jsx** — визуализация паттернов
- **Utils/** — агрегация, вычисления, генерация PDF
- **PDF** — отдельные блоки PDF отчёта
- **public/data/** — исходные данные: questions.json, patterns.json

---

## Данные (patterns.json, questions.json)

| Файл           | Назначение                                 | Формат |
| -------------- | ------------------------------------------ | ------ |
| patterns.json  | Категории, подкатегории, паттерны, стили   | JSON   |
| questions.json | Вопросы, варианты, сопоставление паттернов | JSON   |

---

## Документация и сервер

| Файл                         | Назначение                                          |
| ---------------------------- | --------------------------------------------------- |
| PATTERN_TEST_DOC.md          | Пошаговая инструкция пользователя                   |
| PATTERN_TEST_Architecture.md | Структура проекта, компоненты, схемы архитектуры    |
| PATTERN_TEST_PDF.md          | Описание структуры PDF-отчёта, блоки, генерация PDF |
| README.md                    | Вводная информация, быстрый старт, ссылки           |
| server.js                    | Мини-сервер (Express.js), хранит результаты, API    |

- Запуск сервера: `node server.js` (http://localhost:5000)
- Все основные сценарии — см. [PATTERN_TEST_DOC.md](PATTERN_TEST_DOC.md)

---

## Быстрый FAQ для разработчика

- **Как добавить вопрос или паттерн?** — Измени questions.json или patterns.json, проверь визуализацию
- **Где логика расчёта?** — utils/createResultsData.js
- **Как работает PDF?** — utils/pdfmakeGenerator.js + блоки в utils/pdf/
- **Как добавить новую секцию?** — Создать компонент в Sections/, подключить к ResultsScreen или IntroScreen

---
