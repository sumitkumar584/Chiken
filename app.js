const STORAGE_KEY = 'funinhorse_lobby_v1';

const DEFAULT_STATE = {
  profile: {
    brand: 'FunInHorse',
    subtitle: 'Skill-driven gaming experience',
    tagline: 'Play live • Win fast • Ride the streak'
  },
  stats: {
    livePlayers: 12487,
    totalWagers: '₹8.4Cr',
    avgPayout: '96.8%'
  },
  games: [
    { id: 'aviator', name: 'Aviator', type: 'Crash', badge: 'Hot', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80', rate: '1.2x', players: 1840 },
    { id: 'teen-patti', name: 'Teen Patti', type: 'Cards', badge: 'VIP', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80', rate: '2.4x', players: 980 },
    { id: 'roulette', name: 'Roulette', type: 'Wheel', badge: 'New', image: 'https://images.unsplash.com/photo-1528819622761-6bcf032dd83c?auto=format&fit=crop&w=900&q=80', rate: '3.1x', players: 1200 },
    { id: 'cricket', name: 'Cricket Odds', type: 'Sports', badge: 'Live', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80', rate: '1.9x', players: 3100 }
  ],
  winners: [
    { name: 'Aman', amount: '₹12,450', game: 'Aviator' },
    { name: 'Neha', amount: '₹8,200', game: 'Teen Patti' },
    { name: 'Rohit', amount: '₹15,600', game: 'Cricket' },
    { name: 'Sara', amount: '₹9,450', game: 'Roulette' }
  ],
  matches: [
    { title: 'India vs Australia', status: 'Live', market: 'Win', odds: '1.72' },
    { title: 'Rajasthan Royals', status: 'In play', market: 'Run rate', odds: '2.10' },
    { title: 'CSK vs MI', status: 'Upcoming', market: 'First innings', odds: '1.94' }
  ]
};

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      return DEFAULT_STATE;
    }
    return { ...DEFAULT_STATE, ...JSON.parse(stored) };
  } catch (error) {
    return DEFAULT_STATE;
  }
}

function saveState(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

async function apiGetLobby() {
  const state = loadState();
  return Promise.resolve(state);
}

async function apiSaveLobby(nextState) {
  saveState(nextState);
  return Promise.resolve(nextState);
}

async function apiGetRepoMeta() {
  try {
    const res = await fetch('https://api.github.com/repos/sumitkumar584/Chiken');
    if (!res.ok) throw new Error('GitHub API error');
    return await res.json();
  } catch (error) {
    return {
      name: 'funinhorse-demo',
      updated_at: new Date().toISOString(),
      stargazers_count: 0,
      description: 'Fallback demo data'
    };
  }
}

window.appApi = {
  loadState,
  saveState,
  apiGetLobby,
  apiSaveLobby,
  apiGetRepoMeta
};
