
//PatternTestResultPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ResultsScreen from "../Screens/ResultsScreen";
import {
  createResultsData,
  getTopPatterns,
  getTopCategory,
  getPatternMessage,
  getOpportunities,
  getBehaviorModel,
  getStrengths
} from "../../utils/resultsHelpers";

export default function PatternTestResultPage() {
  const { id } = useParams();
  const [resultData, setResultData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/patterns.json")
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data.categories) ? data.categories : []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    setResultData(null);

    const localData = localStorage.getItem(`test-result-${id}`);
    if (localData) {
      setResultData(JSON.parse(localData));
      setError(false);
      setLoading(false);
      return;
    }

    fetch(`/api/results/${id}`)
      .then(response => {
        if (!response.ok) throw new Error("No result");
        return response.json();
      })
      .then(data => {
        setResultData(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (error && categories.length && !resultData) {
      setResultData({
        user: {
          fullName: "Иван Иванов",
          phone: "+79998887766",
          telegram: "@ivanov",
          email: "ivan@example.com"
        },
        answers: Array(60).fill("Изобилие времени"),
        patterns: Array(60).fill("Изобилие времени")
      });
    }
  }, [error, categories, resultData]);

  // Массив паттернов
  const patternResultsStrings = useMemo(() => {
    if (Array.isArray(resultData?.patterns)) {
      return resultData.patterns.map(
        a => typeof a === "string" ? a : (a.pattern || "")
      );
    }
    // fallback: если patterns нет, используем answers (старые результаты)
    if (Array.isArray(resultData?.answers)) {
      return resultData.answers.map(
        a => typeof a === "string" ? a : (a.pattern || "")
      );
    }
    return [];
  }, [resultData]);

  const resultsData = useMemo(() => {
    if (!resultData || !categories.length) return null;
    return createResultsData({
      userData: resultData.user,
      categories,
      patternResults: patternResultsStrings
    });
  }, [resultData, categories, patternResultsStrings]);

  const topPatterns = useMemo(() => resultsData ? getTopPatterns(resultsData) : [], [resultsData]);
  const topCategory = useMemo(() => resultsData ? getTopCategory(resultsData) : null, [resultsData]);
  const patternMessage = useMemo(() => resultsData ? getPatternMessage(resultsData) : "", [resultsData]);
  const opportunities = useMemo(() => resultsData ? getOpportunities(resultsData) : "", [resultsData]);
  const behaviorModel = useMemo(() => resultsData ? getBehaviorModel(resultsData) : "", [resultsData]);
  const strengths = useMemo(() => resultsData ? getStrengths(resultsData) : "", [resultsData]);

  if (loading || !categories.length || !resultsData) {
    return <div>Загрузка...</div>;
  }

  return (
    <ResultsScreen
      resultsData={resultsData}
      answers={resultData.answers}
      patterns={patternResultsStrings}
      categories={categories}
      patternResults={resultsData.patternResults}
      topPatterns={topPatterns}
      topCategory={topCategory}
      patternMessage={patternMessage}
      opportunities={opportunities}
      behaviorModel={behaviorModel}
      strengths={strengths}
    />
  );
}