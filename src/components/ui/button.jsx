// Simple Button component for LiftupLabs
import { cloneElement } from 'react'

export const Button = ({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default',
  asChild = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-orange-300'
  
  const variants = {
    default: 'bg-orange-600 text-white hover:bg-orange-700 shadow-md hover:shadow-lg',
    outline: 'border-2 border-orange-600 text-orange-700 hover:bg-orange-50',
    ghost: 'hover:bg-orange-100 text-orange-700'
  }
  
  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    lg: 'px-6 py-3 text-base'
  }
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
  
  if (asChild && children) {
    // Clone the child element and merge the className
    return cloneElement(children, {
      className: `${classes} ${children.props.className || ''}`.trim(),
      ...props
    })
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
