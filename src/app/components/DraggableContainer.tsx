'use client'

import { ReactNode } from 'react';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

interface DraggableContainerProps {
  children: ReactNode;
  className?: string;
  initialPosition?: { x: number; y: number };
}

export function DraggableContainer({ children, className = '', initialPosition }: DraggableContainerProps) {
  const { isDragging, position, dragRef, handleMouseDown } = useDragAndDrop(initialPosition);

  return (
    <div
      ref={dragRef}
      className={`fixed z-50 transition-shadow duration-200 ${
        isDragging ? 'shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
      } ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
              Weather Panel
            </span>
          </div>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}