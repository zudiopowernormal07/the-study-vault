import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowLeft, Star, ChevronRight, Share, Sparkles, Zap, Shield, Download, Library, Settings, X } from 'lucide-react';
import { Platform, platformDataFallback } from './fallbackData';

// Harmonic Canvas Animation based on the user's mathematical code image
const CanvasAnimation: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let frames = 0;
    const rad = Math.PI / 180;
    
    // Harmonic frequencies from user's math
    const kx = 3;
    const ky = 2;

    const draw = () => {
      // Clear with fading effect
      ctx.fillStyle = 'rgba(9, 11, 17, 0.08)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const Rx = Math.min(width, height) * 0.28;
      const Ry = Math.min(width, height) * 0.28;

      frames += 0.5;
      const t = frames * rad;

      // Radius formulas from user's image
      const rx = Rx * Math.abs(Math.cos(t)) + 50;
      const ry = Ry * Math.abs(Math.sin(t)) + 50;

      // Coordinate computations from user's image
      const x = cx + rx * Math.sin(kx * t + Math.PI / 2);
      const y = cy + ry * Math.sin(ky * t + Math.PI / 2);

      const x1 = cx + rx * Math.sin(kx * t + Math.PI);
      const y1 = cy - ry * Math.sin(ky * t + Math.PI);

      const x2 = cx + rx * Math.sin(kx * t);
      const y2 = cy - ry * Math.sin(ky * t);

      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x1, y1, x2, y2);

      // Neon purple and blue color gradient matching the Study Vault theme
      const gradient = ctx.createLinearGradient(x, y, x2, y2);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.65)'); // Indigo
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.75)'); // Purple
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.65)'); // Pink

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Reset composite operation for next frame clear rect
      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// Interactive Custom Cursor tracking for mouse followers
const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 35, stiffness: 220, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  return (
    <motion.div
      style={{
        left: cursorX,
        top: cursorY,
      }}
      className="fixed w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-xl pointer-events-none z-0 hidden md:block"
    />
  );
};

// 3D Parallax Tilt Card Component for Butter-Smooth Mouse Interactions
const TiltCard: React.FC<{
  id: string;
  platform: Platform;
  onClick: () => void;
  index: number;
}> = ({ id, platform, onClick, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-60, 60], [8, -8]);
  const rotateY = useTransform(x, [-120, 120], [-8, 8]);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.1 * index,
        type: 'spring',
        stiffness: 110,
        damping: 16
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full group relative bg-white/50 backdrop-blur-xl border border-white/40 cursor-pointer shadow-[0_10px_35px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.08)] hover:bg-white/70 rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 flex items-center gap-4 sm:gap-6 transition-colors duration-500`}
    >
      {/* Decorative Glow Ring */}
      <div className={`absolute -inset-px rounded-[28px] sm:rounded-[32px] bg-gradient-to-r ${platform.theme} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700 -z-10`} />

      <CardBackground />

      <div className={`absolute inset-0 bg-gradient-to-r ${platform.theme} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 rounded-[28px] sm:rounded-[32px]`} />

      <div
        style={{ transform: 'translateZ(30px)' }}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-[18px] sm:rounded-[22px] border border-slate-100 bg-white flex-shrink-0 overflow-hidden relative z-10 shadow-sm group-hover:shadow-md transition-all duration-500"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${platform.theme} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />
        <img
          src={platform.logo}
          referrerPolicy="no-referrer"
          className={`w-full h-full ${platform.logoFit === 'contain' ? 'object-contain p-1.5' : 'object-cover'} rounded-[16px] sm:rounded-[20px] group-hover:scale-110 transition-transform duration-500 crisp-img`}
          alt={platform.name}
        />
      </div>

      <div style={{ transform: 'translateZ(20px)' }} className="text-left flex-grow z-10 py-1">
        <h2 className="text-[18px] sm:text-[22px] font-black text-slate-900 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
          {platform.name}
        </h2>
        <p className="text-[13px] sm:text-[15px] text-slate-400 group-hover:text-slate-500 mt-1 font-bold transition-colors duration-300">
          {platform.tagline}
        </p>
      </div>

      <div
        style={{ transform: 'translateZ(35px)' }}
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-50/50 border border-slate-100/80 flex items-center justify-center text-slate-400 group-hover:text-white transition-all duration-500 z-10 shadow-sm flex-shrink-0 relative overflow-hidden group-hover:border-transparent`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${platform.theme} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 sm:ml-0.5 relative z-10 group-hover:scale-110 group-hover:translate-x-0.5 transition-transform duration-300" />
      </div>
    </motion.button>
  );
};

const StoreView: React.FC<{ platform: Platform; onBack: () => void }> = ({ platform, onBack }) => {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"]);
  const imageScale = useTransform(scrollY, [0, 180], [1, 0.85]);
  const imageOpacity = useTransform(scrollY, [0, 180], [1, 0.4]);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: platform.name,
          text: platform.tagline,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Error sharing:", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "30%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "30%", transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
      transition={{ type: "spring", damping: 28, stiffness: 170, mass: 0.8 }}
      className="fixed inset-0 bg-slate-50/95 backdrop-blur-3xl z-50 overflow-y-auto text-slate-900 scroll-smooth"
    >
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[200%] sm:w-[800px] h-[400px] sm:h-[600px] bg-gradient-to-b ${platform.theme} opacity-15 blur-[120px] pointer-events-none rounded-full`} />

      {/* Floating Header */}
      <motion.header
        style={{ opacity: headerOpacity, backdropFilter: headerBlur }}
        className="fixed top-0 inset-x-0 z-40 bg-white/80 border-b border-slate-200/40 px-14 sm:px-16 h-14 sm:h-16 flex items-center justify-between pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <img src={platform.logo} className={`w-8 h-8 ${platform.logoFit === 'contain' ? 'object-contain p-0.5' : 'object-cover'} rounded-lg border border-slate-200/50 bg-white crisp-img`} alt={platform.name} />
          <div className="text-left">
            <h2 className="text-[14px] sm:text-[16px] font-black text-slate-900 leading-none">{platform.name}</h2>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">{platform.tagline}</p>
          </div>
        </div>
        {!platform.comingSoon && (
          <a
            href={platform.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className={`pointer-events-auto px-4.5 py-1.5 rounded-full text-white font-black text-[12px] shadow-md transition-all hover:scale-105 active:scale-95 ${platform.buttonColor}`}
          >
            GET
          </a>
        )}
      </motion.header>

      {/* Back and Share buttons */}
      <div className="fixed top-0 inset-x-0 z-50 px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between pointer-events-none">
        <button onClick={onBack} className="pointer-events-auto p-2 -ml-2 rounded-full bg-white/60 backdrop-blur-md hover:bg-white hover:shadow-md active:scale-95 transition-all text-slate-800 font-bold flex items-center gap-1 group border border-slate-200/40">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        </button>
        <button onClick={handleShare} className="pointer-events-auto p-2 rounded-full bg-white/60 backdrop-blur-md hover:bg-white hover:shadow-md active:scale-95 text-slate-800 transition-all border border-slate-200/40 group">
          <Share className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-5 pt-20 sm:pt-24 pb-24 relative z-10">
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-5 sm:gap-6 perspective-1000">
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className={`w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-[24px] bg-white p-2 relative shadow-xl border border-slate-100/50 z-20`}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-tr ${platform.theme} rounded-[24px] -z-10 opacity-20`}
            />
            <img
              src={platform.logo}
              referrerPolicy="no-referrer"
              className={`w-full h-full ${platform.logoFit === 'contain' ? 'object-contain p-1.5' : 'object-cover'} rounded-[16px] relative z-10 crisp-img`}
              alt={platform.name}
            />
          </motion.div>

          <div className="pt-2 text-center sm:text-left flex-1 flex flex-col items-center sm:items-start">
            <motion.h1
              className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 mb-1.5"
            >
              {platform.name}
            </motion.h1>
            <motion.p
              className="text-slate-400 font-bold text-[14px] sm:text-[15px] mb-3 leading-tight"
            >
              {platform.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3"
            >
              <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full ${platform.accent} ring-1 ring-black/5`}>#1 Education</span>
              <span className="text-[12px] text-slate-400 font-bold px-2">In-App Purchases</span>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
          className="flex items-center justify-between mt-8 sm:mt-10 py-3.5 border border-white/50 bg-white/40 backdrop-blur-xl rounded-3xl px-2 shadow-[0_8px_32px_rgba(0,0,0,0.02)]"
        >
          <div className="text-center flex-1 group">
            <div className="flex items-center justify-center gap-1 text-slate-900 font-black text-[18px] sm:text-[20px] group-hover:scale-105 transition-transform duration-300">
              {platform.stats.rating} <Star className="w-4 h-4 fill-amber-400 text-amber-400 -mt-0.5" />
            </div>
            <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">{platform.stats.reviews} Ratings</div>
          </div>
          <div className="w-px h-8 bg-slate-200/50"></div>
          <div className="text-center flex-1 group">
            <div className="text-slate-900 font-black text-[18px] sm:text-[20px] group-hover:scale-105 transition-transform duration-300">{platform.stats.age}</div>
            <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Age</div>
          </div>
          <div className="w-px h-8 bg-slate-200/50"></div>
          <div className="text-center flex-1 group">
            <div className="text-slate-900 font-black text-[18px] sm:text-[20px] group-hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-1">
              <Download className="w-4 h-4 text-slate-400 -mt-0.5" /> {platform.stats.downloads}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Downloads</div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
          className="mt-6 sm:mt-8"
        >
          {platform.comingSoon ? (
            <button disabled className="flex items-center justify-center w-full h-12 sm:h-14 bg-slate-100 text-slate-400 rounded-2xl font-black text-[14px] sm:text-[16px] cursor-not-allowed border border-slate-200/50 overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <span className="relative z-10 flex items-center gap-2"><Zap className="w-5 h-5" /> Coming Soon</span>
            </button>
          ) : (
            <motion.a
              href={platform.websiteUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center justify-center w-full h-12 sm:h-14 rounded-2xl font-black text-[14px] sm:text-[16px] text-white transition-all group overflow-hidden shadow-xl hover:shadow-2xl ${platform.buttonColor}`}
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              />
              <span className="relative z-10 flex items-center gap-2">
                Download <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.a>
          )}
        </motion.div>

        {/* Interactive Screenshots Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 sm:mt-10"
        >
          <div className="flex items-center justify-between px-1 mb-3">
            <h2 className="text-[18px] sm:text-[20px] font-black tracking-tight text-slate-900">Preview</h2>
          </div>
          <div className="flex gap-4 sm:gap-5 overflow-x-auto -mx-4 sm:-mx-5 px-4 sm:px-5 snap-x snap-mandatory pb-4 pt-1 scroll-smooth">
            {platform.screenshots.map((src, i) => {
              const isLandscape = platform.screenshotLayout === 'landscape';
              return (
                <motion.div
                  key={i}
                  initial={{ x: 30, opacity: 0, scale: 0.95 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (i * 0.08), type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => setActiveScreenshot(src)}
                  className={`flex-shrink-0 ${isLandscape ? 'w-[280px] sm:w-[380px] aspect-[16/10]' : 'w-[180px] sm:w-[220px] aspect-[9/16]'} snap-center rounded-[20px] sm:rounded-[24px] overflow-hidden border-[3px] border-white bg-slate-100 shadow-md hover:shadow-xl transition-shadow duration-300 relative group cursor-zoom-in`}
                >
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                  <img src={src} className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500" loading="lazy" alt="Screenshot" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* About Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", bounce: 0.4 }}
          className="mt-6 sm:mt-8 bg-white/50 border border-white/50 backdrop-blur-md shadow-lg rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${platform.theme} opacity-10 rounded-full blur-2xl -mr-10 -mt-10`} />
          <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${platform.theme} opacity-5 rounded-full blur-2xl -ml-10 -mb-10`} />

          <h2 className="text-[18px] sm:text-[20px] font-black tracking-tight text-slate-900 mb-3 flex items-center gap-2 relative z-10">
            <Shield className="w-5 h-5 text-slate-900" /> About this App
          </h2>
          <p className="text-slate-600 font-medium text-[14px] sm:text-[15px] leading-[1.65] relative z-10">{platform.description}</p>

          <div className="flex flex-wrap gap-2 mt-6 relative z-10">
            {platform.tags.map(tag => (
              <motion.span
                whileHover={{ scale: 1.05, y: -1 }}
                key={tag}
                className={`px-3.5 py-1.5 ${platform.accent} rounded-xl text-[11px] sm:text-[12px] font-black tracking-wide cursor-default border border-slate-100/50 shadow-sm`}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Dynamic Full-Screen Image Lightbox with zoom animations */}
      <AnimatePresence>
        {activeScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveScreenshot(null)}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-full max-h-[85vh] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border-2 border-white/10 bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeScreenshot}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                alt="Screenshot Preview"
              />
              <button
                onClick={() => setActiveScreenshot(null)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 text-white rounded-full p-2.5 backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CardBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px] sm:rounded-[32px]">
    <div className="absolute w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
  </div>
);

export default function App() {
  const [platforms, setPlatforms] = useState<Record<string, Platform>>(platformDataFallback);
  const [selectedPlatformId, setSelectedPlatformId] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Buttery-smooth custom splash screen logic with progress load values
  useEffect(() => {
    const start = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic Ease Out
      
      setLoadProgress(Math.floor(easedProgress * 100));

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => setShowSplash(false), 250);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Sync state with dynamic API backend
  useEffect(() => {
    fetch('/api/platforms')
      .then((res) => {
        if (!res.ok) throw new Error('API fetch failed');
        return res.json();
      })
      .then((data) => {
        setPlatforms(data);
      })
      .catch((err) => {
        console.warn('API connection offline, utilizing offline database fallback:', err);
      });
  }, []);

  const selectedPlatform = selectedPlatformId ? platforms[selectedPlatformId] : null;

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans selection:bg-indigo-500/20 selection:text-indigo-900 relative overflow-x-hidden scroll-smooth">
      <CustomCursor />

      {/* Decorative Interactive Background Circles */}
      <motion.div style={{ y }} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-15%] left-[-15%] w-[70%] h-[70%] bg-blue-300/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-15%] right-[-15%] w-[70%] h-[70%] bg-purple-300/10 rounded-full blur-[100px]"
        />
      </motion.div>

      {/* Butter-Smooth Splash Launch Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: "blur(25px)"
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090b11] overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#090b11] to-[#090b11]"></div>
            <CanvasAnimation />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.3, opacity: 0, rotate: -90 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.6, type: "spring", bounce: 0.5 }}
                className="relative perspective-1000"
              >
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.08, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 sm:-inset-8 rounded-[3rem] border border-dashed border-indigo-500/20 border-t-indigo-500/80 z-0"
                />
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2.2rem] sm:rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(99,102,241,0.15)] border-4 border-white p-2 relative overflow-hidden z-10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-transparent"></div>
                  <img
                    src="https://www.image2url.com/r2/default/images/1784686690409-74b0f2f9-033b-437f-9893-cba344e8111a.jpg"
                    className="w-full h-full object-cover rounded-[1.8rem] sm:rounded-[2.1rem] crisp-img"
                    alt="Study Vault Logo"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
                className="mt-10 flex flex-col items-center"
              >
                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-indigo-300 text-center px-4 uppercase">
                  The Study Vault
                </h1>

                {/* Progress bar loader */}
                <div className="w-40 sm:w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden relative">
                  <motion.div
                    style={{ width: `${loadProgress}%` }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-indigo-400 font-black">
                  Launching {loadProgress}%
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen view transitions */}
      <AnimatePresence mode="wait">
        {selectedPlatform && (
          <StoreView
            key="store-view"
            platform={selectedPlatform}
            onBack={() => setSelectedPlatformId(null)}
          />
        )}
      </AnimatePresence>

      <main className={`w-full max-w-xl mx-auto pt-16 sm:pt-20 px-4 sm:px-6 relative z-10 pb-24 transition-all duration-[600ms] ${selectedPlatformId ? 'opacity-0 scale-95 pointer-events-none blur-md' : 'opacity-100 scale-100 blur-0'}`}>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, type: "spring", bounce: 0.4 }}
          className="mb-10 sm:mb-12 text-center flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.06, rotate: 6 }}
            whileTap={{ scale: 0.94 }}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-[1.2rem] sm:rounded-[1.4rem] shadow-lg border-2 border-white bg-white overflow-hidden mb-4 cursor-pointer z-10 relative"
          >
            <img src="https://www.image2url.com/r2/default/images/1784686690409-74b0f2f9-033b-437f-9893-cba344e8111a.jpg" className="w-full h-full object-cover" alt="Study Vault Logo" referrerPolicy="no-referrer" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 mb-1.5 uppercase bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-indigo-950">
            The Study Vault
          </h1>
          <p className="text-slate-400 font-bold text-[14px] sm:text-[15px] tracking-wide">Select your learning environment</p>
        </motion.div>

        {/* Dynamic 3D Platform Selector Cards */}
        <div className="space-y-4.5 sm:space-y-5">
          {(Object.entries(platforms) as [string, Platform][]).map(([id, platform], index) => (
            <TiltCard
              key={id}
              id={id}
              platform={platform}
              index={index}
              onClick={() => setSelectedPlatformId(id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
