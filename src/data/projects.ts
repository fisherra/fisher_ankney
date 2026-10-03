export type ProjectStatus = 'Live' | 'Building' | 'Planned' | 'V2';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  url?: string;
  /** Thumbnail icon shown on the left of the card. */
  icon: 'music' | 'hammer' | 'book';
  /** Gives the card its own color scheme (palettes live in ProjectCard.astro). */
  theme?: 'build-buddy' | 'fiddlers-fancy' | 'page-quest';
}

export const projects: Project[] = [
  {
    id: 'fiddlers-fancy',
    name: "Fiddler's Fancy",
    tagline: 'A living repository for fiddle music',
    description:
      'A growing archive of fiddle tunes with sheet music and tabs, plus a tuner that runs off your computer’s microphone.',
    status: 'Planned',
    theme: 'fiddlers-fancy',
    icon: 'music',
  },
  {
    id: 'build-buddy',
    name: 'Build Buddy',
    tagline: 'Roadmap + Kanban + Process',
    description:
      'A month-by-month roadmap across all my projects, a drag-and-drop kanban board for each one, and the six-stage build process every card moves through. Edits on the live site commit straight to GitHub.',
    status: 'V2',
    url: 'https://build.fisherankney.com',
    theme: 'build-buddy',
    icon: 'hammer',
  },
  {
    id: 'page-quest',
    name: 'Page Quest',
    tagline: 'Gamified reading tracker',
    description:
      'Turns reading into a game: log daily summaries, review books, track your TBR, and level up a gameboard roadmap with badges and Wrapped-style insights — built to reward understanding, not just pages turned.',
    status: 'Planned',
    theme: 'page-quest',
    icon: 'book',
  },
];
