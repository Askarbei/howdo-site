import React, { useState } from 'react';
import { Plus, FileText, Download, Eye } from 'lucide-react';
import WizardModal from './WizardModal';

const Dashboard = ({ user }) => {
  const [showWizard, setShowWizard] = useState(false);
  const [documents] = useState([
    { id: 1, title: 'СОК для отдела продаж', type: 'СОК', status: 'Завершено', date: '2024-01-15' },
    { id: 2, title: 'Инструкция по работе с клиентами', type: 'Инструкция', status: 'В разработке', date: '2024-01-20' },
    { id: 3, title: 'Процедура закупок', type: 'Процедура', status: 'Завершено', date: '2024-01-10' }
  ]);

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Добро пожаловать, {user?.email}!
          </h1>
          <p className="text-slate-300">
            Управляйте своими бизнес-стандартами
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Активные</h3>
            <p className="text-3xl font-bold text-green-500">3</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">В разработке</h3>
            <p className="text-3xl font-bold text-yellow-500">1</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Завершено</h3>
            <p className="text-3xl font-bold text-blue-500">12</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <button
            onClick={() => setShowWizard(true)}
            className="bg-purple-800 border border-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Создать новый стандарт
          </button>
        </div>

        {/* Documents List */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Ваши документы</h2>
          </div>
          <div className="divide-y divide-slate-700">
            {documents.map((doc) => (
              <div key={doc.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-slate-400 mr-3" />
                  <div>
                    <h3 className="text-white font-medium">{doc.title}</h3>
                    <p className="text-slate-400 text-sm">{doc.type} • {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    doc.status === 'Завершено' ? 'bg-green-900 text-green-300' :
                    doc.status === 'В разработке' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {doc.status}
                  </span>
                  <button className="bg-slate-700 border border-purple-600 text-white p-2 rounded hover:bg-slate-600 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="bg-slate-700 border border-purple-600 text-white p-2 rounded hover:bg-slate-600 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showWizard && (
        <WizardModal onClose={() => setShowWizard(false)} />
      )}
    </div>
  );
};

export default Dashboard;
