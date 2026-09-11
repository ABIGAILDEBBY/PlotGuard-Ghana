import type { AppState, Video, Sponsorship, GearItem, Idea } from '../types'
import { makeId, defaultChecklist } from '../lib/helpers'

function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function daysAgo(days: number): string {
  return daysFromNow(-days)
}

function checklistThrough(count: number) {
  return defaultChecklist().map((item, i) => ({ ...item, done: i < count }))
}

export function seedState(): AppState {
  const novaVideoId = makeId('vid')
  const aiToolsVideoId = makeId('vid')
  const generativeArtVideoId = makeId('vid')
  const deskSetupVideoId = makeId('vid')
  const procreateVsPhotoshopVideoId = makeId('vid')
  const stylusShortVideoId = makeId('vid')
  const novaSponsorshipId = makeId('spon')

  const videos: Video[] = [
    {
      id: novaVideoId,
      title: 'Is the Nova 13 Pen Display Actually Worth It for Digital Artists?',
      format: 'Review',
      stage: 'published',
      publishDate: daysAgo(12),
      tags: ['review', 'hardware', 'digital art'],
      notes: 'Sponsored review unit from Nova. Be upfront about the discount code in the description.',
      scriptUrl: '',
      checklist: checklistThrough(6),
      stats: { views: 42300, likes: 3100, comments: 214, watchTimeMinutes: 118000, updatedAt: daysAgo(1) },
      createdAt: daysAgo(20),
      updatedAt: daysAgo(1),
    },
    {
      id: aiToolsVideoId,
      title: '5 AI Art Tools That Actually Save You Time',
      format: 'Tutorial',
      stage: 'scheduled',
      publishDate: daysFromNow(3),
      tags: ['ai art', 'tutorial', 'workflow'],
      notes: 'Keep it tool-agnostic, show a real before/after workflow time comparison.',
      scriptUrl: '',
      checklist: checklistThrough(5),
      stats: null,
      createdAt: daysAgo(9),
      updatedAt: daysAgo(1),
    },
    {
      id: generativeArtVideoId,
      title: 'Building a Generative Art Piece With Code (Beginner Friendly)',
      format: 'Tutorial',
      stage: 'editing',
      publishDate: daysFromNow(9),
      tags: ['creative coding', 'generative art', 'tutorial'],
      notes: 'Use p5.js. Keep the math intuitive, save the equations for a follow-up video.',
      scriptUrl: '',
      checklist: checklistThrough(3),
      stats: null,
      createdAt: daysAgo(6),
      updatedAt: daysAgo(2),
    },
    {
      id: deskSetupVideoId,
      title: 'My Desk Setup for Digital Art + Content Creation (2026)',
      format: 'Deep Dive',
      stage: 'filming',
      publishDate: daysFromNow(14),
      tags: ['setup', 'desk tour', 'gear'],
      notes: 'Film in daylight, get B-roll of the lighting rig separately.',
      scriptUrl: '',
      checklist: checklistThrough(2),
      stats: null,
      createdAt: daysAgo(4),
      updatedAt: daysAgo(1),
    },
    {
      id: procreateVsPhotoshopVideoId,
      title: 'Procreate vs. Photoshop for Digital Painting — Which Should You Learn?',
      format: 'Opinion',
      stage: 'scripting',
      publishDate: null,
      tags: ['procreate', 'photoshop', 'comparison'],
      notes: 'Frame it around beginners choosing their first tool, not a flame war.',
      scriptUrl: '',
      checklist: checklistThrough(1),
      stats: null,
      createdAt: daysAgo(2),
      updatedAt: daysAgo(2),
    },
    {
      id: stylusShortVideoId,
      title: 'This $30 Stylus Surprised Me',
      format: 'Short',
      stage: 'published',
      publishDate: daysAgo(4),
      tags: ['short', 'budget gear'],
      notes: '',
      scriptUrl: '',
      checklist: checklistThrough(6),
      stats: { views: 118000, likes: 9800, comments: 340, watchTimeMinutes: 65000, updatedAt: daysAgo(1) },
      createdAt: daysAgo(10),
      updatedAt: daysAgo(4),
    },
  ]

  const ideas: Idea[] = [
    {
      id: makeId('idea'),
      title: 'Reacting to My First Ever Upload',
      notes: 'Good milestone/anniversary video idea.',
      tags: ['milestone', 'community'],
      priority: 'low',
      createdAt: daysAgo(15),
    },
    {
      id: makeId('idea'),
      title: 'Can AI Upscaling Replace a Real Camera Upgrade?',
      notes: 'Test on old B-roll vs. new footage side by side.',
      tags: ['ai', 'video gear'],
      priority: 'medium',
      createdAt: daysAgo(7),
    },
    {
      id: makeId('idea'),
      title: 'I Let AI Design My Thumbnails for a Month',
      notes: 'Track CTR before/after as the payoff — needs 30 days of data.',
      tags: ['ai art', 'youtube strategy'],
      priority: 'high',
      createdAt: daysAgo(3),
    },
  ]

  const sponsorships: Sponsorship[] = [
    {
      id: novaSponsorshipId,
      sponsor: 'Nova Tablets',
      videoId: novaVideoId,
      deliverables: ['60s dedicated segment', 'Pinned comment with code', 'Description link'],
      deadline: daysFromNow(-2),
      amount: 1800,
      paymentStatus: 'invoiced',
      disclosureRequired: true,
      notes: 'Contact: partnerships@example.com. Net-30 payment terms.',
    },
    {
      id: makeId('spon'),
      sponsor: 'PixelForge Software',
      videoId: null,
      deliverables: ['Full tutorial featuring their app', 'Dedicated video, not an integration'],
      deadline: daysFromNow(10),
      amount: 2500,
      paymentStatus: 'pending',
      disclosureRequired: true,
      notes: 'Waiting on their creative brief before scripting.',
    },
  ]

  const gear: GearItem[] = [
    {
      id: makeId('gear'),
      name: 'Nova 13 Pen Display',
      category: 'Hardware',
      usedInVideoIds: [novaVideoId, deskSetupVideoId],
      affiliateLink: '',
      notes: 'Sponsored review unit — keep for future comparison videos.',
      featured: true,
    },
    {
      id: makeId('gear'),
      name: 'Procreate',
      category: 'Software',
      usedInVideoIds: [procreateVsPhotoshopVideoId, deskSetupVideoId],
      affiliateLink: '',
      notes: 'Primary painting app for tutorials.',
      featured: true,
    },
    {
      id: makeId('gear'),
      name: 'Adobe Photoshop',
      category: 'Software',
      usedInVideoIds: [procreateVsPhotoshopVideoId],
      affiliateLink: '',
      notes: '',
      featured: true,
    },
    {
      id: makeId('gear'),
      name: 'Blender',
      category: 'Software',
      usedInVideoIds: [],
      affiliateLink: '',
      notes: 'Own it but haven’t featured it on camera yet — could be its own video.',
      featured: false,
    },
    {
      id: makeId('gear'),
      name: 'DriftTech Stylus Pro',
      category: 'Accessory',
      usedInVideoIds: [stylusShortVideoId],
      affiliateLink: '',
      notes: 'The $30 stylus from the Shorts review.',
      featured: true,
    },
  ]

  return { videos, ideas, sponsorships, gear }
}
