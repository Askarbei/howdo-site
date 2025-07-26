import React, { useState } from 'react';
import './App.css';

// Это наше основное приложение
function App() {
  // Состояния для управления модальными окнами и аутентификацией
  const [isWizardOpen, setWizardOpen] = useState(false);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [apiResponse, setApiResponse] = useState('');

  // Функции для открытия и закрытия модальных окон
  const openWizard = () => setWizardOpen(true);
  const closeWizard = () => setWizardOpen(false);
  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  // Функция для "входа в систему"
  const handleLogin = () => {
    setIsAuthenticated(true);
    closeAuth();
  };

  // Функция для "создания задач"
  const handleCreateTasks = (newTasks) => {
    setTasks(newTasks);
    // Имитация вызова API
    setTimeout(() => {
      setApiResponse(`Задачи успешно созданы: ${newTasks.join(', ')}`);
    }, 1000);
  };

  return (
    <div className="app-container">
      <Header onAuthClick={openAuth} isAuthenticated={isAuthenticated} />
      <MainContent onWizardClick={openWizard} />
      {tasks.length > 0 && <TaskList tasks={tasks} />}
      {apiResponse && <ApiResponseDisplay response={apiResponse} />}
      {isWizardOpen && <WizardModal onClose={closeWizard} onCreateTasks={handleCreateTasks} />}
      {isAuthOpen && <AuthModal onClose={closeAuth} onLogin={handleLogin} />}
    </div>
  );
}

// Компонент "Шапка сайта"
function Header({ onAuthClick, isAuthenticated }) {
  return (
    <header className="app-header">
      <div className="logo">HowDo</div>
      <nav>
        <a href="#features">Возможности</a>
        <a href="#pricing">Цены</a>
        <a href="#contact">Контакты</a>
      </nav>
      <button onClick={onAuthClick} className="auth-button">
        {isAuthenticated ? 'Профиль' : 'Войти'}
      </button>
    </header>
  );
}

// Компонент "Основной контент"
function MainContent({ onWizardClick }) {
  return (
    <main className="main-content">
      <h1>Самый быстрый способ построить ваш бизнес</h1>
      <p>Превратите вашу бизнес-идею в реальность за считанные минуты.</p>
      <button onClick={onWizardClick} className="cta-button">Начать бесплатно</button>
    </main>
  );
}

// Компонент "Список задач"
function TaskList({ tasks }) {
    return (
        <div className="task-list-container">
            <h2>Сгенерированные задачи:</h2>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">{task}</li>
                ))}
            </ul>
        </div>
    );
}

// Компонент "Ответ API"
function ApiResponseDisplay({ response }) {
    return (
        <div className="api-response-container">
            <h2>Ответ от сервера:</h2>
            <pre className="api-response-box">{response}</pre>
        </div>
    );
}


// Компонент "Мастер создания (Визард)"
function WizardModal({ onClose, onCreateTasks }) {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [tasks, setTasks] = useState([]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleGenerateTasks = () => {
    // Упрощенная логика генерации задач
    const generatedTasks = [
      `Зарегистрировать домен для "${businessName}"`,
      `Настроить хостинг для "${businessType}"`,
      'Разработать брендбук',
      'Создать аккаунты в социальных сетях',
      'Запустить маркетинговую кампанию',
    ];
    setTasks(generatedTasks);
    nextStep();
  };

  const handleFinish = () => {
    onCreateTasks(tasks);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        {step === 1 && <Step1 nextStep={nextStep} setBusinessType={setBusinessType} />}
        {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} setBusinessName={setBusinessName} />}
        {step === 3 && <Step3 prevStep={prevStep} onGenerateTasks={handleGenerateTasks} />}
        {step === 4 && <Step4 prevStep={prevStep} onFinish={handleFinish} tasks={tasks} />}
      </div>
    </div>
  );
}

// Шаги Визарда
function Step1({ nextStep, setBusinessType }) {
  return (
    <div>
      <h2>Шаг 1: Какой тип бизнеса вы начинаете?</h2>
      <input type="text" placeholder="Например, E-commerce, SaaS, Блог" onChange={(e) => setBusinessType(e.target.value)} />
      <button onClick={nextStep}>Далее</button>
    </div>
  );
}

function Step2({ nextStep, prevStep, setBusinessName }) {
  return (
    <div>
      <h2>Шаг 2: Как называется ваш бизнес?</h2>
      <input type="text" placeholder="Например, Мой Супер Магазин" onChange={(e) => setBusinessName(e.target.value)} />
      <button onClick={prevStep}>Назад</button>
      <button onClick={nextStep}>Далее</button>
    </div>
  );
}

function Step3({ prevStep, onGenerateTasks }) {
  return (
    <div>
      <h2>Шаг 3: Генерация списка задач</h2>
      <p>Сейчас мы сгенерируем список задач для запуска вашего бизнеса.</p>
      <button onClick={prevStep}>Назад</button>
      <button onClick={onGenerateTasks}>Сгенерировать задачи</button>
    </div>
  );
}

function Step4({ prevStep, onFinish, tasks }) {
  return (
    <div>
      <h2>Шаг 4: Проверьте ваш список задач</h2>
      <ul>
        {tasks.map((task, index) => <li key={index}>{task}</li>)}
      </ul>
      <button onClick={prevStep}>Назад</button>
      <button onClick={onFinish}>Создать и завершить</button>
    </div>
  );
}


// Компонент "Модальное окно аутентификации"
function AuthModal({ onClose, onLogin }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        <h2>Вход в систему</h2>
        <p>Это заглушка для процесса аутентификации.</p>
        <input type="email" placeholder="Электронная почта" />
        <input type="password" placeholder="Пароль" />
        <button onClick={onLogin}>Войти</button>
      </div>
    </div>
  );
}

export default App;
