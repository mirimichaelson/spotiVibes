import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import 'expect-puppeteer'

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


describe('page', () => { 
   beforeAll(async () => {
    await page.goto('https://localhost:3000')
     })
     it('should display "API is working properly" text on page', async () => {
        await expect(page).toMatch('API is working properly')  
      })})

// it('should display "google" text on page', async () => {
//   const wrapper = shallow(<App />);
//   await expect(wrapper).toMatch('API is working properly')  
// });


// it("renders our backend - API text", () => {
//   const wrapper = shallow(<App />);
//   const apiText = <p>API is working properly</p>;
//   expect(wrapper.contains(apiText)).toEqual(true);
// });



// describe('Homepage working', () => {
//   beforeAll(async () => {
//     await page.goto('/');
//   });

//   it('should display the homepage correctly', async () => {
//     await expect(page.body()).toInclude('');
//   });

// })
