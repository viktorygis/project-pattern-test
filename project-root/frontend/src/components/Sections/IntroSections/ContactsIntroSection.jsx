import React from 'react';
const ContactsIntroSection = () => {
	return (
		<div className="share">
			<div className="share__container">
				<div className="share__body">
					<h2 className="share__title">Контакты</h2>
					<div className="share__subtitle">
						По лю­бым возни­кающим вопро­сам можно свя­заться с авто­ром проек­та Еленой Семеновой
					</div>

					<ContactList />

					<SocialShare />
				</div>
			</div>
		</div>
	);
};

const ContactList = () => (
	<div className="share__list">
		<ContactItem label="email Елены Семеновой:" value={<a href="mailto:es@ai4g.ru">es@ai4g.ru</a>} />
		<ContactItem label="email проекта:" value={<a href="mailto:info@ai4g.ru">info@ai4g.ru</a>} />
		<ContactItem label="Ник в телеграм:" value="@SemenovaElena" />
		<ContactItem label="Канал в телеграм:"
			value={<a href="https://t.me/life_watch" target="_blank" rel="noopener noreferrer">@life_watch</a>} />
		<ContactItem label="Сайт:"
			value={<a href="https://coachsemenova.com/" target="_blank" rel="noopener noreferrer">www.coachsemenova.com</a>} />
	</div>
);

const ContactItem = ({ label, value }) => (
	<>
		<div>{label}</div>
		<div>{value}</div>
	</>
);

const SocialShare = () => (
	<>
		<div className="share__subtitle">Поделиться ссылкой на тестирование:</div>
		<div className="share__block">
			<SocialButton
				title="telegram"
				href="https://t.me/share/url?url=https://ai4g.ru/pattern-test&text=Пройдите%20тест%20паттернов!%20Вы%20узнаете,%20как%20реагировать,%20какие%20чувства%20и%20мысли%20у%20вас%20возникают,%20и%20как%20это%20влияет%20на%20ваши%20результаты.%20А%20ещё%20вы%20откроете%20для%20себя%20новые%20возможности!"
				icon="telegram.svg"
				alt="Telegram"
			/>
			<SocialButton
				title="whatsapp"
				href="https://api.whatsapp.com/send?text=Пройдите%20тест%20паттернов.%20Вы%20узнаете,%20как%20реагировать,%20какие%20чувства%20и%20мысли%20у%20вас%20возникают,%20и%20как%20это%20влияет%20на%20ваши%20результаты.%20А%20ещё%20вы%20откроете%20для%20себя%20новые%20возможности!%20Ссылка:%20https://ai4g.ru/pattern-test"
				icon="whatsapp.svg"
				alt="WhatsApp"
			/>
		</div>
	</>
);

const SocialButton = ({ title, href, icon, alt }) => (
	<a className="share__button" title={title} target="_blank" rel="noopener noreferrer" href={href}>
		<img src={`pattern-test/img/test-patterns/${icon}`} alt={alt} />
	</a>
);

export default ContactsIntroSection;