import { ProposalConfig } from '../types';

export const proposalConfig: ProposalConfig = {
  herName: "My Favorite Human",
  herNickname: "Besty",
  myName: "Someone Who Cares About You",
  relationshipLabel: "Best Friends to Something More",
  theme: "pink-lavender",
  showNames: false, // When false, naturally uses "my favorite human", "sweetheart", etc.

  // -------------------------------------------------------------
  // Scene 1: The Opening — "Hey, my favorite human" 💗
  // -------------------------------------------------------------
  openingLines: [
    "Hey, my favorite human… 💗",
    "I made a little world for you.",
    "Because there are some things I want you to know, and sometimes an ordinary message just doesn't feel like enough."
  ],
  enterButtonText: "Enter our little universe ✨",

  // -------------------------------------------------------------
  // Scene 2: A Little Reminder of Your Worth 🌸
  // -------------------------------------------------------------
  worthTitle: "A Little Reminder of Your Worth",
  worthSubtitle: "Before anything else, I need you to know this...",
  worthLines: [
    "Before I ask you anything…",
    "I want you to know that you're genuinely special to me.",
    "Not because you have to be perfect.",
    "Not because you always have to be happy.",
    "But because you're you.",
    "Your presence, your little habits, your laughter, your way of being yourself… they matter to me more than I can easily explain.",
    "I hope you never forget that you deserve to be loved with kindness, patience, honesty, and care."
  ],
  worthNextButtonText: "Step into the garden 🌷",

  // -------------------------------------------------------------
  // Scene 3: The Little Things That Make Her Special 🌸
  // -------------------------------------------------------------
  bubblesSectionTitle: "The Little Things That Make You Special",
  bubblesSectionSubtitle: "Touch each glowing bubble to reveal a thought I've kept in my heart...",
  memoryBubbles: [
    {
      id: 1,
      title: "Ordinary Conversations",
      shortLabel: "Our daily chats",
      quote: "Some people can make an ordinary conversation feel like the best part of the day. You're that kind of person to me.",
      flowerColor: "#FF8FB8",
      xRatio: 0.18,
      yRatio: 0.28,
    },
    {
      id: 2,
      title: "The Simple Moments",
      shortLabel: "Random laughs",
      quote: "I don't need every moment with you to be extraordinary. Even the simple, random ones can mean something special.",
      flowerColor: "#A99AEF",
      xRatio: 0.50,
      yRatio: 0.16,
    },
    {
      id: 3,
      title: "Being Yourself",
      shortLabel: "Safe space",
      quote: "I hope you always have a place where you can be completely yourself, without pretending or hiding how you feel.",
      flowerColor: "#FFD6E7",
      xRatio: 0.82,
      yRatio: 0.26,
    },
    {
      id: 4,
      title: "On Difficult Days",
      shortLabel: "Always here",
      quote: "If you ever have a difficult day, I hope I can be someone who listens, understands, and reminds you that you don't have to handle everything alone.",
      flowerColor: "#DCD6FF",
      xRatio: 0.22,
      yRatio: 0.65,
    },
    {
      id: 5,
      title: "Your Inherent Worth",
      shortLabel: "Deserving kindness",
      quote: "You don't have to earn your worth by doing more, being more, or pleasing everyone. You already deserve kindness.",
      flowerColor: "#FFB8D6",
      xRatio: 0.50,
      yRatio: 0.78,
    },
    {
      id: 6,
      title: "Looking Ahead",
      shortLabel: "Beautiful smiles",
      quote: "And honestly? The thought of creating more beautiful memories with you makes me smile in a way I can't quite explain.",
      flowerColor: "#F472B6",
      xRatio: 0.80,
      yRatio: 0.68,
    },
  ],
  bubblesNextButtonText: "I wrote something for you 💌",

  // -------------------------------------------------------------
  // Scene 4: A Letter I Was Too Shy To Say Out Loud 💌
  // -------------------------------------------------------------
  letterTeaser: "A letter I was too shy to say out loud...",
  letterStampText: "FOR YOU 💗",
  letterGreeting: "Hey, you. 💗",
  letterParagraphs: [
    "I've been thinking about how to say this without making it awkward, and honestly, I'm still figuring that out.",
    "But I don't want to keep something this meaningful hidden inside just because I'm nervous about saying it out loud.",
    "I'm so deeply grateful that you're in my life.",
    "Somewhere along the way, you became so much more than someone I enjoy talking to. You became the first thought that greets me when I wake up and the last peaceful memory before I close my eyes.",
    "I love the comfort of knowing you, the little moments we share, and the effortless way you make my days brighter simply by existing.",
    "And as time went on, my heart realized something undeniable:",
    "I love you. Truly, deeply, and with all my heart. 💗",
    "I love your gentle warmth, your infectious laughter, the honest way you feel things, and the beautiful person you are even on your hardest days.",
    "You don't have to be perfect for me. You don't have to pretend to be strong when you're tired. And you never have to give me an answer just because you think it's what I want to hear.",
    "I want something between us that feels real, gentle, mutual, and full of peace for both of us.",
    "So, with a slightly racing heart and a very genuine smile, there's a question I've been waiting to ask you.",
    "Something that could turn our little universe into a beautiful new chapter…",
    "Are you ready? 🥹💗"
  ],
  letterSignoff: "With all my love and heart,",
  letterBottomPrompt: "There's one more little surprise…",
  letterNextButtonText: "Take me there 🌷",

  // -------------------------------------------------------------
  // Scene 5: Our Little Romantic World 🌹
  // -------------------------------------------------------------
  gardenTitle: "Our Little Romantic World",
  gardenLines: [
    "Sometimes, you don't plan to feel something different.",
    "Sometimes, a person simply becomes important to you.",
    "Through the little conversations, the laughter, the comfort, and all the moments that seem ordinary until you realize how much they mean…",
    "Your heart starts hoping for something a little more.",
    "And that's what happened to me.",
    "I started wondering what it would be like if we could be more than best friends.",
    "To share more smiles, more memories, more little adventures, and a different kind of closeness.",
    "And today, I decided I'd rather be honest with you than keep wondering what might happen if I never asked."
  ],
  gardenNextButtonText: "Open my heart 💖",

  // -------------------------------------------------------------
  // Scene 6: The Main Proposal 💗
  // -------------------------------------------------------------
  proposalIntroLines: [
    "There's something my heart has been holding onto, waiting for the right moment…",
    "You started out as my favorite person, and somewhere along the way, you became my favorite feeling in this world.",
    "Through every shared laugh, every late conversation, and every quiet moment, you became the home my heart always looked for.",
    "Before I ask my question, I want you to hear this with complete certainty:",
    "I love you. Deeply, quietly, and with everything I have in me. 💗",
    "I don't want to hide behind hesitation anymore. I want to choose you, celebrate you, and give my heart to you honestly."
  ],
  proposalLoveDeclaration: "I love you. Truly, deeply, and unconditionally. 💖",
  proposalLoveLetter: {
    title: "A Letter From My Deepest Heart 💌",
    subtitle: "What I truly feel when I look at you...",
    paragraphs: [
      "I've spent so many quiet nights wondering how one person could gently change my entire world without even trying.",
      "The truth is, loving you didn't happen in a single instant. It grew with every smile you gave me, every conversation that made time disappear, and every moment I realized that life simply feels warmer, softer, and more meaningful with you by my side.",
      "You became my favorite secret smile, the person whose happiness genuinely matters to me as much as my own, and the one whose laughter can turn my darkest day into light.",
      "I don't just love your beauty—I love your heart. I love your kindness, your silly little habits, your honesty, and the rare, gentle soul you share with the world.",
      "With you, I don't feel like I have to pretend to be anything other than myself. You make love feel safe, effortless, and true."
    ],
    loveDeclaration: "I love you. In this universe, and in every tomorrow yet to come. 💖",
    closingNote: "No matter what happens, you will always be cherished, respected, and adored."
  },
  proposalQuestion: "Will you be my girlfriend? 🥹💗",
  proposalSubtext: "I'd love to build something beautiful with you, one honest conversation, one silly moment, and one happy memory at a time.",
  proposalSafety: "And whatever your answer is, I want you to feel safe being honest with me.",
  yesButtonText: "Yes… let's write our love story 💖",
  timeButtonText: "Can I take my time? 🥹",

  // -------------------------------------------------------------
  // Scene 7A: If She Says Yes 🎉💖
  // -------------------------------------------------------------
  yesTitle: "WAIT… DID YOU REALLY SAY YES?! 🥹💗",
  yesSubtitle: "Come here, you absolute sweetheart. 💖",
  yesParagraphs: [
    "Thank you for giving this little possibility a chance.",
    "I don't expect our story to be perfect. I just hope we can make it honest, kind, fun, and full of moments that make us smile.",
    "I want to celebrate your wins, listen on your difficult days, laugh at the most ridiculous things with you, and keep discovering new reasons to appreciate you.",
    "Here's to our next chapter, our silly conversations, our little adventures, and all the beautiful memories we haven't made yet. 🌷"
  ],
  yesEnding: "Maybe this is the beginning of something really beautiful.",
  replayButtonText: "Experience our story again ✨",

  // -------------------------------------------------------------
  // Scene 7B: If She Wants Time 🫶
  // -------------------------------------------------------------
  timeTitle: "Of course, sweetheart. 💗",
  timeParagraphs: [
    "Take all the time you need.",
    "I wanted to be honest about my feelings, but I care about your feelings just as much.",
    "You don't have to rush, and you don't have to say anything you aren't ready to say.",
    "Whatever you're feeling, I hope we can keep being honest and comfortable with each other.",
    "Thank you for listening to my little confession. That means something to me, too."
  ],
  timeReturnGardenText: "Return to our garden 🌷",
  timeReadLetterText: "Read my letter again 💌",

  // Optional local audio path or synthesized audio
  musicUrl: "",
  photos: []
};
