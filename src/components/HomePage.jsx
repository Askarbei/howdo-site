import React from 'react';
import { CheckCircle, BarChart3, FileText } from 'lucide-react';

const HomePage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Самый быстрый способ построить ваш бизнес
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Превратите вашу бизнес-идею в реальность за считанные минуты.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-purple-800 border border-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Начать бесплатно
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">
                Интерактивный мастер
              </h3>
            </div>
            <p className="text-slate-300 mb-4">
              Создавайте стандарты работы через простые вопросы
            </p>
            <button className="bg-slate-700 border border-purple-600 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors">
              Подробнее
            </button>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-8 w-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">
                Личный кабинет
              </h3>
            </div>
            <p className="text-slate-300 mb-4">
              Управляйте всеми документами в одном месте
            </p>
            <button className="bg-slate-700 border border-purple-600 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors">
              Подробнее
            </button>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-purple-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">
                Экспорт в Word
              </h3>
            </div>
            <p className="text-slate-300 mb-4">
              Скачивайте готовые стандарты в удобном формате
            </p>
            <button className="bg-slate-700 border border-purple-600 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
