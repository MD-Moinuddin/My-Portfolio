import { describe, it, expect } from 'vitest';
import { ogCopy, truncate } from './og';

describe('truncate', () => {
  it('leaves short text alone', () => {
    expect(truncate('Short', 10)).toBe('Short');
  });

  it('cuts long text to the limit with an ellipsis', () => {
    const result = truncate('a'.repeat(50), 10);
    expect(result).toHaveLength(10);
    expect(result.endsWith('…')).toBe(true);
  });
});

describe('ogCopy', () => {
  it('limits the title, summary, and number of tags', () => {
    const copy = ogCopy({
      eyebrow: 'Project',
      title: 't'.repeat(200),
      summary: 's'.repeat(400),
      tags: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    });
    expect(copy.title.length).toBeLessThanOrEqual(80);
    expect(copy.summary.length).toBeLessThanOrEqual(140);
    expect(copy.tags).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(copy.eyebrow).toBe('Project');
  });
});
