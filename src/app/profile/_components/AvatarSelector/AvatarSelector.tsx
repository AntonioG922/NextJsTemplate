"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'
import { AVATAR_ICON_CATEGORIES, POPULAR_AVATAR_ICONS, DEFAULT_AVATAR_ICON } from '@/constants/avatarIcons'
import { IconGrid } from './IconGrid'
import { AvatarPreview } from '@/components/ui/avatar-preview'

interface AvatarSelectorProps {
  isOpen: boolean
  onClose: () => void
  currentIcon?: string
  onSelectIcon: (iconName: string) => void
  onSave: () => void
  isLoading?: boolean
}

export function AvatarSelector({
  isOpen,
  onClose,
  currentIcon,
  onSelectIcon,
  onSave,
  isLoading = false
}: AvatarSelectorProps) {
  const [activeCategory, setActiveCategory] = useState(AVATAR_ICON_CATEGORIES[0].id)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIcon, setSelectedIcon] = useState(currentIcon || DEFAULT_AVATAR_ICON)

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName)
    onSelectIcon(iconName)
  }

  const handleSave = () => {
    onSave()
    onClose()
  }

  const filteredCategories = AVATAR_ICON_CATEGORIES.map(category => ({
    ...category,
    icons: category.icons.filter(icon =>
      icon.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.icons.length > 0)

  const hasSearchResults = searchQuery && filteredCategories.length > 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Choose Your Avatar
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Avatar Preview */}
          <div className="flex items-center gap-4 py-4">
            <AvatarPreview iconName={selectedIcon} size="lg" />
            <div>
              <p className="text-sm text-muted-foreground">Preview</p>
              <p className="font-medium capitalize">
                {selectedIcon.replace('-', ' ')}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {!hasSearchResults && (
            /* Category Tabs */
            <div className="flex-shrink-0 border-b">
              <div className="flex overflow-x-auto scrollbar-hide">
                {AVATAR_ICON_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                      activeCategory === category.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="text-base">{category.emoji}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Icon Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {hasSearchResults ? (
              /* Search Results */
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-sm font-medium">Search Results</h3>
                  <Badge variant="secondary">
                    {filteredCategories.reduce((sum, cat) => sum + cat.icons.length, 0)} icons
                  </Badge>
                </div>
                {filteredCategories.map((category) => (
                  <div key={category.id} className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm">{category.emoji}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.icons.length}
                      </Badge>
                    </div>
                    <IconGrid
                      icons={category.icons}
                      selectedIcon={selectedIcon}
                      onSelectIcon={handleIconSelect}
                      popularIcons={POPULAR_AVATAR_ICONS}
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Category View */
              <>
                {AVATAR_ICON_CATEGORIES
                  .filter(category => category.id === activeCategory)
                  .map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">{category.emoji}</span>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <Badge variant="secondary">
                          {category.icons.length} icons
                        </Badge>
                      </div>
                      <IconGrid
                        icons={category.icons}
                        selectedIcon={selectedIcon}
                        onSelectIcon={handleIconSelect}
                        popularIcons={POPULAR_AVATAR_ICONS}
                      />
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="min-w-20"
          >
            {isLoading ? 'Saving...' : 'Save Avatar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}