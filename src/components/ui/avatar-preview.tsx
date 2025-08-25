"use client"

import * as LucideIcons from 'lucide-react'
import { cn } from '@/utils'

interface AvatarPreviewProps {
  iconName: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showBackground?: boolean
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12', 
  lg: 'h-16 w-16',
  xl: 'h-24 w-24'
}

const iconSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8', 
  xl: 'h-12 w-12'
}

export function AvatarPreview({ 
  iconName, 
  size = 'md', 
  className,
  showBackground = true 
}: AvatarPreviewProps) {
  const getIconComponent = (iconName: string) => {
    // Convert kebab-case to PascalCase for Lucide icon lookup
    const pascalCase = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
    
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[pascalCase]
    return IconComponent || LucideIcons.User
  }

  const IconComponent = getIconComponent(iconName)

  return (
    <div 
      className={cn(
        'flex items-center justify-center rounded-full transition-all duration-200',
        sizeClasses[size],
        showBackground && 'bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/10',
        className
      )}
    >
      <IconComponent className={cn(
        'text-primary transition-colors',
        iconSizeClasses[size]
      )} />
    </div>
  )
}