'use client'

import { useCallback, useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseDragAndDropResult {
  isDragging: boolean;
  position: Position;
  dragRef: React.RefObject<HTMLDivElement>;
  handleMouseDown: (e: React.MouseEvent) => void;
}

export const useDragAndDrop = (initialPosition?: Position): UseDragAndDropResult => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>(initialPosition || { x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState<Position>({ x: 0, y: 0 });
  
  const dragRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos(position);
    
    // Prevent text selection while dragging
    e.preventDefault();
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const newX = initialPos.x + deltaX;
    const newY = initialPos.y + deltaY;
    
    // Constrain to viewport bounds
    const maxX = window.innerWidth - 320; // Assuming 320px width
    const maxY = window.innerHeight - 200; // Minimum height constraint
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  }, [isDragging, dragStart, initialPos]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    isDragging,
    position,
    dragRef,
    handleMouseDown
  };
};