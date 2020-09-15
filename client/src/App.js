import React, { useState } from "react";
import NavBar from "./components/NavBar";
import ChartContainer from "./components/ChartsContainer";
import Introduction from "./components/Introduction";
import { ChartContext } from "./components/ChartContext";
import Footer from "./components/Footer";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "./components/theme";

function App() {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedKeywordsSalary, setSelectedKeywordsSalary] = useState([]);
  return (
    <div className="App">
      <CssBaseline>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </CssBaseline>
    </div>
  );
}

export default App;
