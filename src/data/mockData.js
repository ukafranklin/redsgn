export const LEVELS = {
  rookie:    { label: 'Rookie',    min: 0,    color: '#9090B8', icon: '🌱' },
  designer:  { label: 'Designer',  min: 50,   color: '#4361EE', icon: '✏️' },
  pro:       { label: 'Pro',       min: 200,  color: '#0DDB7F', icon: '⚡' },
  pixelGod:  { label: 'Pixel God', min: 1000, color: '#F5A623', icon: '👑' },
}

export const getLevel = (votes) => {
  if (votes >= 1000) return LEVELS.pixelGod
  if (votes >= 200)  return LEVELS.pro
  if (votes >= 50)   return LEVELS.designer
  return LEVELS.rookie
}

export const designers = [
  { id: 1, name: 'Sarah Chen',    handle: '@sarahdesigns',  votes: 2847, designs: 23, streak: 15, color: '#4361EE' },
  { id: 2, name: 'Marcus Rivera', handle: '@mrivera_ux',    votes: 2234, designs: 18, streak: 7,  color: '#0DDB7F' },
  { id: 3, name: 'Aisha Patel',   handle: '@aishaui',       votes: 1987, designs: 31, streak: 22, color: '#8B31E0' },
  { id: 4, name: 'Tom Nakamura',  handle: '@tomnaka',       votes: 1654, designs: 14, streak: 3,  color: '#F5A623' },
  { id: 5, name: 'Leila Ortiz',   handle: '@leiladesign',   votes: 1432, designs: 27, streak: 11, color: '#FF4757' },
  { id: 6, name: 'James Wu',      handle: '@jameswuux',     votes: 1201, designs: 19, streak: 5,  color: '#4361EE' },
  { id: 7, name: 'Nina Kovács',   handle: '@ninakovacs',    votes: 987,  designs: 12, streak: 8,  color: '#0DDB7F' },
  { id: 8, name: 'Dev Sharma',    handle: '@devux',         votes: 876,  designs: 9,  streak: 2,  color: '#8B31E0' },
  { id: 9, name: 'Chloe Martin',  handle: '@chloedesigns',  votes: 743,  designs: 16, streak: 6,  color: '#F5A623' },
  { id: 10, name: 'Omar Hassan',  handle: '@omarh_design',  votes: 621,  designs: 11, streak: 4,  color: '#FF4757' },
]

export const weeklyDesigners = [
  { id: 1, name: 'Marcus Rivera', handle: '@mrivera_ux',   votes: 412, designs: 5, streak: 7,  color: '#0DDB7F' },
  { id: 2, name: 'Aisha Patel',   handle: '@aishaui',      votes: 387, designs: 6, streak: 22, color: '#8B31E0' },
  { id: 3, name: 'Sarah Chen',    handle: '@sarahdesigns', votes: 341, designs: 4, streak: 15, color: '#4361EE' },
  { id: 4, name: 'Nina Kovács',   handle: '@ninakovacs',   votes: 298, designs: 7, streak: 8,  color: '#0DDB7F' },
  { id: 5, name: 'Dev Sharma',    handle: '@devux',        votes: 256, designs: 4, streak: 2,  color: '#8B31E0' },
  { id: 6, name: 'Chloe Martin',  handle: '@chloedesigns', votes: 221, designs: 5, streak: 6,  color: '#F5A623' },
  { id: 7, name: 'James Wu',      handle: '@jameswuux',    votes: 198, designs: 3, streak: 5,  color: '#4361EE' },
  { id: 8, name: 'Leila Ortiz',   handle: '@leiladesign',  votes: 167, designs: 4, streak: 11, color: '#FF4757' },
  { id: 9, name: 'Tom Nakamura',  handle: '@tomnaka',      votes: 134, designs: 2, streak: 3,  color: '#F5A623' },
  { id: 10, name: 'Omar Hassan',  handle: '@omarh_design', votes: 109, designs: 3, streak: 4,  color: '#FF4757' },
]

export const todayDesigners = [
  { id: 3, name: 'Aisha Patel',   handle: '@aishaui',       votes: 87,  designs: 2, streak: 22, color: '#8B31E0' },
  { id: 7, name: 'Nina Kovács',   handle: '@ninakovacs',    votes: 74,  designs: 3, streak: 8,  color: '#0DDB7F' },
  { id: 1, name: 'Sarah Chen',    handle: '@sarahdesigns',  votes: 68,  designs: 1, streak: 15, color: '#4361EE' },
  { id: 5, name: 'Leila Ortiz',   handle: '@leiladesign',   votes: 61,  designs: 2, streak: 11, color: '#FF4757' },
  { id: 8, name: 'Dev Sharma',    handle: '@devux',         votes: 54,  designs: 2, streak: 2,  color: '#8B31E0' },
  { id: 2, name: 'Marcus Rivera', handle: '@mrivera_ux',    votes: 49,  designs: 1, streak: 7,  color: '#0DDB7F' },
  { id: 9, name: 'Chloe Martin',  handle: '@chloedesigns',  votes: 43,  designs: 1, streak: 6,  color: '#F5A623' },
  { id: 6, name: 'James Wu',      handle: '@jameswuux',     votes: 38,  designs: 2, streak: 5,  color: '#4361EE' },
  { id: 4, name: 'Tom Nakamura',  handle: '@tomnaka',       votes: 31,  designs: 1, streak: 3,  color: '#F5A623' },
  { id: 10, name: 'Omar Hassan',  handle: '@omarh_design',  votes: 27,  designs: 1, streak: 4,  color: '#FF4757' },
]

export const submissionPairs = [
  {
    id: 1,
    a: {
      designer: designers[2],
      title: 'Minimal White Space',
      description: 'Leveraged negative space and a strict 8px grid to create breathing room.',
      votes: 342,
      palette: ['#FFFFFF', '#F5F5F5', '#4361EE', '#0A0A0F'],
      style: 'minimal',
    },
    b: {
      designer: designers[0],
      title: 'Bold Dark Mode',
      description: 'High contrast dark theme with vibrant accent colors for accessibility.',
      votes: 287,
      palette: ['#0A0A0F', '#1A1A2E', '#7B2FBE', '#EEEEFF'],
      style: 'dark',
    },
  },
  {
    id: 2,
    a: {
      designer: designers[1],
      title: 'Glassmorphism Concept',
      description: 'Frosted glass overlays with soft gradients and depth layers.',
      votes: 198,
      palette: ['#E8F4FD', '#DBEAFE', '#3B82F6', '#1E40AF'],
      style: 'glass',
    },
    b: {
      designer: designers[4],
      title: 'Brutalist Redesign',
      description: 'Bold borders, raw structure, intentional asymmetry done right.',
      votes: 231,
      palette: ['#FFFBF0', '#FEF3C7', '#F59E0B', '#000000'],
      style: 'brutalist',
    },
  },
  {
    id: 3,
    a: {
      designer: designers[6],
      title: 'Soft Neumorphism',
      description: 'Tactile depth using subtle shadows and light source consistency.',
      votes: 156,
      palette: ['#E8E8F0', '#D0D0E8', '#6366F1', '#4338CA'],
      style: 'neumorphic',
    },
    b: {
      designer: designers[3],
      title: 'Gradient Fusion',
      description: 'Layered gradients creating depth and visual hierarchy throughout.',
      votes: 178,
      palette: ['#0F0F2E', '#1A1A4E', '#4361EE', '#8B31E0'],
      style: 'gradient',
    },
  },
  {
    id: 4,
    a: {
      designer: designers[5],
      title: 'Swiss Grid System',
      description: 'Precision-based grid with strict typographic hierarchy.',
      votes: 213,
      palette: ['#FFFFFF', '#FF0000', '#000000', '#F5F5F5'],
      style: 'swiss',
    },
    b: {
      designer: designers[8],
      title: 'Organic Shapes',
      description: 'Fluid blob shapes and curved elements creating warmth.',
      votes: 189,
      palette: ['#FFF8F0', '#FFE4D6', '#FF6B35', '#2D1B69'],
      style: 'organic',
    },
  },
]

export const todaysChallenge = {
  id: 42,
  title: 'Banking App Dashboard',
  subtitle: 'Redesign the UX nightmare',
  difficulty: 'Medium',
  submissionsCount: 127,
  category: 'Finance',
  timeLimit: '24 hours',
  brief: {
    problem: [
      'The current dashboard has 34 different font sizes with zero hierarchy',
      'Buttons are 12px tall — physically impossible to tap on mobile',
      'Important balance info is hidden 3 scrolls deep in a gray table',
      'The color palette uses 7 shades of beige simultaneously',
      'Navigation has 12 top-level items, 8 of which overlap in function',
    ],
    goal: 'Redesign the main dashboard to show balance, recent transactions, and quick actions. Must work on mobile. Should feel secure and trustworthy yet modern.',
    constraints: [
      'Keep the core information architecture (balance, transactions, actions)',
      'Must be accessible (WCAG AA minimum)',
      'Dark mode support is a bonus',
    ],
  },
  nextChallenge: Date.now() + 19 * 60 * 60 * 1000 + 24 * 60 * 1000,
}

export const liveStats = {
  submissionsToday: 1240,
  activeDesigners: 847,
  votesLast24h: 18420,
  topDesigner: designers[0],
  challengeStreak: 42,
}

export const featuredDesigners = [...designers.slice(0, 6), ...designers.slice(0, 6)]
