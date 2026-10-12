import type { ImageMetadata } from 'astro';
import callanish from '../assets/images/projects/callanish.jpg';
import pageQuestCastle from '../assets/images/projects/page-quest-castle.svg';
import buildBuddyBoard from '../assets/images/projects/build-buddy-board.png';

export type ProjectStatus = 'Live' | 'Building' | 'Planned' | 'V1' | 'V2';

export interface Project {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  status: ProjectStatus;
  url?: string;
  /** Thumbnail icon shown on the left of the card. */
  icon: 'music' | 'hammer' | 'book';
  /** Gives the card its own color scheme (palettes live in ProjectCard.astro). */
  theme?: 'build-buddy' | 'fiddlers-fancy' | 'page-quest';
  /** Optional photo laid behind the card, muted by the theme's scrim. */
  image?: ImageMetadata;
}

export const projects: Project[] = [
  {
    id: 'fiddlers-fancy',
    name: "Fiddler's Friend",
    description: 'A free library of fiddle music, and some tools to help keep the tradition alive.',
    status: 'V1',
    url: 'https://fiddle.fisherankney.com',
    theme: 'fiddlers-fancy',
    image: callanish,
    icon: 'music',
  },
  {
    id: 'build-buddy',
    name: 'Build Buddy',
    description: 'A roadmap and kanban board for all my projects, built around a six-stage build process.',
    status: 'V2',
    url: 'https://build.fisherankney.com',
    theme: 'build-buddy',
    image: buildBuddyBoard,
    icon: 'hammer',
  },
  {
    id: 'page-quest',
    name: 'Page Quest',
    description: 'A reading tracker that turns every book into a quest, with daily logs, reviews and badges.',
    status: 'Planned',
    theme: 'page-quest',
    image: pageQuestCastle,
    icon: 'book',
  },
];
