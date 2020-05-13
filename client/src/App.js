import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ChartContainer from './components/ChartsContainer';
import Introduction from './components/Introduction';
import { ChartContext } from './components/ChartContext';

function App() {
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    return (
        <div className='App'>
            <NavBar />
            <Introduction />
            <ChartContext.Provider
                value={{ selectedKeywords, setSelectedKeywords }}
            >
                <ChartContainer />
            </ChartContext.Provider>

        </div>
    );
}

export default App;
