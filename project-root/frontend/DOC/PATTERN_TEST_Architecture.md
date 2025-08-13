# PATTERN TEST — Структура проекта и обзор компонентов


## Содержание

1. [Описание](#описание)
2. [Структура проекта](#структура-проекта)
3. [Обзор основных компонентов](#обзор-основных-компонентов)
    1. [App.js](#1-appjs)
    2. [PatternTestEntry.jsx](#2-patterntestentryjsx)
    3. [IntroScreen](#3-introscreen)
    4. [FormScreen](#4-formscreen)
    5. [QuestionsScreen](#5-questionsscreen)
    6. [ResultsScreen](#6-resultsscreen)
    7. [ResultsHeader](#7-resultsheader)
    8. [HistogramSection](#8-histogramsection)
    9. [PatternBarChart](#9-patternbarchart)
    10. [InterpretationSection](#10-interpretationsection)
    11. [LiteratureSection](#11-literaturesection)
    12. [CategoryResultsSection](#12-categoryresultssection)
    13. [FileManager](#13-filemanager)
    14. [PatternTestResultPage](#14-patterntestresultpage)
    15. [Utils и вспомогательные файлы](#15-utils-и-вспомогательные-файлы)
    16. [Данные (patterns.json, questions.json)](#16-данные-patternsjson-questionsjson)
4. [Дополнительные компоненты и секции](#дополнительные-компоненты-и-секции)
5. [Документация и сервер](#документация-и-сервер)


## Описание

**PATTERN TEST** — это веб-приложение для тестирования индивидуальных паттернов поведения, мышления, коммуникации и управления временем. Пользователь проходит опрос, результаты сохраняются на сервере и доступны по уникальной ссылке, в том числе из Telegram-бота.

### Основные пользовательские сценарии

#### Прохождение теста на сайте

1. Пользователь открывает `/pattern-test`
2. Видит вводную, инструкцию, описание теста, кнопку "Начать тест"
3. Заполняет форму (ФИО, контакты, согласия)
4. Пошагово отвечает на вопросы теста
5. После завершения ответы отправляются на сервер, возвращается уникальный id результата
6. Пользователь видит финальную страницу с ссылкой на результат (`/pattern-test/results/:id`)
7. Ссылка доступна сразу, а также из письма, Telegram и т.д.

#### Прохождение теста через Telegram-бота

1. Пользователь проходит тест в чате Telegram-бота
2. Бот отправляет ответы на сервер, получает id результата
3. Бот присылает пользователю ссылку вида `https://ai4g.ru/pattern-test/results/:id`
4. Пользователь открывает ссылку и видит результат в том же интерфейсе, что и сайт

---

## Структура проекта

```
src/
├── components/
│   ├── Charts/
│   │   └── PatternBarChart.jsx
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
├── pages/
│   ├── PatternTestEntry.jsx
│   └── PatternTestResultPage.jsx
├── styles/
│   ├── base/
│   │   ├── _buttons.scss
│   │   ├── _fonts.scss
│   │   ├── _global.scss
│   │   ├── _mixins.scss
│   │   ├── _reset.scss
│   │   ├── _variables.scss
│   ├── components/
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
│   │   ├── pdf/
│   │   │  ├── logo.js
│   │   │  ├── pdfCategoryPatternsBlock.js
│   │   │  ├── pdfContactsBlock.js
│   │   │  ├── pdfDominantPatternsBlock.js
│   │   │  ├── pdfIntroBlock.js
│   │   │  ├── pdfmakeGenerator.js
│   │   │  └── pdfmakeStyles.js
│   ├── createResultsData.js
│   └── resultsHelpers.js
└── App.css
└── App.js
└── App.test.js
└── index.js
└── reportWebVitals.js
└── setupTests.js
public/
├── data/
│   ├── patterns.json
│   └── questions.json
├── img/
│   └── test-patterns/
│       └── check.svg
npm_build.log
npm_install.log
package-lock.json
package.json
DOC/
├── PATTERN_TEST_DOC.md
├── PATTERN_TEST_Architecture.md
└── PATTERN_TEST_PDF.md
README.md

```
---




## Обзор основных компонентов

### 1. `App.js`
**Главный файл приложения.**
Настраивает роутинг между страницами (тест, результат, служебные).

---

### 2. `PatternTestEntry.jsx`
**Контейнерный компонент теста.**
Управляет этапами: интро → форма → вопросы → финальный экран (ссылка на результат).
Содержит логику переходов между этапами.

---
### 3. `PatternTestResultPage.jsx`
**Страница просмотра результата по id.**
Загружает данные результата (по id), категории, вычисляет все нужные параметры и передаёт их в `ResultsScreen`.

---

### 4. `IntroScreen.jsx`
**Экран приветствия и вводной информации.**
Показывает описание теста, оферту, инструкцию, контакты, кнопку "Начать тест".
Использует IntroSections (модули для каждой части).

---

### 5. `FormScreen.jsx`
**Экран ввода контактных данных.**
Ввод ФИО, e-mail, Telegram, телефон, согласия.
Проверяет корректность данных.

---

### 6. `QuestionsScreen.jsx`
**Пошаговый компонент тестирования.**
Показывает вопросы и варианты ответов на каждом шаге.
После завершения вызывает onComplete с ответами.

---

### 7. `OfferIntroSection.jsx`
Блок с подробным описанием сути теста, пояснением, что такое паттерны, их роль.
Содержит вводный текст и мотивирует пользователя пройти тест.

---

### 8. `PatternsIntroSection.jsx`
Блок, рассказывающий о типах паттернов, которые определяются тестом, с краткими описаниями каждой группы (например, паттерны времени, поведения, коммуникации, мышления).
Помогает пользователю понять структуру будущих результатов.

---

### 9. `InstructionIntroSection.jsx`
Отдельный компонент с пошаговой инструкцией по прохождению теста.
Разъясняет, как правильно отвечать на вопросы, сколько времени потребуется и на что стоит обратить внимание перед началом.

---

### 10. `ContactsIntroSection.jsx`
Компонент для отображения контактной информации организаторов/автора теста.
Включает email, Telegram, ссылки на сайт и каналы, а также кнопки для быстрого распространения ссылки на тест через мессенджеры

---

### 11. `StartTestIntroSection.jsx`
Компонент, содержащий визуальный блок с кнопкой «Начать тест» и инициирует переход к заполнению формы.

---

### 12. `ResultsScreen.jsx`
**Главный экран результатов теста.**
Принимает на вход все вычисленные данные, делегирует рендер секций:
- `ResultsHeader` — заголовок, PDF
- `HistogramSection` — гистограмма паттернов
- `InterpretationSection` — интерпретация результатов
- `LiteratureSection` — рекомендации по литературе
- `CategoryResultsSection` — подробные проценты по категориям

---

### 13. `ResultsHeader.jsx`
**Заголовок страницы результата.**
Благодарит пользователя, мотивирует, даёт кнопку "Скачать PDF".
Показывает loader и уведомление об успешной загрузке.

---

### 14. `HistogramSection.jsx`
**Отображает гистограмму паттернов.**
Визуализирует самые явно проявленные паттерны через `PatternBarChart`.

---

### 15. `PatternBarChart.jsx`
**График явно проявленных паттернов.**
Строит горизонтальные полосы по категориям, формирует легенду.

---

### 16. `InterpretationSection.jsx`
**Текстовая интерпретация результата.**
Показывает:
- топовую категорию
- топ-5 паттернов
- тип реагирования
- возможности, модель поведения, сильные стороны, общий вывод

---

### 17. `LiteratureSection.jsx`
**Рекомендации по литературе.**
Показывает полезные книги и материалы по теме паттернов.

---

### 18. `CategoryResultsSection.jsx`
**Детализация результатов по категориям.**
Для каждой подкатегории отображает проценты по паттернам, статус (ЯВНО/УМЕРЕННО/НЕЙТРАЛЬНО), индикаторы, всплывающие подсказки.

---------------

### 19. `FileManager`
**Служебный компонент для работы с файлами данных теста.**
Позволяет администратору загружать/редактировать patterns.json, questions.json.

---

### 20. `pdfIntroBlock.js`
 **1 блок pdf**
Дата и имя Зачем нужны паттерны

---

### 21. `pdfDominantPatternsBlock.js`
 **2 блок pdf**
 Явно проявленные паттерны/Гистограмма

---

### 22. `pdfCategoryPatternsBlock.js`
 **3 блок pdf**
Паттерны по категориям.
В блоке выводится название категории, описание категории, название подкатегории и паттерны с процентом выявленности.



### Utils и вспомогательные файлы

- **utils/resultsHelpers.js** — вычисления (проценты, топы, тексты).
- **utils/createResultsData.js** — агрегация данных для рендера.


- **utils/sections/** — генерация блоков для PDF и др.
- **utils/pdfmakeGenerator.js** — генерация PDF-отчёта.

---

### Данные (patterns.json, questions.json)
**public/data/**
- **patterns.json** — полная иерархия категорий, подкатегорий, паттернов и их описаний.
- **questions.json** — вопросы теста, варианты, сопоставление с паттернами.

---


## Документация и сервер

- **PATTERN_TEST_DOC.md** — документация по тесту.
- **PATTERN_TEST_Architecture.md** — структура проекта и компоненты и файлы.
- **PATTERN_TEST_PDF.md** — описание PDF-отчёта.
- **README.md** — общее описание.
- **server.js - Мини-сервер** — Express.js, хранит результаты в памяти, отдаёт по API.
 node server.js - запуск сервера по адресу http://localhost:5000