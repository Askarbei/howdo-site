import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const WizardModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [answers, setAnswers] = useState({});

  const documentTypes = [
    { id: 'sok', name: 'СОК (Стандарт операционной карты)', description: 'Пошаговые инструкции для выполнения операций' },
    { id: 'instruction', name: 'Рабочая инструкция', description: 'Детальное описание рабочих процессов' },
    { id: 'procedure', name: 'Стандарт процедуры', description: 'Формализованные процедуры и правила' }
  ];

  const questions = [
    'Название вашей компании?',
    'В какой сфере работает ваша компания?',
    'Какой процесс вы хотите стандартизировать?',
    'Кто будет использовать этот стандарт?',
    'Какие основные этапы включает процесс?',
    'Какие инструменты или ресурсы необходимы?',
    'Какие результаты должны быть достигнуты?'
  ];

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    try {
      // Получаем userId из localStorage (где он сохраняется после логина)
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = userData.id;

      if (!userId) {
        alert('Ошибка: пользователь не авторизован');
        return;
      }

      // Преобразуем answers в правильный формат для backend
      const formattedAnswers = {};
      Object.keys(answers).forEach((key, index) => {
        formattedAnswers[`q${parseInt(key) + 1}`] = answers[key];
      });

      const response = await fetch('https://api.howdo.it.com/api/wizard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,           // ← ДОБАВЛЕНО!
          answers: formattedAnswers // ← ИСПРАВЛЕНО!
        } ),
      });

      if (response.ok) {
        alert('Стандарт создан успешно!');
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Ошибка создания стандарта: ${errorData.error || 'Неизвестная ошибка'}`);
      }
    } catch (error) {
      alert('Ошибка подключения к серверу');
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Мастер создания стандарта
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Шаг {currentStep + 1} из {questions.length + 1}</span>
            <span>{Math.round(((currentStep + 1) / (questions.length + 1)) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / (questions.length + 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          {currentStep === 0 ? (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Выберите тип документа
              </h3>
              <div className="space-y-3">
                {documentTypes.map((type) => (
                  <label key={type.id} className="block">
                    <input
                      type="radio"
                      name="documentType"
                      value={type.id}
                      checked={selectedType === type.id}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedType === type.id 
                        ? 'border-purple-500 bg-purple-900/20' 
                        : 'border-slate-600 hover:border-slate-500'
                    }`}>
                      <h4 className="text-white font-medium">{type.name}</h4>
                      <p className="text-slate-400 text-sm mt-1">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {questions[currentStep - 1]}
              </h3>
              <textarea
                value={answers[currentStep - 1] || ''}
                onChange={(e) => setAnswers({...answers, [currentStep - 1]: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 h-32 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Введите ваш ответ..."
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="bg-slate-700 border border-purple-600 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад
          </button>

          {currentStep === questions.length ? (
            <button
              onClick={handleFinish}
              className="bg-purple-800 border border-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Создать стандарт
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentStep === 0 && !selectedType}
              className="bg-purple-800 border border-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              Далее
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WizardModal;
