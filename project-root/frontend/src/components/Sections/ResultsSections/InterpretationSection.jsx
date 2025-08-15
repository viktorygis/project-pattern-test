//project-root\frontend\src\components\Sections\ResultsSections\InterpretationSection.jsx
import React, { useEffect } from 'react';

const InterpretationSection = ({
	topCategory,
	patternMessage,
	topPatterns,
	responseType,
	opportunities,
	behaviorModel,
	strengths,
}) => {

	// Логируем значения для отладки
	useEffect(() => {
		console.log('[InterpretationSection] topCategory:', topCategory);
		console.log('[InterpretationSection] responseType:', responseType);
		console.log('[InterpretationSection] topPatterns:', topPatterns);
	}, [topCategory, responseType, topPatterns]);

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
									{(topCategory && topCategory.title) || 'Паттерны коммуникации'}
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
										{(topPatterns || [
											'Будущее',
											'Долгосрочная мотивация',
											'Защищать границы',
											'Быть',
											'Прямая коммуникация',
										]).map((p, i) => (
											<li className="interpretation__pattern-item" key={i}>
												{p}
											</li>
										))}
									</ul>

								</div>
							</div>
							{/* Тип реагирования */}
							{/* 			<div className="interpretation__section">
								<h3 className="interpretation__section-title">Тип реагирования</h3>
								<h3 className="interpretation__section-subtitle">
									{responseType || 'Моноактивный'}
								</h3>
								<div className="interpretation__list-item">
									Вы склонны сосредотачиваться на выполнении одной задачи или активности за раз, фокусируясь на ней до полного завершения. Вы
									предпочитаете глубоко погружаться в процесс, уделяя внимание деталям и качеству выполнения.
								</div> */}
							{/* --- Отладочный блок для типа реагирования --- */}
							{/* 		<div style={{ color: 'gray', fontSize: '12px', marginTop: '10px' }}>
									Лог responseType: <b>{String(responseType)}</b>
								</div>
							</div> */}
							{/* Возможности и ограничения */}
							{/* 				<div className="interpretation__section">
								<h3 className="interpretation__section-title">Возможности и ограничения</h3>
								<div className="interpretation__list-item">
									{opportunities ||
										'Вы обладаете способностью сосредотачиваться на одной задаче, что позволяет вам достигать высоких результатов, однако это может также приводить к трудностям в multitasking (многозадачности).'}
								</div>
							</div> */}
							{/* Ваша модель поведения */}
							{/* 		<div className="interpretation__section">
								<h3 className="interpretation__section-title">Ваша модель поведения</h3>
								<div className="interpretation__list-item">
									{behaviorModel ||
										'Вы предпочитаете прорабатывать каждую задачу до конца, что создает устойчивые результаты, однако вам может быть сложно переключаться между задачами.'}
								</div>
							</div> */}
							{/* Сильные стороны */}
							{/* 			<div className="interpretation__section">
								<h3 className="interpretation__section-title">Сильные стороны</h3>
								<div className="interpretation__list-item">
									{strengths ||
										'Ваше внимание к деталям и стремление к качеству выполнения задач делают вас ценным членом команды. Вы способны погружаться в процесс и достигать глубокого понимания.'}
								</div>
							</div> */}
							{/* Ваши паттерны говорят */}
							{/* 			<div className="interpretation__section interpretation__section_results">
								<h3 className="interpretation__section-title">Ваши паттерны говорят</h3>
								<div className="interpretation__list-item">
									{patternMessage ||
										'Ваша краткосрочная стратегия заключается в том, чтобы использовать свои сильные стороны для максимально эффективного достижения текущих целей. Вы стремитесь сосредотачиваться на одной задаче, что позволяет вам глубоко погружаться в процесс и добиваться качественных результатов. При этом вы сохраняете внимание к деталям, выстраиваете четкие границы и придерживаетесь прямой и ясной коммуникации. Такой подход помогает вам не только решать поставленные задачи, но и создавать прочную основу для дальнейших достижений в долгосрочной перспективе.'}
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InterpretationSection;