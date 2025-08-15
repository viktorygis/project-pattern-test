// src/components/Sections/ResultsSections/ResultsHeader.jsx

import React, { useEffect } from 'react';
import { downloadPDF } from '../../../utils/pdf/pdfmakeGenerator';

const ResultsHeader = ({ loading, showSuccess, setShowSuccess, resultsData }) => {

	// Сохраняем resultsData в window, чтобы Playwright мог его достать
	useEffect(() => {
		if (resultsData) {
			window._resultsData = resultsData;
		}
	}, [resultsData]);

	const handleDownloadPDF = () => {
		if (loading) return;
		console.log("resultsData для PDF:", resultsData);
		downloadPDF(resultsData);
		setShowSuccess(true);
	};

	return (
		<div className="result-header">
			<div className="result-header__container">
				<div className="result-header__body">
					<h2 className="result-header__subtitle">Спасибо за ваше участие в тестировании!</h2>
					<div className="result-header__text">
						Вы сделали важный шаг к осознанию своих привычных моделей реагирования и поведения. Понимание своих паттернов помогает лучше понять, как вы
						взаимодействуете с окружающим миром, и позволяет находить баланс между личными потребностями и внешними вызовами. Используйте эту информацию
						для развития своих сильных сторон и эффективного преодоления возможных ограничений. Каждый паттерн – это ваш ресурс, который может быть
						направлен в нужное вам русло.
					</div>
					<div className="result-header__download download">
						{loading && (
							<div className="download__loader  loader">
								<div className="loader__overlay">
									<div className="loader__spinner"></div>
									<p id="loader__text">Подождите, идет генерация PDF...</p>
								</div>
							</div>
						)}

						<div className="download__title">Скачать ваш отчет в формате pdf</div>
						<button
							className="patterns-button patterns-button-download"
							onClick={handleDownloadPDF}
							disabled={loading}
						>
							Скачать PDF
						</button>
						{showSuccess && (
							<div id="successModal" className="result-header__modal modal-result-header" style={{ display: 'block' }}>
								<div className="modal-result-header__content">
									<span className="modal-result-header__close-btn" onClick={() => setShowSuccess(false)}>
										&times;
									</span>
									<p>Файл успешно скачан!</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultsHeader;