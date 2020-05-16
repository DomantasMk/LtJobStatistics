import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ChartContainer from './components/ChartsContainer';
import Introduction from './components/Introduction';
import { ChartContext } from './components/ChartContext';
import Footer from './components/Footer';

function App() {
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [selectedKeywordsSalary, setSelectedKeywordsSalary] = useState([]);
    return (
        <div className='App'>
            <NavBar />
            <Introduction />
            <ChartContext.Provider
                value={{
                    selectedKeywords,
                    setSelectedKeywords,
                    selectedKeywordsSalary,
                    setSelectedKeywordsSalary,
                }}
            >
                <ChartContainer />
            </ChartContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
