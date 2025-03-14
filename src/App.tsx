import './index.css';
import ContentBody from './components/ContentBody/ContentBody';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <SideBar />
      <ContentBody />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
