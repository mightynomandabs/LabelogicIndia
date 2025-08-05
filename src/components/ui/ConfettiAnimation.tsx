import { useEffect, useRef } from "react";

interface ConfettiAnimationProps {
  isActive: boolean;
  duration?: number;
}

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ 
  isActive, 
  duration = 3000 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Brand colors for confetti
    const colors = ['#9b87f5', '#FEF7CD', '#34D399', '#F9D34E', '#7E69AB'];
    
    // Create confetti pieces
    const confetti: ConfettiPiece[] = [];
    const numPieces = 100;

    for (let i = 0; i < numPieces; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed > duration) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((piece) => {
        // Update position
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.vy += 0.1; // Gravity
        piece.rotation += piece.rotationSpeed;

        // Draw confetti piece
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);

        // Draw different shapes
        const shapeType = Math.floor(Math.random() * 3);
        
        ctx.fillStyle = piece.color;
        ctx.shadowColor = piece.color;
        ctx.shadowBlur = 5;

        switch (shapeType) {
          case 0: // Square
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            break;
          case 1: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, piece.size / 2, 0, 2 * Math.PI);
            ctx.fill();
            break;
          case 2: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -piece.size / 2);
            ctx.lineTo(-piece.size / 2, piece.size / 2);
            ctx.lineTo(piece.size / 2, piece.size / 2);
            ctx.closePath();
            ctx.fill();
            break;
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, duration]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default ConfettiAnimation; 