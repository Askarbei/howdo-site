import React, { useState, useEffect } from 'react';
import { Plus, FileText, Download, Eye } from 'lucide-react';
import WizardModal from './WizardModal';

const Dashboard = ({ user }) => {
  const [showWizard, setShowWizard] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  // Загрузка документов пользователя
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('https://api.howdo.it.com/api/documents', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token' )}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents || []);
      } else {
        console.error('Ошибка загрузки документов');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    } finally {
      setLoading(false);
    }
  };

  // Функция скачивания документа
  const handleDownload = async (documentId, documentTitle) => {
    setDownloadingId(documentId);
    
    try {
      const response = await fetch(`https://api.howdo.it.com/api/export/${documentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token' )}`
        }
      });

      if (response.ok) {
        // Получаем blob данные
        const blob = await response.blob();
        
        // Определяем тип файла из заголовков
        const contentType = response.headers.get('content-type');
        const isHTML = contentType && contentType.includes('text/html');
        
        // Создаем ссылку для скачивания
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Устанавливаем имя файла
        const extension = isHTML ? '.html' : '.pdf';
        const fileName = `${documentTitle.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')}${extension}`;
        link.download = fileName;
        
        // Запускаем скачивание
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Освобождаем память
        window.URL.revokeObjectURL(url);
        
        console.log('Документ скачан успешно!');
      } else {
        const errorData = await response.json();
        alert(`Ошибка экспорта: ${errorData.error || 'Неизвестная ошибка'}`);
      }
    } catch (error) {
      console.error('Ошибка скачивания:', error);
      alert('Ошибка подключения к серверу');
    } finally {
      setDownloadingId(null);
    }
  };

  // Функция предварительного просмотра
  const handlePreview = async (documentId) => {
    try {
      const url = `https://api.howdo.it.com/api/export/${documentId}/preview`;
      window.open(url, '_blank' );
    } catch (error) {
      console.error('Ошибка предварительного просмотра:', error);
      alert('Ошибка открытия предварительного просмотра');
    }
  };

  // Подсчет статистики
  const stats = {
    active: documents.filter(doc => doc.status !== 'Завершено').length,
    inProgress: documents.filter(doc => doc.status === 'В разработке').length,
    completed: documents.filter(doc => doc.status === 'Завершено').length
  };

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
            <p className="text-3xl font-bold text-green-500">{stats.active}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">В разработке</h3>
            <p className="text-3xl font-bold text-yellow-500">{stats.inProgress}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Завершено</h3>
            <p className="text-3xl font-bold text-blue-500">{stats.completed}</p>
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
          
          {loading ? (
            <div className="px-6 py-8 text-center text-slate-400">
              Загрузка документов...
            </div>
          ) : documents.length === 0 ? (
            <div className="px-6 py-8 text-center text-slate-400">
              У вас пока нет документов. Создайте первый стандарт!
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {documents.map((doc) => (
                <div key={doc.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-slate-400 mr-3" />
                    <div>
                      <h3 className="text-white font-medium">{doc.title}</h3>
                      <p className="text-slate-400 text-sm">
                        {doc.document_type === 'sok' ? 'СОК' : 
                         doc.document_type === 'instruction' ? 'Инструкция' : 'Процедура'} • 
                        {new Date(doc.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 rounded text-xs bg-green-900 text-green-300">
                      Завершено
                    </span>
                    <button 
                      onClick={() => handlePreview(doc.id)}
                      className="bg-slate-700 border border-purple-600 text-white p-2 rounded hover:bg-slate-600 transition-colors"
                      title="Предварительный просмотр"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDownload(doc.id, doc.title)}
                      disabled={downloadingId === doc.id}
                      className="bg-slate-700 border border-purple-600 text-white p-2 rounded hover:bg-slate-600 transition-colors disabled:opacity-50"
                      title="Скачать документ"
                    >
                      {downloadingId === doc.id ? (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showWizard && (
        <WizardModal 
          onClose={() => setShowWizard(false)} 
          onSuccess={() => {
            setShowWizard(false);
            fetchDocuments(); // Обновляем список документов
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
