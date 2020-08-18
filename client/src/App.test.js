import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it("renders without crashing", () => {
  shallow(<App />);
});

it("renders Account header", () => {
  const wrapper = shallow(<App />);
  const welcome = <h1>Welcome</h1>;
  expect(wrapper.contains(welcome)).toEqual(true);
});

// describe('Homepage working', () => {
//   beforeAll(async () => {
//     await page.goto('/');
//   });

//   it('should display the homepage correctly', async () => {
//     await expect(page.body()).toInclude('');
//   });

// })
