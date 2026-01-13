import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';

const Home = () => (
    <div className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Support Chatbot</h1>
        <a href="/login" className="text-blue-500 hover:text-blue-700 underline text-lg">Login to get started</a>
    </div>
);

const Dashboard = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your protected dashboard!</p>
    </div>
);

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-gray-50">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            {/* <Route path="/chat" element={<Chat />} /> */}
                        </Route>
                    </Routes>
                    <ToastContainer position="top-right" autoClose={3000} />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
