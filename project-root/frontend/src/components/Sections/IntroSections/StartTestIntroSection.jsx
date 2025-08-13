import React from 'react';

const StartTestIntroSection = ({ onStart }) => (
  <div>
    <div id="button-hipe-test"></div>
    <div className="trek" id="trek">
      <div className="trek__container">
        <div className="trek__body">
          <h2 className="trek__title">Перейти к тестированию</h2>
          <img src="pattern-test/img/test-patterns/fairway-example.svg" alt="Пример фарватера" />
          <button
            id="trek-button"
            className="trek__button patterns-button patterns-button-primary"
            onClick={onStart}
          >
            Пройти тест
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default StartTestIntroSection;