// Default configuration for the Romantic First-Month Anniversary Website
// You can edit this file directly, or use the in-app "Customize" button to edit and export your changes!

export const defaultAnniversaryData = {
  // Couple Information
  myName: "KD",
  partnerName: "ROWDY",
  
  // Dates (Format: YYYY-MM-DDTHH:mm:ss)
  // 4/10/26 -> October 4, 2026
  relationshipStartDate: "2026-10-04T00:00:00",
  // 4/11/26 -> November 4, 2026
  anniversaryDate: "2026-11-04T00:00:00",

  // 1. Welcome Screen
  welcome: {
    title: "To My Favourite Person ❤️",
    subtitle: "One month down, a lifetime of memories to go.",
    buttonText: "Open Your Surprise 💌"
  },

  // 2. Our Story Section
  story: {
    sectionTitle: "Our Little Beginning",
    sectionSubtitle: "Every love story is beautiful, but ours is my favourite chapter."
  },

  // Editable Milestones
  milestones: [
    {
      id: "m1",
      date: "21 September 2026",
      title: "Where Our Story Began",
      description: "It all began when you posted an Instagram story about blood donation. I saw it and asked you, ‘Is that about blood donation?’ A simple question, a small conversation, and an unexpected beginning to a story that became so special to me. ❤️",
      icon: "Sparkles"
    },
    {
      id: "m2",
      date: "Late September 2026",
      title: "Our First Special Conversation",
      description: "Hours slipped away like seconds. Talking with you felt effortless, safe, and deeply comforting from the very start.",
      icon: "MessageCircleHeart"
    },
    {
      id: "m3",
      date: "October 4, 2026",
      title: "The Day We Began Our Journey",
      description: "The day we chose each other. 4/10/26 marked the beginning of our sweetest adventure together.",
      icon: "HeartHandshake"
    },
    {
      id: "m4",
      date: "November 4, 2026",
      title: "Our 1st Month Anniversary",
      description: "One month of laughter, warmth, patience, and growing closer every single day. 4/11/26 is only chapter one.",
      icon: "Crown"
    }
  ],

  // 3. Memories Gallery
  photos: [
    {
      id: "p1",
      url: "/images/couple_uploaded.jpg",
      caption: "An imaginary moment we brought to life with AI, but a feeling that is real to us. ❤️",
      date: "October 2026"
    },
    {
      id: "p2",
      url: "/images/memory2.jpg",
      caption: "Under the same starlit sky — miles apart, but our hearts always aligned.",
      date: "First Month"
    },
    {
      id: "p3",
      url: "/images/actual_love_letter.svg",
      caption: "A letter from my heart — words written just for you ❤️",
      date: "Always",
      isLetter: true,
      letterTitle: "Naan idha ungakitte proper-ah sonnena nu therila…",
      letterBody: [
        "Naan idha ungakitte proper-ah sonnena nu therila… aana, en life-la neenga irukkuradhu enakku romba pidicha oru vishayam aayiduchu. ❤️",
        "Namma pesina conversations, namma panra silly moments, chinna chinna sandaigal, namma sirippu, andha ordinary days ellathukkum naduvula… eppo nu theriyama neenga enakku romba special aayita.",
        "Enakku oru perfect love story venum nu illa.\nEnakku namma story dhaan venum❤️",
        "Messy days irukkattum, happy days irukkattum, namma fight pandra days sa irukattum ellamey venum. Unga kooda experience panna dhaan aasai.",
        "Ennaku namma pesurathula neenga pathi things sa full la solla matinga atha full la finish pandrathu ennaku romba pidikum",
        "Athu mattum illa unga life la full ahatha place sa na fill pannanum nu ninaikuren.",
        "So, innaiku naan unnagala enna chose panna sollala… forever promise pannunga nu kooda kekkala.",
        "Naan just oru vishayam dhaan kekkuren…",
        "Neenga enna choose pannuvingala ❤️",
        "Innaikku mattum illa"
      ]
    }
  ],

  // 4. Reasons I Love You Section
  reasons: [
    {
      id: "r1",
      number: "01",
      quote: "Your presence makes my days better.",
      detail: "Even on the heaviest days, just hearing from you brings instant warmth and peace to my mind."
    },
    {
      id: "r2",
      number: "02",
      quote: "You make distance feel a little smaller.",
      detail: "No matter how many miles separate us, the care and thought you put into us keeps you right beside me."
    },
    {
      id: "r3",
      number: "03",
      quote: "I am proud of the person you are.",
      detail: "Your dedication, your discipline, and how fiercely and sincerely you carry yourself inspire me every single day."
    },
    {
      id: "r4",
      number: "04",
      quote: "You make ordinary moments special.",
      detail: "A simple text, a shared laugh, or a quiet goodnight makes my whole world feel brighter."
    },
    {
      id: "r5",
      number: "05",
      quote: "You are my favourite part of every day.",
      detail: "Waking up knowing I have you in my corner is the greatest gift of this first month."
    }
  ],

  // 5. Special Letter
  letter: {
    sealTitle: "From KD with all my heart",
    greeting: "My love, happy one month to us. ❤️",
    paragraphs: [
      "Even though we cannot always be beside each other, you have a special place in my heart. I am proud of you, your dedication, and everything you work hard for. Distance may keep us apart for now, but it cannot take away the little moments, the love, and the memories we are creating together.",
      "This is only our first month, and I hope we have many more beautiful chapters ahead of us. Thank you for being someone so special to me.",
      "Happy first month, my favourite person. I love you. ❤️"
    ],
    signoff: "Forever cheering for you,\nKD"
  },

  // 6. Our Song
  song: {
    title: "Golden Hour Melody",
    artist: "Dedicated to KD & ROWDY",
    audioSourceType: "synth", // 'synth' (built-in romantic piano) | 'url' | 'custom'
    audioUrl: "",
    customName: ""
  },

  // 7. Long Distance Love Section
  longDistance: {
    title: "Miles Apart, Close at Heart",
    quote: "No matter how many miles separate us, you will always have a special place in my heart. I am proud of you, and I will always be cheering for you.",
    subtext: "Looking up at the exact same moon and stars. Your devotion and honor make me prouder than words can ever say."
  },

  // 8. Final Surprise
  finalSurprise: {
    heading: "Our First Month Is Just the Beginning ❤️",
    subheading: "Here’s to more memories, more laughter, more love, and more chapters of us.",
    replayButtonText: "Replay Our Story ↺",
    celebrateButtonText: "Celebrate Our 1st Month 🎉"
  }
};
