// src/components/Sections/ResultsSections/LiteratureSection.jsx

import React from 'react';

const LiteratureSection = () => (
	<div className="literature">
		<div className="literature__container">
			<div className="literature__body">
				<h2 className="literature__title">Литература</h2>
				<h2 className="literature__text">Подробнее о паттернах можно прочитать в приведённых ниже источниках.</h2>
				<ol className="literature__list">
					<div className="literature__column">
						<li className="literature__item">Аузан А. А. Культурные коды экономики. – М.: Альпина Паблишер, 2022. – 284 с.</li>
						<li className="literature__item">
							Гестеланд Р. Р. Кросс-культурное поведение в бизнесе: маркетинговые исследования. – Днепропетровск: Баланс Бизнес Букс, 2003. – 280 с.
						</li>
						<li className="literature__item">
							Ливермор Д. Культурный интеллект. Как выжить и преуспеть в мультикультурном мире. – М.: Манн, Иванов и Фербер, 2023. – 320 с.
						</li>
						<li className="literature__item">Льюис Р. Д. Деловые культуры в международном бизнесе. – М.: Дело, 2001. – 448 с.</li>
						<li className="literature__item">Льюис Р. Д. Столкновение команд. – М.: Альпина Паблишер, 2013. – 352 с.</li>
					</div>
					<div className="literature__column">
						<li className="literature__item">
							Мейер Э. Карта культурных различий. Как научиться понимать представителей других стран и избегать ложных стереотипов. – М.: Альпина
							Паблишер, 2019. – 376 с.
						</li>
						<li className="literature__item">Росински Ф. Кросс-культурный коучинг. – М.: Эксмо, 2020. – 320 с.</li>
						<li className="literature__item">
							Тромпенаарс Ф., Хампден-Тернер Ч. Национально-культурные различия в контексте глобального бизнеса. – Мн.: ООО «Попурри», 2004. – 528
							с.
						</li>
						<li className="literature__item">
							Hofstede G., Hofstede G. J., Minkov M. Cultures and Organizations: Software of the Mind. 3rd ed. – New York: McGraw-Hill, 2010. – 561
							p.
						</li>
					</div>
				</ol>
			</div>
		</div>
	</div>
);

export default LiteratureSection;