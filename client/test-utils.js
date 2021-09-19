import { render } from "@testing-library/react";
// import '@testing-library/jest-dom';
import 'mutationobserver-shim';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>{ children }</ThemeProvider>
    );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
