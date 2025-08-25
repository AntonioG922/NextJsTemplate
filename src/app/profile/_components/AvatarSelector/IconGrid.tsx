"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Check } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

interface IconGridProps {
  icons: string[]
  selectedIcon: string
  onSelectIcon: (iconName: string) => void
  popularIcons?: string[]
  columns?: number
}

export function IconGrid({
  icons,
  selectedIcon,
  onSelectIcon,
  popularIcons = [],
  columns = 6
}: IconGridProps) {
  const getIconComponent = (iconName: string) => {
    // Convert kebab-case to PascalCase for Lucide icon lookup
    const pascalCase = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
    
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[pascalCase]
    return IconComponent || LucideIcons.Circle
  }

  const isPopular = (iconName: string) => popularIcons.includes(iconName)
  const isSelected = (iconName: string) => selectedIcon === iconName

  return (
    <TooltipProvider>
      <div 
        className={`grid gap-2`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }}
      >
        {icons.map((iconName) => {
          const IconComponent = getIconComponent(iconName)
          const selected = isSelected(iconName)
          const popular = isPopular(iconName)

          return (
            <Tooltip key={iconName}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectIcon(iconName)}
                  className={`
                    relative aspect-square h-14 w-full p-2 
                    transition-all duration-200 ease-out
                    hover:scale-110 hover:shadow-md hover:bg-accent
                    active:scale-95
                    ${selected 
                      ? 'ring-2 ring-primary ring-offset-2 bg-primary/10' 
                      : 'hover:bg-accent/50'
                    }
                  `}
                >
                  {/* Popular Badge */}
                  {popular && !selected && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-1 -right-1 h-4 px-1 text-[10px] leading-none"
                    >
                      ⭐
                    </Badge>
                  )}

                  {/* Selected Checkmark */}
                  {selected && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}

                  {/* Icon */}
                  <IconComponent 
                    className={`h-6 w-6 transition-colors ${
                      selected ? 'text-primary' : 'text-foreground'
                    }`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-2">
                  <span className="capitalize">
                    {iconName.replace('-', ' ')}
                  </span>
                  {popular && <span className="text-xs">⭐ Popular</span>}
                </div>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}