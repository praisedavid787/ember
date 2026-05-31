import type { Profile } from '../types/profile';

// Mock profile deck. Image URLs use stable Unsplash photo IDs so the same
// media appears across reloads. Each profile carries a small gallery
// (portrait + lifestyle shots) that the Swipe card pages through on tap.
// Replace with a real API or local JSON later.
const img = (id: string) => `https://images.unsplash.com/${id}?w=900&q=80`;

export const profiles: Profile[] = [
  {
    id: 'p1',
    name: 'Ada',
    age: 28,
    bio: 'Software engineer. Lagos → Berlin. Lives for ramen and long walks.',
    interests: ['Coffee', 'Cycling', 'Indie films'],
    photos: [
      img('photo-1494790108377-be9c29b29330'),
      img('photo-1501785888041-af3ef285b470'),
      img('photo-1504674900247-0877df9cc836'),
      img('photo-1441974231531-c6227db76b6e'),
    ],
  },
  {
    id: 'p2',
    name: 'Marcus',
    age: 31,
    bio: 'Photographer + chef-in-training. I will out-cook your favourite restaurant.',
    interests: ['Photography', 'Cooking', 'Travel'],
    photos: [
      img('photo-1500648767791-00dcc994a43e'),
      img('photo-1506744038136-46273834b3fb'),
      img('photo-1518717758536-85ae29035b6d'),
    ],
  },
  {
    id: 'p3',
    name: 'Lena',
    age: 26,
    bio: 'Architect by day, climber by weekend. Tell me about a building you love.',
    interests: ['Climbing', 'Architecture', 'Jazz'],
    photos: [
      img('photo-1438761681033-6461ffad8d80'),
      img('photo-1470071459604-3b5ec3a7fe05'),
      img('photo-1502920917128-1aa500764cbd'),
    ],
  },
  {
    id: 'p4',
    name: 'Tobi',
    age: 29,
    bio: 'Product designer. Recovering perfectionist. Hot takes about typography.',
    interests: ['Design', 'Tennis', 'Vinyl'],
    photos: [
      img('photo-1531123897727-8f129e1688ce'),
      img('photo-1507525428034-b723cf961d3e'),
      img('photo-1488646953014-85cb44e25828'),
    ],
  },
  {
    id: 'p5',
    name: 'Saoirse',
    age: 27,
    bio: 'Doctor, half-marathoner, terrible at houseplants. Two out of three is fine.',
    interests: ['Running', 'Wine', 'Podcasts'],
    photos: [
      img('photo-1487412720507-e7ab37603c6f'),
      img('photo-1504674900247-0877df9cc836'),
      img('photo-1441974231531-c6227db76b6e'),
    ],
  },
  {
    id: 'p6',
    name: 'Daniel',
    age: 33,
    bio: 'Documentary filmmaker. Currently obsessed with West African archives.',
    interests: ['Film', 'History', 'Surfing'],
    photos: [
      img('photo-1506794778202-cad84cf45f1d'),
      img('photo-1518717758536-85ae29035b6d'),
      img('photo-1469474968028-56623f02e42e'),
    ],
  },
  {
    id: 'p7',
    name: 'Yuki',
    age: 30,
    bio: 'Quant turned ceramicist. Makes mugs you will actually use every day.',
    interests: ['Pottery', 'Mathematics', 'Tea'],
    photos: [
      img('photo-1517841905240-472988babdf9'),
      img('photo-1502920917128-1aa500764cbd'),
      img('photo-1501785888041-af3ef285b470'),
    ],
  },
  {
    id: 'p8',
    name: 'Imani',
    age: 25,
    bio: 'Climate journalist. Will out-hike you. Has too many tabs open.',
    interests: ['Hiking', 'Writing', 'Birding'],
    photos: [
      img('photo-1534528741775-53994a69daeb'),
      img('photo-1488646953014-85cb44e25828'),
      img('photo-1506744038136-46273834b3fb'),
      img('photo-1507525428034-b723cf961d3e'),
    ],
  },
  {
    id: 'p9',
    name: 'Felix',
    age: 32,
    bio: 'Pianist. Composes for short films. Looking for the next walking-around city.',
    interests: ['Piano', 'Cinema', 'Walking cities'],
    photos: [
      img('photo-1492562080023-ab3db95bfbce'),
      img('photo-1441974231531-c6227db76b6e'),
      img('photo-1470071459604-3b5ec3a7fe05'),
    ],
  },
  {
    id: 'p10',
    name: 'Maya',
    age: 28,
    bio: 'UX researcher. I ask too many questions. Sorry-not-sorry.',
    interests: ['Books', 'Pilates', 'Slow travel'],
    photos: [
      img('photo-1544005313-94ddf0286df2'),
      img('photo-1469474968028-56623f02e42e'),
    ],
  },
  {
    id: 'p11',
    name: 'Joseph',
    age: 34,
    bio: 'Civil engineer who plays in a Sunday football league. Two left feet, big heart.',
    interests: ['Football', 'Board games', 'BBQ'],
    photos: [
      img('photo-1463453091185-61582044d556'),
      img('photo-1501785888041-af3ef285b470'),
      img('photo-1504674900247-0877df9cc836'),
    ],
  },
  {
    id: 'p12',
    name: 'Anya',
    age: 29,
    bio: 'Translator. Russian, French, working on Yoruba. Coffee is my fifth language.',
    interests: ['Languages', 'Cinema', 'Cycling'],
    photos: [
      img('photo-1502323777036-f29e3972d82f'),
      img('photo-1506744038136-46273834b3fb'),
      img('photo-1518717758536-85ae29035b6d'),
      img('photo-1469474968028-56623f02e42e'),
    ],
  },
];
