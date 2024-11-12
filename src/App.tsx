import React from 'react';
import './App.css';
import { BalanceSheetProvider } from '../src/client/context/balanceSheetContext'
import { BalanceSheet } from './client/components/balanceSheet'

const App: React.FC = () => {
  return (
    <BalanceSheetProvider>
       <div className='App'>
        <BalanceSheet />
       </div>
    </BalanceSheetProvider>
  );
}

export default App;
