import logo from './logo.svg';
import './App.css';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { theme } from './theme';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createEmotionCache';
import { Dashboard } from './Dashboard';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const customTheme = useMemo(() => theme(prefersDarkMode), [prefersDarkMode]);

  const emotionCache = createEmotionCache();

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
