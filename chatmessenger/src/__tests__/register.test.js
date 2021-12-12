import React from 'react';
import { render, screen } from '@testing-library/react';
import { registerUser } from '../pages/Register';


test('registersUser function', async () => {
    render(<registerUser/>)
    const registerUser = screen.getByText(/Register/i);
  expect(registerUser).toBeInTheDocument();
})

