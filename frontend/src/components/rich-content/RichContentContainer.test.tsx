import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RichContentContainer } from './RichContentContainer';
import { BrowserRouter } from 'react-router-dom';

describe('RichContentContainer', () => {
  it('renders correctly with supported type', () => {
    // Render the component with a known type 'contact'
    render(
      <BrowserRouter>
        <RichContentContainer type="contact" />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Connect on Linkedin/i)).toBeInTheDocument();
  });

  it('renders a tools carousel correctly', () => {
    render(
      <BrowserRouter>
        <RichContentContainer type="tools" />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Figma/i)).toBeInTheDocument();
  });
});
