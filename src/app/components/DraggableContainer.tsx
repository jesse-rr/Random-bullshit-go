'use client'

import { ReactNode } from 'react';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

interface DraggableContainerProps {
  children: ReactNode;
  className?: string;
  initialPosition?: { x: number; y: number };
  title?: string;
}

export function DraggableContainer({ 
  children, 
  className = '', 
  initialPosition = { x: 100, y: 100 },
  title = "Painel Flutuante"
}: DraggableContainerProps) {
  const { isDragging, position, dragRef, handleMouseDown } = useDragAndDrop(initialPosition);

  return (
    <div
      ref={dragRef}
      className={`fixed z-50 select-none ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.2s ease',
      }}
    >
      <div className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden min-w-[350px] max-w-[400px] ${
        isDragging ? 'shadow-2xl' : 'shadow-lg'
      }`}>
        {/* Drag Handle */}
        <div 
          className={`bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          style={{ userSelect: 'none' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full opacity-80"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-80"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full opacity-80"></div>
              </div>
              <span className="text-sm text-white font-medium select-none">
                {title}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white/60 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}