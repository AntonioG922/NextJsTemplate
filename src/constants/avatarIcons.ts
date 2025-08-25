export interface AvatarIconCategory {
  id: string
  name: string
  emoji: string
  color: string
  icons: string[]
}

export const AVATAR_ICON_CATEGORIES: AvatarIconCategory[] = [
  {
    id: 'fruits-food',
    name: 'Fruits & Food',
    emoji: '🍎',
    color: 'from-red-400 to-orange-400',
    icons: [
      'apple',
      'coffee', 
      'wine',
      'soup',
      'cookie',
      'milk',
      'egg',
      'cake',
      'pizza',
      'ice-cream',
      'sandwich',
      'salad'
    ]
  },
  {
    id: 'gaming-entertainment',
    name: 'Gaming & Fun',
    emoji: '🎮',
    color: 'from-purple-400 to-pink-400',
    icons: [
      'gamepad-2',
      'trophy',
      'target',
      'rocket',
      'sword',
      'shield',
      'crown',
      'gem',
      'star',
      'medal',
      'award',
      'zap'
    ]
  },
  {
    id: 'animals-nature',
    name: 'Animals & Nature',
    emoji: '🐱',
    color: 'from-green-400 to-blue-400',
    icons: [
      'cat',
      'dog',
      'rabbit',
      'bird',
      'fish',
      'bug',
      'tree-palm',
      'flower',
      'sun',
      'moon',
      'cloud',
      'leaf'
    ]
  },
  {
    id: 'technology-objects',
    name: 'Tech & Objects',
    emoji: '🤖',
    color: 'from-blue-400 to-indigo-400',
    icons: [
      'bot',
      'laptop',
      'smartphone',
      'headphones',
      'camera',
      'watch',
      'satellite',
      'usb',
      'wifi',
      'battery',
      'lightbulb',
      'key'
    ]
  },
  {
    id: 'activities-hobbies',
    name: 'Activities',
    emoji: '⚡',
    color: 'from-yellow-400 to-red-400',
    icons: [
      'graduation-cap',
      'guitar',
      'bike',
      'paintbrush',
      'book',
      'music',
      'chef-hat',
      'dumbbell',
      'plane',
      'car',
      'mountain',
      'tent'
    ]
  },
  {
    id: 'symbols-abstract',
    name: 'Symbols',
    emoji: '✨',
    color: 'from-indigo-400 to-purple-400',
    icons: [
      'star',
      'heart',
      'diamond',
      'circle-dot',
      'triangle',
      'square',
      'sparkles',
      'flame',
      'zap',
      'infinity',
      'check',
      'smile'
    ]
  }
]

// Flattened list of all available icons for easy lookup
export const ALL_AVATAR_ICONS = AVATAR_ICON_CATEGORIES.flatMap(category => category.icons)

// Default avatar icon for new users
export const DEFAULT_AVATAR_ICON = 'user-round'

// Popular icons that get special treatment in UI
export const POPULAR_AVATAR_ICONS = [
  'cat',
  'dog', 
  'rocket',
  'star',
  'heart',
  'gamepad-2',
  'pizza',
  'bot'
]

// Helper function to get category for an icon
export function getIconCategory(iconName: string): AvatarIconCategory | undefined {
  return AVATAR_ICON_CATEGORIES.find(category => 
    category.icons.includes(iconName)
  )
}

// Helper function to check if an icon is valid
export function isValidAvatarIcon(iconName: string): boolean {
  return ALL_AVATAR_ICONS.includes(iconName) || iconName === DEFAULT_AVATAR_ICON
}