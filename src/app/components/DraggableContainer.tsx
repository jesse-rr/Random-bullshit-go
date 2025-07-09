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
  initialPosition,
  title = "Painel Flutuante"
}: DraggableContainerProps) {
  const { isDragging, position, dragRef, handleMouseDown } = useDragAndDrop(initialPosition);

  return (
    <div
      ref={dragRef}
      className={`fixed z-50 transition-all duration-200 ${
        isDragging ? 'shadow-2xl scale-[1.02]' : 'shadow-lg hover:shadow-xl'
      } ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden min-w-[300px] max-w-[400px]">
        {/* Drag Handle */}
        <div 
          className={`bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full opacity-80"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-80"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full opacity-80"></div>
              </div>
              <span className="text-sm text-white font-medium">
                {title}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
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