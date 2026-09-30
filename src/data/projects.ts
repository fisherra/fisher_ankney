export type ProjectStatus = 'Live' | 'Building' | 'Planned';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  url?: string;
}

export const projects: Project[] = [
  {
    id: 'fiddlers-fancy',
    name: "Fiddler's Fancy",
    tagline: 'A living repository for fiddle music',
    description:
      'A growing archive of fiddle tunes with sheet music and tabs, plus a tuner that runs off your computer’s microphone.',
    status: 'Planned',
  },
  {
    id: 'personal-project-builder',
    name: 'Project Builder',
    tagline: 'My AI-DLC workflow, made visible',
    description:
      'The personal setup behind every project on this site: skills, workflows, and a project tracker with a kanban board and feature list for each one. Swap between projects to see its board.',
    status: 'Planned',
  },
  {
    id: 'page-quest',
    name: 'Page Quest',
    tagline: 'Gamified reading tracker',
    description:
      'Turns reading into a game: log daily summaries, review books, track your TBR, and level up a gameboard roadmap with badges and Wrapped-style insights — built to reward understanding, not just pages turned.',
    status: 'Planned',
  },
];
