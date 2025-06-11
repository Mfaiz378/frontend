import React from 'react';
import './Home.css';

const Header = () => (
  <header className="main-header">
    <nav>
      <span className="logo">Healthbot</span>
      <div>
        <a href="/">Home</a>
        <a href="/hospitals">Hospital View</a>
        <a href="/chatbot">Chatbot</a>
      </div>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="main-footer">
    <p>&copy; {new Date().getFullYear()} Healthbot. All rights reserved.</p>
  </footer>
);

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1>Welcome to Healthbot</h1>
      <p>
        Healthbot is your intelligent healthcare companion. Instantly find nearby hospitals, chat with our AI-powered assistant for health advice, and access essential medical resources—all in one place.
      </p>
      <section className="chatbot-section">
        <h2>Why Use Our Chatbot?</h2>
        <div className="chatbot-features">
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1519494080410-f9aa8f52f1e1?auto=format&fit=crop&w=400&q=80" alt="24/7 Support" />
            <h3>24/7 Health Support</h3>
            <p>
              Our chatbot is available round the clock to answer your health queries, provide first-aid tips, and guide you to the right care—anytime, anywhere.
            </p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Personalized Advice" />
            <h3>Personalized Advice</h3>
            <p>
              Get tailored health suggestions based on your symptoms and history. The chatbot learns and adapts to offer you the best possible guidance.
            </p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Easy Navigation" />
            <h3>Easy Navigation</h3>
            <p>
              Unsure where to go? The chatbot can help you find the nearest hospitals and clinics, and even provide directions—all within a chat!
            </p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1511174511562-5f97f4f4b3c4?auto=format&fit=crop&w=400&q=80" alt="Privacy First" />
            <h3>Privacy First</h3>
            <p>
              Your conversations are confidential. We use advanced security to keep your health information safe and private.
            </p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </>
);

export default Home;