import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ChartContainer from './components/ChartsContainer';
import Introduction from './components/Introduction';

function App() {
    return (
        <div className='App'>
            <NavBar />
            <Introduction />
            <ChartContainer />
        </div>
    );
}

export default App;
