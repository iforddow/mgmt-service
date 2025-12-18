import '@mantine/core/styles.css';

import ProviderTree from '../components/layout/ProviderTree';
import Router from '../components/layout/Router';

function App() {

  return (
    <ProviderTree>
      <Router />
    </ProviderTree>
  )
}

export default App
