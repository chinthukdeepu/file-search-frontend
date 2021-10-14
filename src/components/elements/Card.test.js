import { render, screen } from '@testing-library/react';
import Card from './Card';

test('if the card is loaded', () => {
  render(<Card info={{id:1,image: "pdf.png",title: "Test Card",sub_title: "test card sub",tag: "test card tag",}} />);
  const linkElement = screen.getByText(/Test Card/);
  expect(linkElement).toBeInTheDocument();
});
