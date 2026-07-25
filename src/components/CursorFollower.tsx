import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    document.body.classList.add('custom-cursor-enabled');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;
    let isHoveringInteractive = false;
    let frameId: number;

    const dot = dotRef.current!;
    const blob = blobRef.current!;
    dot.style.opacity = '1';
    blob.style.opacity = '0.38';

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      isHoveringInteractive = Boolean(
        target.closest('a, button, [role="button"], input[type="button"], input[type="submit"], .card, [class*="card"]'),
      );
    };

    const handleDocumentMouseLeave = () => {
      dot.style.opacity = '0';
      blob.style.opacity = '0';
    };

    const handleDocumentMouseEnter = () => {
      dot.style.opacity = '1';
      blob.style.opacity = isHoveringInteractive ? '0.26' : '0.38';
    };

    const animateBlob = () => {
      blobX += (mouseX - blobX) * 0.1;
      blobY += (mouseY - blobY) * 0.1;

      const scale = isHoveringInteractive ? 1.5 : 1;
      const opacity = isHoveringInteractive ? 0.26 : 0.38;

      blob.style.opacity = `${opacity}`;
      blob.style.left = `${blobX}px`;
      blob.style.top = `${blobY}px`;
      blob.style.transform = `translate(-50%, -50%) scale(${scale})`;

      frameId = window.requestAnimationFrame(animateBlob);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleDocumentMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleDocumentMouseEnter);
    frameId = window.requestAnimationFrame(animateBlob);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleDocumentMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleDocumentMouseEnter);
      document.body.classList.remove('custom-cursor-enabled');
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="cursor-follower-root">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={blobRef} className="cursor-blob" />
    </div>
  );
}
