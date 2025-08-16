import React, { useEffect, useState } from 'react';

const DEFAULT_TYPE = 'Моноактивный';

const InterpretationSection = ({
	topCategory,
	patternMessage,
	topPatterns,
	responseType,
	opportunities,
	behaviorModel,
	strengths,
}) => {
	const [responseTypeTexts, setResponseTypeTexts] = useState(null);

	useEffect(() => {
		fetch('/pattern-test/data/responseTypes.json')
			.then(res => res.json())
			.then(data => setResponseTypeTexts(data))
			.catch(() => setResponseTypeTexts(null));
	}, []);

	// Логируем значения для отладки
	useEffect(() => {
		console.log('[InterpretationSection] topCategory:', topCategory);
		console.log('[InterpretationSection] responseType:', responseType);
		console.log('[InterpretationSection] topPatterns:', topPatterns);
		console.log('[InterpretationSection] responseTypeTexts:', responseTypeTexts);
	}, [topCategory, responseType, topPatterns, responseTypeTexts]);

	const safeResponseType = responseType || DEFAULT_TYPE;

	if (!responseTypeTexts) {
		return <div>Загрузка...</div>;
	}

	return (
		<div className="interpretation">
			<div className="interpretation__container">
				<div className="interpretation__body">
					<h2 className="interpretation__title">Интерпретация вашего теста</h2>
					<div className="interpretation__content">
						<div className="interpretation__sections">
							{/* 	Наиболее выраженная категория паттернов */}
							<div className="interpretation__section">
								<h3 className="interpretation__section-title">
									Наиболее выраженная <br />
									категория паттернов
								</h3>
								<h3 className="interpretation__section-subtitle">
									{(topCategory && topCategory.title) || 'Не выявлены'}
								</h3>
								<div className="interpretation__list-item">
									{patternMessage ||
										'Ваш стиль общения имеет центральное значение в вашем взаимодействии с окружающими. Это может указывать на то, что вы уделяете особое внимание тому, как выражаете свои мысли и чувства, а также как воспринимаете коммуникацию других. Вы, скорее всего, считаете важным устанавливать контакт и поддерживать открытые каналы связи, что способствует созданию продуктивных и доверительных отношений.'}
								</div>
							</div>
							{/* Ведущие паттерны */}
							<div className="interpretation__section">
								<h3 className="interpretation__section-title">Ведущие паттерны</h3>
								<h3 className="interpretation__section-subtitle">Топ 5 паттернов</h3>
								<div className="interpretation__list-item">
									<ul className="interpretation__pattern-list">
										{(topPatterns || ["Не выявлены"]).map((p, i) => (
											<li className="interpretation__pattern-item" key={i}>
												{p}
											</li>
										))}
									</ul>

								</div>
							</div>
							{/* Тип реагирования */}
							<div className="interpretation__section">
								<h3 className="interpretation__section-title">Тип реагирования</h3>
								<h3 className="interpretation__section-subtitle">
									{safeResponseType}
								</h3>
								<div className="interpretation__list-item">
									{responseTypeTexts[safeResponseType].description}
								</div>
							</div>
							{/* Возможности и ограничения */}
							<div className="interpretation__section">
								<h3 className="interpretation__section-title">Возможности и ограничения</h3>

								<div
									className="interpretation__list-item"
									dangerouslySetInnerHTML={{ __html: responseTypeTexts[safeResponseType].opportunities }}
								/>
							</div>
							{/* Ваша модель поведения */}
							<div className="interpretation__section">
								<h3 className="interpretation__section-title">Ваша модель поведения</h3>
								<div
									className="interpretation__list-item"
									dangerouslySetInnerHTML={{
										__html: responseTypeTexts[safeResponseType].behaviorModel
									}}
								/>
							</div>
							{/* Сильные стороны */}
							<div className="interpretation__section">
								<h3 className="interpretation__section-title">Сильные стороны</h3>
								<div
									className="interpretation__list-item"
									dangerouslySetInnerHTML={{
										__html: responseTypeTexts[safeResponseType].strengths
									}}
								/>
							</div>
							{/* Ваши паттерны говорят */}
							<div className="interpretation__section interpretation__section_results">
								<h3 className="interpretation__section-title">Ваши паттерны говорят</h3>
								<div
									className="interpretation__list-item"
									dangerouslySetInnerHTML={{
										__html: responseTypeTexts[safeResponseType].patternsSummary
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InterpretationSection;