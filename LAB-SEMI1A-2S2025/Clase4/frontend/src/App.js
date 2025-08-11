import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Librería de Discos</div>
      <div className="search-container">
        <input type="text" placeholder="Buscar discos..." className="search-input" />
        <button className="search-button">Buscar</button>
      </div>
    </nav>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Géneros</h3>
        <ul>
          <li>Rock</li>
          <li>Jazz</li>
          <li>Clásica</li>
          <li>Electrónica</li>
          <li>Hip-Hop</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Artistas</h3>
        <ul>
          <li>The Beatles</li>
          <li>Miles Davis</li>
          <li>Beethoven</li>
          <li>Daft Punk</li>
          <li>Kendrick Lamar</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Álbumes</h3>
        <ul>
          <li>Abbey Road</li>
          <li>Kind of Blue</li>
          <li>Symphony No. 9</li>
          <li>Random Access Memories</li>
          <li>To Pimp a Butterfly</li>
        </ul>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="main-content">
      <h2>Bienvenido!</h2>
      <p>Explora nuestro catálogo de Álbumes.</p>
      <div className="album-grid">
        <div className="album-card">
          <img src="https://cdn-p.smehost.net/sites/005297e5d91d4996984e966fac4389ea/wp-content/uploads/2021/11/Adele.jpg" alt="Album Cover" />
          <h4>Hello</h4>
          <p>ADELE</p>
        </div>
        <div className="album-card">
          <img src="https://cdn-images.dzcdn.net/images/cover/9a085d4caf4fbcb3ad151ed74bad7d0c/0x1900-000000-80-0-0.jpg" alt="Album Cover" />
          <h4>Tell me</h4>
          <p>Milet</p>
        </div>
        <div className="album-card">
          <img src="https://pbs.twimg.com/media/DmK6EMsXgAAwPnY.jpg" alt="Album Cover" />
          <h4>Don't start now</h4>
          <p>Dua Lipa</p>
        </div>
      </div>
    </div>
  );
}

export default App;