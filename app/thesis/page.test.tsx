import { beforeAll, describe, it, expect } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import ThesisPage, { metadata } from './page';

// jsdom does not implement the <dialog> methods.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

describe('ThesisPage', () => {
  it('renders the thesis title and overview', () => {
    render(<ThesisPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Adapting Stream-Based State-Machine Replication to Apache Flink (Gumti)',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Overview' })).toBeInTheDocument();
    expect(screen.getAllByText(/Tara protocol/).length).toBeGreaterThan(0);
  });

  it('sets the page title to "Master Thesis"', () => {
    expect(metadata.title).toBe('Master Thesis');
    expect(metadata.alternates?.canonical).toBe('/thesis');
  });

  it('links back to the home page', () => {
    render(<ThesisPage />);
    expect(screen.getByRole('link', { name: /Back to home/ })).toHaveAttribute('href', '/');
  });

  it('shows the supervisor and the thesis dates', () => {
    render(<ThesisPage />);
    expect(screen.getByText(/Prof\. Dr\.-Ing\. habil\. Tobias Distler/)).toBeInTheDocument();
    expect(screen.getByText('Oct 2025 – Jul 2026')).toBeInTheDocument();
  });

  it('shows the four headline result tiles', () => {
    render(<ThesisPage />);
    for (const value of ['~5,300', '~3 ms', '~5 s', '0']) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it('lists the four steps of the thesis', () => {
    render(<ThesisPage />);
    const steps = screen.getAllByRole('listitem').filter((li) => li.closest('ol'));
    expect(steps).toHaveLength(4);
  });

  it('renders the Design, Engineering, and Evaluation contribution cards', () => {
    render(<ThesisPage />);
    for (const name of ['Design', 'Engineering', 'Evaluation']) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
    expect(screen.getByText('Engineered-key routing')).toBeInTheDocument();
    expect(screen.getByText('ZooKeeper replica discovery')).toBeInTheDocument();
    expect(screen.getByText('Feedback loops around an acyclic dataflow')).toBeInTheDocument();
  });

  it('shows the architecture and result figures with alt text', () => {
    render(<ThesisPage />);
    const figures = screen.getAllByRole('figure');
    expect(figures).toHaveLength(7);
    for (const figure of figures) {
      expect(within(figure).getByRole('img')).toHaveAttribute('alt');
    }
  });

  it('opens a figure in a pop-up on the same page and closes it again', () => {
    render(<ThesisPage />);
    // No figure is a link that leaves the page.
    for (const figure of screen.getAllByRole('figure')) {
      expect(within(figure).queryByRole('link')).toBeNull();
    }
    const figure = screen.getAllByRole('figure')[0];
    fireEvent.click(within(figure).getByRole('button', { name: /Enlarge image/ }));
    const dialog = figure.querySelector('dialog') as HTMLDialogElement;
    expect(dialog).toHaveAttribute('open');
    expect(document.body.style.overflow).toBe('hidden');
    expect(within(dialog).getByRole('img')).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
    expect(dialog).not.toHaveAttribute('open');
    expect(document.body.style.overflow).toBe('');
  });

  it('links to the thesis PDF and the GitHub repository', () => {
    render(<ThesisPage />);
    expect(screen.getByRole('link', { name: /Read the thesis \(PDF\)/ })).toHaveAttribute('href', '/thesis.pdf');
    expect(screen.getByRole('link', { name: /View code/ })).toHaveAttribute(
      'href',
      'https://github.com/MD-Moinuddin/Masters-Thesis',
    );
  });

  it('ends with links to contact and projects', () => {
    render(<ThesisPage />);
    expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/#contact');
    expect(screen.getByRole('link', { name: 'See my projects' })).toHaveAttribute('href', '/projects');
  });
});
