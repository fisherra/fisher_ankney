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
    id: 'fiddle',
    name: 'Fiddle',
    tagline: 'A practice toolkit for old-time and folk fiddlers',
    description:
      'A searchable archive of public-domain fiddle tunes with sheet music, playback, and fingering tabs, plus a tuner that runs off your computer’s microphone.',
    status: 'Planned',
  },
  {
    id: 'board',
    name: 'Board',
    tagline: 'My public product backlog',
    description:
      'The real backlog behind every project on this site: prioritized, scored, and open to read. It uses AI to help draft user stories from one-line ideas.',
    status: 'Planned',
  },
  {
    id: 'reader',
    name: 'Reader',
    tagline: 'Annotated public-domain books',
    description:
      'A reading tool for classic texts. Highlight a passage and get plain-language explanations, historical context, and definitions for archaic words.',
    status: 'Planned',
  },
];
