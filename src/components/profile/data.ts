
import { ProjectProps } from '@/components/ProjectCard';

export const userProjects: ProjectProps[] = [
  {
    id: '1',
    title: 'AI-Driven Healthcare Diagnostics',
    description: 'An intelligent system that uses machine learning to predict early onset of diseases based on symptoms and medical history.',
    thumbnail: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    type: 'hackathon',
    premium: true,
    ultraPremium: false,
    votes: {
      up: 145,
      down: 12
    },
    views: 2350,
    tags: ['AI', 'Machine Learning', 'Healthcare', 'Python']
  },
  {
    id: '4',
    title: 'Urban Mobility Revolution',
    description: 'A sustainable transportation solution for congested urban areas combining electric vehicles and smart infrastructure.',
    thumbnail: 'https://images.unsplash.com/photo-1556139966-56c3df1ddc63?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    type: 'hackathon',
    premium: false,
    ultraPremium: false,
    votes: {
      up: 104,
      down: 8
    },
    views: 1750,
    tags: ['Mobility', 'Smart City', 'Sustainability', 'IoT']
  }
];

export const savedProjects: ProjectProps[] = [
  {
    id: '2',
    title: 'Sustainable Supply Chain Strategy',
    description: 'A comprehensive analysis and strategic plan for implementing eco-friendly practices in global supply chains.',
    thumbnail: 'https://images.unsplash.com/photo-1493946820527-0d00feee2c34?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Michael Roberts',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    type: 'case-competition',
    premium: false,
    ultraPremium: false,
    votes: {
      up: 87,
      down: 5
    },
    views: 1290,
    tags: ['Strategy', 'Sustainability', 'Supply Chain', 'Business']
  },
  {
    id: '3',
    title: 'Blockchain for Secure Voting',
    description: 'A decentralized voting platform ensuring transparency and security in elections using blockchain technology.',
    thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop',
    author: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    type: 'hackathon',
    premium: false,
    ultraPremium: true,
    votes: {
      up: 232,
      down: 18
    },
    views: 3780,
    tags: ['Blockchain', 'Security', 'Voting', 'Ethereum', 'Smart Contracts']
  }
];

export const notifications = [
  {
    id: 1,
    type: 'like',
    content: 'Michael Roberts liked your project "AI-Driven Healthcare Diagnostics"',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    content: 'Alex Johnson commented on your project "Urban Mobility Revolution"',
    time: '1 day ago',
    read: false,
  },
  {
    id: 3,
    type: 'payment',
    content: 'You received a payment of $15.99 for "AI-Driven Healthcare Diagnostics"',
    time: '3 days ago',
    read: true,
  },
  {
    id: 4,
    type: 'milestone',
    content: 'Your project "AI-Driven Healthcare Diagnostics" reached 2,000 views!',
    time: '1 week ago',
    read: true,
  }
];

export const earningsData = {
  totalEarnings: 245.78,
  thisMonth: 68.92,
  pendingPayout: 42.50,
  projects: [
    { name: 'AI-Driven Healthcare Diagnostics', amount: 185.25 },
    { name: 'Urban Mobility Revolution', amount: 60.53 }
  ],
  recentTransactions: [
    { id: 1, type: 'payout', amount: -150.00, date: 'Jun 15, 2023', status: 'Completed' },
    { id: 2, type: 'earning', amount: 24.99, date: 'Jun 10, 2023', project: 'AI-Driven Healthcare Diagnostics', status: 'Received' },
    { id: 3, type: 'earning', amount: 9.99, date: 'Jun 5, 2023', project: 'Urban Mobility Revolution', status: 'Received' },
    { id: 4, type: 'earning', amount: 9.99, date: 'Jun 1, 2023', project: 'AI-Driven Healthcare Diagnostics', status: 'Received' }
  ]
};
