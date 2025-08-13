//src/components/Screens/QuestionsScreen.jsx

import React, { useState, useEffect } from 'react';

function shuffleArray(array) {
	const arr = array.slice();
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function shuffleOptionsAndPatterns(options, patterns) {
	const pairs = options.map((option, i) => ({
		option,
		pattern: patterns[i],
	}));
	const shuffled = shuffleArray(pairs);
	return {
		options: shuffled.map(p => p.option),
		patterns: shuffled.map(p => p.pattern),
	};
}

const QuestionsScreen = ({
	questionsUrl = '/pattern-test/data/questions.json',
	onComplete,
	userData,
	timeDisplay = ''
}) => {

	const fullName = userData?.fullName || "";

	useEffect(() => {
		console.log("QuestionsScreen mounted");
	}, []);


	useEffect(() => {
		fetch('/pattern-test/data/questions.json')
			.then(r => r.text())
			.then(txt => {
				try {
					const data = JSON.parse(txt);

				} catch (e) {

				}
			});
	}, []);
	// questions: [{ question, options, patterns }]
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [userPatterns, setUserPatterns] = useState([]);
	const [showError, setShowError] = useState(false);
	const [selected, setSelected] = useState(null);
	const [error, setError] = useState('');

	// Загрузка и перемешивание вопросов
	useEffect(() => {
		const loadQuestions = async () => {
			try {
				setLoading(true);
				setError('');
				const response = await fetch(questionsUrl);
				if (!response.ok) throw new Error(`Ошибка HTTP: статус ${response.status}`);
				const data = await response.json();
				if (
					!Array.isArray(data.questionsWithPatterns) ||
					data.questionsWithPatterns.length === 0
				) {
					throw new Error('Данные тестов не найдены.');
				}
				// Перемешиваем вопросы и варианты
				const shuffled = shuffleArray(data.questionsWithPatterns.map(q => ({
					...q,
					// Перемешиваем опции и patterns синхронно
					...shuffleOptionsAndPatterns(q.options, q.patterns),
				})));
				setQuestions(shuffled);
				setUserAnswers([]);
				setUserPatterns([]);
				setCurrentQuestionIndex(0);
				setSelected(null);
			} catch (err) {
				setError(err.message || 'Ошибка загрузки вопросов');
			} finally {
				setLoading(false);
			}
		};
		loadQuestions();
	}, [questionsUrl]);

	// Обновление выбора при смене вопроса
	useEffect(() => {
		setSelected(userAnswers[currentQuestionIndex] ?? null);
		setShowError(false);
	}, [currentQuestionIndex, userAnswers]);

	// Обработка выбора
	const handleSelect = (option) => {
		setSelected(option);
		setShowError(false);
	};

	// Следующий вопрос или завершение
	const handleNext = () => {
		if (selected == null) {
			setShowError(true);
			return;
		}

		// Сохраняем ответ и паттерн
		const answerArr = [...userAnswers];
		const patternArr = [...userPatterns];
		answerArr[currentQuestionIndex] = selected;

		// Определяем индекс выбранного варианта для паттерна
		const question = questions[currentQuestionIndex];
		const selectedIdx = question.options.indexOf(selected);
		patternArr[currentQuestionIndex] = question.patterns[selectedIdx];

		setUserAnswers(answerArr);
		setUserPatterns(patternArr);

		if (currentQuestionIndex + 1 < questions.length) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			// Передаем ответы и паттерны
			if (onComplete) onComplete({ answers: answerArr, patterns: patternArr });
		}
	};

	// Назад
	const handleBack = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
			setShowError(false);
		}
	};

	// Повторить тест
	const handleReload = () => {
		setQuestions([]);
		setLoading(true);
		setError('');
		setCurrentQuestionIndex(0);
		setUserAnswers([]);
		setUserPatterns([]);
		setSelected(null);
	};

	// Тестовая кнопка: заполнить все ответы автоматически и перейти к результатам
/* 	const handleFillTestAnswers = () => {
		if (!questions.length) return;
		const autoAnswers = questions.map(q => q.options[0] ?? '');
		const autoPatterns = questions.map(q => q.patterns[0] ?? '');
		if (onComplete) onComplete({ answers: autoAnswers, patterns: autoPatterns });
	}; */

	if (loading) {
		return (
			<div className="question-test" style={{ display: 'block' }}>
				<div className="question-test__container"><div className="question-header">
					<div id="fio-display">ФИО: <span>{fullName}</span></div>
					<div id="time-display">Дата: <span>{timeDisplay}</span></div>
				</div>
					<div className="question-test__content">
						<div className="question__loader-test" style={{ display: 'block', textAlign: 'center' }}>
							<span></span>
							<div>Загрузка вопросов...</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="question-test" style={{ display: 'block' }}>
				<div className="question-test__container">
					<div className="question-test__content">
						<div className="error-message" style={{ color: '#dc2626', marginTop: 10 }}>{error}</div>
						<button className="patterns-button" onClick={handleReload}>Повторить попытку</button>
					</div>
				</div>
			</div>
		);
	}

	// Главная защита от выхода за пределы массива вопросов
	const question = questions[currentQuestionIndex];
	if (!questions.length || !question) return null;

	return (
		<div className="question-test">
			<div className="question-test__container">
				<div className="question-test__content">
					{/* Верхний блок с ФИО и временем */}
					<div className="question-test__info">
						<div id="fio-display" className="question-block__item">
							ФИО: <span>{fullName}</span>
						</div>
						<div id="time-display" className="question-block__item">
							Дата: <span>{timeDisplay}</span>
						</div>
					</div>

					{/* Счетчик вопроса */}
					<div className="question-test__counter">
						Вопрос {currentQuestionIndex + 1} из {questions.length}
					</div>

					<div className="question-test__block">

						<div className="question-test__question">{question.question}</div>
						<div className="question-test__options" >
							{question.options.map((option, i) => (
								<label className="question-test__option" key={i}>
									<input
										type="radio"
										name={`answer_${currentQuestionIndex}`}
										value={option}
										checked={selected === option}
										onChange={() => handleSelect(option)}
										tabIndex={0}
									/>
									<span className="question-test__radio-label">{option}</span>
								</label>
							))}

						</div>
						{/* Сообщение об ошибке */}
						<div
							id="error-message"
							className="error-message"
							style={{
								display: showError ? 'block' : 'none',
								color: '#dc2626',
								marginTop: 10,
							}}
						>
							Пожалуйста, выберите вариант ответа!
						</div>

						{/* Кнопки навигации */}
						<div className="question-test__navigation">
							<button
								className="patterns-button patterns-button-prev"
								id="prev-button"
								type="button"
								onClick={handleBack}
								disabled={currentQuestionIndex === 0}
							>
								Назад
							</button>
							<button
								className="patterns-button patterns-button-next"
								id="next-button"
								type="button"
								onClick={handleNext}
							>
								{currentQuestionIndex + 1 < questions.length ? 'Далее' : 'Завершить'}
							</button>
						</div>


					</div>
					{/* --- Тестовая кнопка --- */}
					{/* <button
						className="patterns-button"
						type="button"
						style={{ margin: '20px auto', display: 'block' }}
						onClick={handleFillTestAnswers}
					>
						Заполнить тестовые ответы
					</button> */}
					{/* --- Конец тестовой кнопки --- */}
				</div>
			</div>
		</div>
	);
};

export default QuestionsScreen;