/**
 * PhotoSlot — reliable image display using CSS aspect-ratio classes.
 *
 * aspectRatio values:
 *   "3/4"  | "4/5"  | "4/3"  | "1/1"  | "16/9" | "21/9" | "video"
 *
 * Usage:
 *   <PhotoSlot src={myImage} alt="description" aspectRatio="4/5" />
 *   <PhotoSlot src="https://..." alt="description" aspectRatio="1/1" />
 */

const ratioClass = {
  '3/4':  'photo-3-4',
  '4/5':  'photo-4-5',
  '4/3':  'photo-4-3',
  '1/1':  'photo-1-1',
  '16/9': 'photo-16-9',
  '21/9': 'photo-21-9',
  'video':'photo-video',
  // legacy Tailwind arbitrary value aliases
  'aspect-[3/4]':   'photo-3-4',
  'aspect-[4/5]':   'photo-4-5',
  'aspect-[4/3]':   'photo-4-3',
  'aspect-square':  'photo-1-1',
  'aspect-video':   'photo-video',
  'aspect-[16/9]':  'photo-16-9',
  'aspect-[21/9]':  'photo-21-9',
  'aspect-[16/6]':  'photo-21-9',
};

export default function PhotoSlot({
  src,
  alt = 'Hajjo Dollars Wealth Solutions',
  className = '',
  label = 'Photo',
  aspectRatio = '4/5',
  objectPosition = 'center',
}) {
  const ratio = ratioClass[aspectRatio] || 'photo-4-5';

  if (src) {
    return (
      <div className={`photo-wrap ${ratio} ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition }}
        />
      </div>
    );
  }

  // Placeholder
  return (
    <div className={`photo-placeholder ${ratio} ${className} bg-muted border border-border transition-colors duration-300`} aria-label={label}>
      <div
        className="absolute inset-0 opacity-40 transition-colors duration-500"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-color) 1px,transparent 1px),linear-gradient(90deg,var(--grid-color) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary/40 transition-colors" />
      <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-primary/40 transition-colors" />
      <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-primary/40 transition-colors" />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-primary/40 transition-colors" />
      <span className="text-4xl relative z-10 filter grayscale">📸</span>
      <p className="text-muted-foreground/50 text-[10px] uppercase tracking-widest relative z-10 text-center px-4 transition-colors">{label}</p>
    </div>
  );
}
