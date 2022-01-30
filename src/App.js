import React from 'react';
import Maps from './component/Maps';
import './App.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <span>
          <Maps/>
        </span>
      </div>
    </QueryClientProvider>
  );
}

export default App;
