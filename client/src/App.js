import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import DashboardLayout from './layout/DashboardLayout';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <DashboardLayout />
    </PersistGate>
    </Provider>
  );
}

export default App;
