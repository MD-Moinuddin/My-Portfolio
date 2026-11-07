import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Recommendations } from './Recommendations';
import type { Recommendation } from '@/lib/data/recommendations';

const make = (name: string): Recommendation => ({
  name,
  role: `${name}'s role`,
  relationship: 'Worked on the same team',
  date: 'May 2024',
  quote: [`${name} says kind words.`],
});

const items = [make('Alice Ames'), make('Md. Bob Brown'), make('Cara Cole')];

const activePanel = () => screen.getByRole('tabpanel');

describe('Recommendations', () => {
  it('renders the section with its title', () => {
    const { container } = render(<Recommendations items={items} />);
    expect(container.querySelector('section#recommendations')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Recommendations' })).toBeInTheDocument();
  });

  it('features the first recommendation with its quote, name, role, relationship, and date', () => {
    render(<Recommendations items={items} />);
    const panel = within(activePanel());
    expect(panel.getByText('Alice Ames says kind words.')).toBeInTheDocument();
    expect(panel.getByText('Alice Ames')).toBeInTheDocument();
    expect(panel.getByText("Alice Ames's role")).toBeInTheDocument();
    expect(panel.getByText('Worked on the same team · May 2024')).toBeInTheDocument();
    expect(screen.getByText('1 of 3')).toBeInTheDocument();
  });

  it('lists everyone as tabs, with the first selected', () => {
    render(<Recommendations items={items} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('switches the featured quote when a person is picked', () => {
    render(<Recommendations items={items} />);
    fireEvent.click(screen.getByRole('tab', { name: /Bob Brown/ }));
    expect(within(activePanel()).getByText('Md. Bob Brown says kind words.')).toBeInTheDocument();
    expect(screen.getByText('2 of 3')).toBeInTheDocument();
  });

  it('steps with the arrow buttons and wraps around at both ends', () => {
    render(<Recommendations items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Previous recommendation' }));
    expect(screen.getByText('3 of 3')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next recommendation' }));
    expect(screen.getByText('1 of 3')).toBeInTheDocument();
  });

  describe('keeping the selected person in view', () => {
    const scrollTo = vi.fn();

    afterEach(() => {
      scrollTo.mockClear();
      // @ts-expect-error restoring jsdom's lack of Element.scrollTo
      delete HTMLElement.prototype.scrollTo;
    });

    it('scrolls the people strip when the arrows change the selection', () => {
      HTMLElement.prototype.scrollTo = scrollTo;
      render(<Recommendations items={items} />);
      scrollTo.mockClear();
      fireEvent.click(screen.getByRole('button', { name: 'Next recommendation' }));
      expect(scrollTo).toHaveBeenCalledTimes(1);
      expect(scrollTo.mock.instances[0]).toBe(screen.getByRole('tablist'));
      fireEvent.click(screen.getByRole('button', { name: 'Previous recommendation' }));
      expect(scrollTo).toHaveBeenCalledTimes(2);
    });
  });

  it('supports arrow, Home, and End keys on the tab list', () => {
    render(<Recommendations items={items} />);
    const first = screen.getAllByRole('tab')[0];
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(screen.getByText('2 of 3')).toBeInTheDocument();
    fireEvent.keyDown(screen.getAllByRole('tab')[1], { key: 'End' });
    expect(screen.getByText('3 of 3')).toBeInTheDocument();
    fireEvent.keyDown(screen.getAllByRole('tab')[2], { key: 'Home' });
    expect(screen.getByText('1 of 3')).toBeInTheDocument();
  });

  it('autoplays to the next recommendation when the progress bar finishes', () => {
    render(<Recommendations items={items} />);
    const bar = screen.getByTestId('autoplay-progress');
    // jsdom has no AnimationEvent, so React listens for the prefixed event name there.
    fireEvent(bar, new Event('webkitAnimationEnd', { bubbles: true }));
    expect(screen.getByText('2 of 3')).toBeInTheDocument();
  });

  it('stops autoplaying for good after the visitor interacts', () => {
    render(<Recommendations items={items} />);
    fireEvent.click(screen.getByRole('tab', { name: /Cara Cole/ }));
    expect(screen.queryByTestId('autoplay-progress')).not.toBeInTheDocument();
  });

  it('does not autoplay a single recommendation', () => {
    render(<Recommendations items={[items[0]]} />);
    expect(screen.queryByTestId('autoplay-progress')).not.toBeInTheDocument();
  });

  it('links to the LinkedIn recommendations in a new tab', () => {
    render(<Recommendations items={items} />);
    const link = screen.getByRole('link', { name: 'See the recommendations on LinkedIn' });
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/md-moinuddin-192057148/details/recommendations/');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
