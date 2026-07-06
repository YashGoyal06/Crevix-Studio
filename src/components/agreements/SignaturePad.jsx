import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { canvasHasSignature, createTypedSignatureImage } from '../../services/signature/signatureService';

const signatureFonts = ['Great Vibes', 'Pacifico', 'Dancing Script'];

export default function SignaturePad({ clientName, onChange }) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const [method, setMethod] = useState('draw');
  const [typedName, setTypedName] = useState(clientName || '');
  const [font, setFont] = useState(signatureFonts[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || method !== 'draw') return undefined;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      const context = canvas.getContext('2d');
      context.scale(ratio, ratio);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = 2.4;
      context.strokeStyle = '#111827';
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [method]);

  useEffect(() => {
    if (method !== 'type') return;
    onChange({
      image: createTypedSignatureImage(typedName, font),
      method,
    });
  }, [font, method, onChange, typedName]);

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const point = getPoint(event);
    drawingRef.current = true;
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const draw = (event) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const point = getPoint(event);
    context.lineTo(point.x, point.y);
    context.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (!drawingRef.current || !canvas) return;
    drawingRef.current = false;
    if (canvasHasSignature(canvas)) {
      onChange({ image: canvas.toDataURL('image/png'), method });
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    onChange({ image: '', method });
  };

  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <div className="mb-4 grid grid-cols-2 rounded-md border border-slate-200 p-1 text-sm font-medium">
        <button
          className={`rounded px-3 py-2 ${method === 'draw' ? 'bg-slate-950 text-white' : 'text-slate-700'}`}
          type="button"
          onClick={() => setMethod('draw')}
        >
          Draw
        </button>
        <button
          className={`rounded px-3 py-2 ${method === 'type' ? 'bg-slate-950 text-white' : 'text-slate-700'}`}
          type="button"
          onClick={() => setMethod('type')}
        >
          Type
        </button>
      </div>

      {method === 'draw' ? (
        <div>
          <canvas
            ref={canvasRef}
            className="h-40 w-full touch-none rounded-md border border-dashed border-slate-300 bg-slate-50"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
            onPointerLeave={stopDrawing}
          />
          <button
            className="mt-3 inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700"
            type="button"
            onClick={clear}
          >
            <RotateCcw size={16} />
            Clear
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            value={typedName}
            onChange={(event) => setTypedName(event.target.value)}
            placeholder="Type your full name"
          />
          <select
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            value={font}
            onChange={(event) => setFont(event.target.value)}
          >
            {signatureFonts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div
            className="flex h-32 items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 text-5xl text-slate-950"
            style={{ fontFamily: `"${font}", "Brush Script MT", cursive` }}
          >
            {typedName || 'Signature'}
          </div>
        </div>
      )}
    </div>
  );
}
