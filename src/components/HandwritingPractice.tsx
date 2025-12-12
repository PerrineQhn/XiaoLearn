import { useRef, useState, useEffect } from 'react';
import type { Language } from '../i18n';

interface HandwritingPracticeProps {
  language: Language;
  characters: Array<{
    id: string;
    chinese: string;
    pinyin: string;
    french: string;
    english: string;
  }>;
  onComplete?: () => void;
}

const HandwritingPractice = ({ language, characters, onComplete }: HandwritingPracticeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false);

  const currentCharacter = characters[currentCharacterIndex];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Configure drawing style
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1F2233';
    ctx.lineWidth = 4;
  }, []);

  // Get coordinates relative to canvas
  const getCoordinates = (event: { clientX: number; clientY: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  // Start drawing
  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setIsDrawing(true);
    setHasDrawn(true);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const coords = 'touches' in event
      ? getCoordinates(event.touches[0])
      : getCoordinates(event.nativeEvent as MouseEvent);

    if (coords) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  // Draw
  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    event.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const coords = 'touches' in event
      ? getCoordinates(event.touches[0])
      : getCoordinates(event.nativeEvent as MouseEvent);

    if (coords) {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  // Stop drawing
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Next character
  const nextCharacter = () => {
    if (currentCharacterIndex < characters.length - 1) {
      setCurrentCharacterIndex(currentCharacterIndex + 1);
      clearCanvas();
    } else {
      onComplete?.();
    }
  };

  // Previous character
  const previousCharacter = () => {
    if (currentCharacterIndex > 0) {
      setCurrentCharacterIndex(currentCharacterIndex - 1);
      clearCanvas();
    }
  };

  if (!currentCharacter) {
    return (
      <div className="handwriting-empty">
        <p>{language === 'fr' ? 'Aucun caractère disponible' : 'No characters available'}</p>
      </div>
    );
  }

  return (
    <div className="handwriting-practice">
      <div className="handwriting-header">
        <h2 className="handwriting-title">
          {language === 'fr' ? 'Pratique d\'écriture' : 'Handwriting Practice'}
        </h2>
        <p className="handwriting-progress">
          {currentCharacterIndex + 1} / {characters.length}
        </p>
      </div>

      <div className="handwriting-character-info">
        <div className="handwriting-character-display">{currentCharacter.chinese}</div>
        <div className="handwriting-character-details">
          <p className="handwriting-pinyin">{currentCharacter.pinyin}</p>
          <p className="handwriting-translation">
            {language === 'fr' ? currentCharacter.french : currentCharacter.english}
          </p>
        </div>
      </div>

      <div className="handwriting-canvas-container">
        <canvas
          ref={canvasRef}
          className="handwriting-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <div className="handwriting-guide">
          <span className="handwriting-guide-character">{currentCharacter.chinese}</span>
        </div>
      </div>

      <div className="handwriting-controls">
        <button
          className="btn-secondary"
          onClick={clearCanvas}
          disabled={!hasDrawn}
        >
          {language === 'fr' ? 'Effacer' : 'Clear'}
        </button>
        <div className="handwriting-nav">
          <button
            className="btn-secondary"
            onClick={previousCharacter}
            disabled={currentCharacterIndex === 0}
          >
            ← {language === 'fr' ? 'Précédent' : 'Previous'}
          </button>
          <button
            className="btn-primary"
            onClick={nextCharacter}
          >
            {currentCharacterIndex < characters.length - 1
              ? (language === 'fr' ? 'Suivant' : 'Next')
              : (language === 'fr' ? 'Terminer' : 'Finish')} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandwritingPractice;
