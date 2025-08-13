import React, { useState } from "react";
import OfferIntroSection from "../Sections/IntroSections/OfferIntroSection";
import PatternsIntroSection from "../Sections/IntroSections/PatternsIntroSection";
import InstructionIntroSection from "../Sections/IntroSections/InstructionIntroSection";
import ContactsIntroSection from "../Sections/IntroSections/ContactsIntroSection";
import StartTestIntroSection from "../Sections/IntroSections/StartTestIntroSection";
import FormScreen from "../Screens/FormScreen";
import QuestionsScreen from "../Screens/QuestionsScreen";

const PatternTestEntry = () => {
	const [step, setStep] = useState("intro");
	const [userData, setUserData] = useState(null);
	// answers и patterns
	const [answers, setAnswers] = useState([]);
	const [patterns, setPatterns] = useState([]);
	const [resultId, setResultId] = useState(null);
	const [error, setError] = useState("");
	const [timeDisplay, setTimeDisplay] = useState("");

	if (step === "intro") {
		return (
			<div>
				<OfferIntroSection />
				<PatternsIntroSection />
				<InstructionIntroSection />
				<ContactsIntroSection />
				<StartTestIntroSection onStart={() => setStep("form")} />
			</div>
		);
	}

	if (step === "form") {
		return (
			<FormScreen
				onSubmit={(formData) => {
					setUserData(formData);
					setTimeDisplay(new Date().toLocaleDateString("ru-RU"));
					setStep("questions");
				}}
				onBack={() => setStep("intro")}
			/>

		);
	}

	if (step === "questions") {
		return (
			<QuestionsScreen
				userData={userData}
				timeDisplay={timeDisplay}
				onComplete={({ answers, patterns }) => {
					setAnswers(answers);
					setPatterns(patterns); // Сохраняем patterns!
					setStep("loading");
					// Отправляем ответы и паттерны на сервер!
					sendResults({ userData, answers, patterns, date: timeDisplay });
				}}
				onBack={() => setStep("form")}
			/>
		);
	}

	if (step === "loading") {
		return <div style={{ textAlign: "center", marginTop: 40 }}>Сохраняем ваши результаты...</div>;
	}

	if (step === "resultLink") {
		if (error) {
			return (
				<div style={{ color: "red", textAlign: "center", marginTop: 40 }}>
					Ошибка при сохранении: {error}
					<br />
					<button onClick={() => setStep("questions")}>Попробовать ещё раз</button>
				</div>
			);
		}
		return (
			<div className="test-completed" style={{ textAlign: "center", marginTop: 40 }}>
				<div className="test-completed__container">
					<div className="test-completed__body">
						<h2 className="test-completed__title">Тест завершен! </h2>
						<h3 className="test-completed__subtitle">Спасибо за участие в исследовании паттернов!</h3>
						<p className="test-completed__text">Ваши результаты тестирования доступны по ссылке:</p>
						<a className="patterns-button "
							href={`/pattern-test/results/${resultId}`}

						>
							{/* {window.location.origin + `/pattern-test/results/${resultId}`} */}
							Посмотреть результат
						</a>
						<br />
					{/* 	Пройти тест ещё раз */}
						{/* 	<button className="patterns-button patterns-button-primary" style={{ marginTop: 30 }} onClick={() => setStep("intro")}>Пройти тест ещё раз</button> */}
					</div>
				</div>
			</div>
		);
	}

	// ------- UTILS -------
	function sendResults({ userData, answers, patterns, date }) {
		setError("");
		setResultId(null);
		fetch("/api/pattern-test/submit", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user: userData, answers, patterns, date })
		})
			.then(async (res) => {
				if (!res.ok) throw new Error("Ошибка сервера");
				const data = await res.json();
				if (!data.id) throw new Error("Не получен ID результата");
				localStorage.setItem(
					`test-result-${data.id}`,
					JSON.stringify({ user: userData, answers, patterns, date })
				);
				setResultId(data.id);
				setStep("resultLink");
			})
			.catch((err) => {
				setError(err.message || "Ошибка отправки");
				setStep("resultLink");
			});
	}


	// ------- /UTILS -------

	return null;
};

export default PatternTestEntry;