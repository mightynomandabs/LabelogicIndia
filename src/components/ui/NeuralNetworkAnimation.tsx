import { useEffect, useRef } from "react";

interface NeuralNetworkAnimationProps {
  isActive: boolean;
  className?: string;
}

const NeuralNetworkAnimation: React.FC<NeuralNetworkAnimationProps> = ({ 
  isActive, 
  className = "" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Neural network nodes
    const nodes = [
      { x: 50, y: 50, active: false },
      { x: 150, y: 30, active: false },
      { x: 250, y: 50, active: false },
      { x: 50, y: 150, active: false },
      { x: 150, y: 150, active: false },
      { x: 250, y: 150, active: false },
      { x: 100, y: 250, active: false },
      { x: 200, y: 250, active: false }
    ];

    // Connections between nodes
    const connections = [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 },
      { from: 1, to: 2 }, { from: 1, to: 4 }, { from: 1, to: 5 },
      { from: 2, to: 5 }, { from: 3, to: 4 }, { from: 3, to: 6 },
      { from: 4, to: 5 }, { from: 4, to: 6 }, { from: 4, to: 7 },
      { from: 5, to: 7 }, { from: 6, to: 7 }
    ];

    let animationId: number;
    let time = 0;

    const animate = () => {
      if (!isActive) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update node states
      nodes.forEach((node, index) => {
        node.active = Math.sin(time + index * 0.5) > 0;
      });

      // Draw connections
      connections.forEach((connection, index) => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        if (fromNode.active || toNode.active) {
          ctx.strokeStyle = '#9b87f5';
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = '#D6BCFA';
          ctx.lineWidth = 1;
        }

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.active ? 8 : 6, 0, 2 * Math.PI);
        
        if (node.active) {
          ctx.fillStyle = '#9b87f5';
          ctx.shadowColor = '#9b87f5';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = '#D6BCFA';
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      time += 0.05;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-brand-purple/90 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">AI Processing...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetworkAnimation; 