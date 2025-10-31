export type Story = { date: string; mood?: number; text?: string };

export function summarize(stories: Story[]): { count: number } {
  return { count: stories.length };
}


