import React from 'react'
import { Category, UserCategoryProgress } from '../../lib/supabase'
import CategoryCard from './CategoryCard'

interface CategoriesListProps {
  categories: Category[]
  progress: UserCategoryProgress[]
  onCategorySelect: (category: Category) => void
  loading?: boolean
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  categories,
  progress,
  onCategorySelect,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full" />
              <div className="w-6 h-6 bg-gray-300 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-2/3" />
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-300 rounded w-full mb-2" />
              <div className="h-10 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const categoryProgress = progress.find(p => p.category_id === category.id)
        return (
          <CategoryCard
            key={category.id}
            category={category}
            progress={categoryProgress}
            onSelect={onCategorySelect}
          />
        )
      })}
    </div>
  )
}

export default CategoriesList
