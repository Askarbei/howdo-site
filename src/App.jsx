import { useState } from 'react';
import './App.css';

// Main App Component
function App() {
  const [isWizardOpen, setWizardOpen] = useState(false);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [apiResponse, setApiResponse] = useState('');

  const openWizard = () => setWizardOpen(true);
  const closeWizard = () => setWizardOpen(false);
  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    closeAuth();
  };

  const handleCreateTasks = (newTasks) => {
    setTasks(newTasks);
    // Simulate API call
    setTimeout(() => {
      setApiResponse(`Tasks created successfully: ${newTasks.join(', ')}`);
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

// Header Component
function Header({ onAuthClick, isAuthenticated }) {
  return (
    <header className="app-header">
      <div className="logo">how-do</div>
      <nav>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </nav>
      <button onClick={onAuthClick} className="auth-button">
        {isAuthenticated ? 'Profile' : 'Sign In'}
      </button>
    </header>
  );
}

// Main Content Component
function MainContent({ onWizardClick }) {
  return (
    <main className="main-content">
      <h1>The fastest way to build your business</h1>
      <p>Turn your business idea into a reality in minutes.</p>
      <button onClick={onWizardClick} className="cta-button">Get Started for Free</button>
    </main>
  );
}

// Task List Component
function TaskList({ tasks }) {
    return (
        <div className="task-list-container">
            <h2>Generated Tasks:</h2>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">{task}</li>
                ))}
            </ul>
        </div>
    );
}

// API Response Display Component
function ApiResponseDisplay({ response }) {
    return (
        <div className="api-response-container">
            <h2>API Response:</h2>
            <pre className="api-response-box">{response}</pre>
        </div>
    );
}


// Wizard Modal Component
function WizardModal({ onClose, onCreateTasks }) {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [tasks, setTasks] = useState([]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleGenerateTasks = () => {
    // Simplified task generation logic
    const generatedTasks = [
      `Register domain for ${businessName}`,
      `Set up hosting for ${businessType}`,
      'Develop branding guidelines',
      'Create social media accounts',
      'Launch marketing campaign',
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

// Wizard Steps
function Step1({ nextStep, setBusinessType }) {
  return (
    <div>
      <h2>Step 1: What type of business are you starting?</h2>
      <input type="text" placeholder="e.g., E-commerce, SaaS, Blog" onChange={(e) => setBusinessType(e.target.value)} />
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

function Step2({ nextStep, prevStep, setBusinessName }) {
  return (
    <div>
      <h2>Step 2: What is the name of your business?</h2>
      <input type="text" placeholder="e.g., My Awesome Shop" onChange={(e) => setBusinessName(e.target.value)} />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}

function Step3({ prevStep, onGenerateTasks }) {
  return (
    <div>
      <h2>Step 3: Generate Task List</h2>
      <p>We will now generate a list of tasks to get your business started.</p>
      <button onClick={prevStep}>Back</button>
      <button onClick={onGenerateTasks}>Generate Tasks</button>
    </div>
  );
}

function Step4({ prevStep, onFinish, tasks }) {
  return (
    <div>
      <h2>Step 4: Review Your Tasks</h2>
      <ul>
        {tasks.map((task, index) => <li key={index}>{task}</li>)}
      </ul>
      <button onClick={prevStep}>Back</button>
      <button onClick={onFinish}>Create & Finish</button>
    </div>
  );
}


// Auth Modal Component
function AuthModal({ onClose, onLogin }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        <h2>Sign In</h2>
        <p>This is a placeholder for the authentication flow.</p>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button onClick={onLogin}>Log In</button>
      </div>
    </div>
  );
}

export default App;
