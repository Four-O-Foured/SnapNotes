import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Camera, Brain, Star, FileText, Map, Settings } from "lucide-react";
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const navItems = [
    {
        label: 'Upload Notes',
        to: '/dashboard',
        icon: Camera,
        rotation: -12,
        offset: -15,
        hoverStyles: { bgColor: 'hsl(var(--snap-cyan))', textColor: 'hsl(var(--snap-bg-main))', glowColor: 'hsla(var(--snap-cyan), 0.4)' }
    },
    {
        label: 'My SnapNotes',
        to: '/dashboard/snapnotes',
        icon: Brain,
        rotation: 6,
        offset: 20,
        hoverStyles: { bgColor: 'hsl(var(--snap-mint))', textColor: 'hsl(var(--snap-bg-main))', glowColor: 'hsla(var(--snap-mint), 0.4)' }
    },
    {
        label: 'Library',
        to: '/dashboard/library',
        icon: Star,
        rotation: 14,
        offset: -25,
        hoverStyles: { bgColor: 'hsl(var(--snap-gold))', textColor: 'hsl(var(--snap-bg-main))', glowColor: 'hsla(var(--snap-gold), 0.4)' }
    },
    {
        label: 'Exam Practice',
        to: '/dashboard/exam',
        icon: FileText,
        rotation: -5,
        offset: 12,
        hoverStyles: { bgColor: 'hsl(var(--snap-coral))', textColor: 'hsl(var(--snap-bg-main))', glowColor: 'hsla(var(--snap-coral), 0.4)' }
    },
    {
        label: 'Mind Map',
        to: '/dashboard/mindmap',
        icon: Map,
        rotation: 18,
        offset: -10,
        hoverStyles: { bgColor: 'hsl(var(--snap-gradient-start))', textColor: '#ffffff', glowColor: 'hsla(var(--snap-gradient-start), 0.5)' }
    },
    {
        label: 'Settings',
        to: '/dashboard/settings',
        icon: Settings,
        rotation: -8,
        offset: 5,
        hoverStyles: { bgColor: 'hsl(var(--snap-text-muted))', textColor: '#ffffff', glowColor: 'hsla(var(--snap-text-muted), 0.3)' }
    },
];

// Sample books for the homepage (using Open Library covers)
export const sampleBooks = [
    {
        _id: '1',
        title: 'Clean Code',
        author: 'Robert Cecil Martin',
        slug: 'clean-code',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
        coverColor: '#f8f4e9',
    },
    {
        _id: '2',
        title: 'JavaScript: The Definitive Guide',
        author: 'David Flanagan',
        slug: 'javascript-the-definitive-guide',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780596805524-L.jpg',
        coverColor: '#f8f4e9',
    },
    {
        _id: '3',
        title: 'Brave New World',
        author: 'Aldous Huxley',
        slug: 'brave-new-world',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
        coverColor: '#f8f4e9',
    },
    {
        _id: '4',
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        slug: 'rich-dad-poor-dad',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg',
        coverColor: '#f8f4e9',
    },
    {
        _id: '5',
        title: 'Deep Work',
        author: 'Cal Newport',
        slug: 'deep-work',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg',
        coverColor: '#f8f4e9',
    },
    {
        _id: '6',
        title: 'How to Win Friends and Influence People',
        author: 'Dale Carnegie',
        slug: 'how-to-win-friends-and-influence-people',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780671027032-L.jpg',
        coverColor: '#f8f4e9',
    },
    {
        _id: '7',
        title: 'The Power of Habit',
        author: 'Charles Duhigg',
        slug: 'the-power-of-habit',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781400069286-L.jpg',
        coverColor: '#f8f4e9',
    },
    {
        _id: '8',
        title: 'Atomic Habits',
        author: 'James Clear',
        slug: 'atomic-habits',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
        coverColor: '#f8f4e9',
    },
    {
        _id: '9',
        title: 'The Courage to Be Disliked',
        author: 'Fumitake Koga & Ichiro Kishimi',
        slug: 'the-courage-to-be-disliked',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9781501197274-L.jpg',
        coverColor: '#f8f4e9',
    },
    {
        _id: '10',
        title: '1984',
        author: 'George Orwell',
        slug: '1984',
        coverURL: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
        coverColor: '#f8f4e9',
    },
];


export const ACCEPTED_PDF_TYPES = [
    'application/pdf',
    'application/x-pdf',
    'application/acrobat',
    'application/vnd.adobe.x-pdf',
    'application/postscript',
    'application/x-postscript',
];

// 11Labs Voice IDs - Optimized for conversational AI
// Voices selected for natural, engaging book conversations
export const voiceOptions = {
    // Male voices
    dave: { id: 'CYw3kZ02Hs0563khs1Fj', name: 'Dave', description: 'Young male, British-Essex, casual & conversational' },
    daniel: { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', description: 'Middle-aged male, British, authoritative but warm' },
    chris: { id: 'iP95p4xoKVk53GoZ742B', name: 'Chris', description: 'Male, casual & easy-going' },
    // Female voices
    rachel: { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', description: 'Young female, American, calm & clear' },
    sarah: { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', description: 'Young female, American, soft & approachable' },
};

// Voice categories for the selector UI
export const voiceCategories = {
    male: ['dave', 'daniel', 'chris'],
    female: ['rachel', 'sarah'],
};

// Default voice
export const DEFAULT_VOICE = 'rachel';

// ElevenLabs voice settings optimized for conversational AI
export const VOICE_SETTINGS = {
    stability: 0.45, // Lower for more emotional, dynamic delivery (0.30-0.50 is natural)
    similarityBoost: 0.75, // Enhances clarity without distortion
    style: 0, // Keep at 0 for conversational AI (higher = more latency, less stable)
    useSpeakerBoost: true, // Improves voice quality
    speed: 1.0, // Natural conversation speed
};
