import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PatternTestEntry from "./components/pages/PatternTestEntry";
import PatternTestResultPage from "./components/pages/PatternTestResultPage";
import FileManager from "./components/FileManager";

function App() {
  return (
    <Routes>
      {/* Главная страница теста: интро, форма, вопросы, переход к результату */}
      <Route path="/" element={<PatternTestEntry />} />

      {/* Страница просмотра результата по уникальному id */}
      <Route path="/results/:id" element={<PatternTestResultPage />} />

      {/* (опционально) Служебный менеджер файлов */}
      <Route path="/files" element={<FileManager />} />

      {/* Любой другой путь ведет на старт теста */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
