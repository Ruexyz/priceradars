'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

/**
 * Tabs component inspired by Parallel.ai
 * https://parallel.ai/
 * 
 * Clean, minimal tabs with subtle active states
 */

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center gap-1 border-b border-gray-200',
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styles
      'relative inline-flex items-center justify-center whitespace-nowrap px-4 py-2.5 text-sm font-medium',
      // Colors
      'text-gray-500 hover:text-gray-900',
      // Transitions
      'transition-colors duration-150',
      // Focus
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
      // Disabled
      'disabled:pointer-events-none disabled:opacity-50',
      // Active state - underline indicator
      'data-[state=active]:text-gray-900',
      'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-transparent after:transition-colors after:duration-150',
      'data-[state=active]:after:bg-orange-500',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
      // Animation
      'data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// Alternative pill-style tabs (like Parallel's benchmark tabs)
const TabsListPills = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center gap-2 p-1 bg-gray-100 rounded-lg',
      className
    )}
    {...props}
  />
))
TabsListPills.displayName = 'TabsListPills'

const TabsTriggerPill = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styles
      'inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md',
      // Colors
      'text-gray-600 hover:text-gray-900',
      // Transitions
      'transition-all duration-150',
      // Focus
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
      // Disabled
      'disabled:pointer-events-none disabled:opacity-50',
      // Active state
      'data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
))
TabsTriggerPill.displayName = 'TabsTriggerPill'

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsListPills, TabsTriggerPill }
