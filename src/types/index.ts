export type SceneId = 
  | 'opening'
  | 'worth'
  | 'bubbles'
  | 'letter'
  | 'garden'
  | 'proposal'
  | 'response-yes'
  | 'response-time';

export interface MemoryBubbleItem {
  id: number;
  title: string;
  shortLabel: string;
  quote: string;
  flowerColor: string; // hex or tailwind class
  iconName?: string;
  xRatio: number; // 0 to 1 position hints for responsive placement
  yRatio: number;
}

export interface ProposalConfig {
  herName: string;
  herNickname: string;
  myName: string;
  relationshipLabel: string;
  theme: string;
  showNames: boolean;
  
  // Scene 1
  openingLines: string[];
  enterButtonText: string;

  // Scene 2
  worthTitle: string;
  worthSubtitle: string;
  worthLines: string[];
  worthNextButtonText: string;

  // Scene 3
  bubblesSectionTitle: string;
  bubblesSectionSubtitle: string;
  memoryBubbles: MemoryBubbleItem[];
  bubblesNextButtonText: string;

  // Scene 4
  letterTeaser: string;
  letterStampText: string;
  letterGreeting: string;
  letterParagraphs: string[];
  letterSignoff: string;
  letterBottomPrompt: string;
  letterNextButtonText: string;

  // Scene 5
  gardenTitle: string;
  gardenLines: string[];
  gardenNextButtonText: string;

  // Scene 6
  proposalIntroLines: string[];
  proposalQuestion: string;
  proposalSubtext: string;
  proposalSafety: string;
  proposalLoveDeclaration?: string;
  proposalLoveLetter?: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    loveDeclaration: string;
    closingNote: string;
  };
  yesButtonText: string;
  timeButtonText: string;

  // Scene 7A
  yesTitle: string;
  yesSubtitle: string;
  yesParagraphs: string[];
  yesEnding: string;
  replayButtonText: string;

  // Scene 7B
  timeTitle: string;
  timeParagraphs: string[];
  timeReturnGardenText: string;
  timeReadLetterText: string;

  // Extras
  musicUrl?: string;
  photos?: string[];
}
