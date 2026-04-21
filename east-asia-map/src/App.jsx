import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Map, Anchor, Scale, Globe, FileText, CheckCircle2, XCircle, Info, ChevronRight, ChevronLeft, Flag, Swords, Landmark, BookOpen, Compass, Crosshair, Home, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

// Strategy Metadata
const STRATEGY_META = {
  balance: { id: 'balance', name: 'Balance of Power', icon: Scale, color: 'text-blue-400', bg: 'bg-blue-400/20', border: 'border-blue-400/50' },
  bandwagoning: { id: 'bandwagoning', name: 'Bandwagoning', icon: ChevronRight, color: 'text-amber-400', bg: 'bg-amber-400/20', border: 'border-amber-400/50' },
  intlLaw: { id: 'intlLaw', name: 'Intl. Law/Orgs', icon: Landmark, color: 'text-emerald-400', bg: 'bg-emerald-400/20', border: 'border-emerald-400/50' },
  neutrality: { id: 'neutrality', name: 'Neutrality', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-400/20', border: 'border-purple-400/50' }
};

// In-depth Nation Story Data
const NATIONS_DATA = {
  korea: {
    id: 'korea',
    name: 'Korea',
    period: 'Gojoseon ~ Present',
    status: 'Survived (Sovereignty Maintained)',
    isAlive: true,
    coordinates: { top: '35%', left: '72%' },
    mapLabel: 'LAT 37°N / LON 127°E',
    summary: 'A bridge between the continent and the ocean. A strategic buffer zone that preserved its sovereignty through dynamic alliances and bandwagoning despite constant invasions.',
    stats: { balance: 80, bandwagoning: 90, intlLaw: 60, neutrality: 30 },
    story: [
      {
        era: 'Pre-modern (Tributary System)',
        title: 'Sadae (Serving the Great) and Stability',
        content: 'Voluntarily integrated into the tributary system of absolute regional hegemons (Tang, Ming, Qing) to guarantee security. Maintained peace through a textbook bandwagoning strategy by aligning with the strongest power.',
        activeStrategies: ['bandwagoning']
      },
      {
        era: 'Late 19th Century',
        title: 'Collapsed Balance & Failed Neutrality',
        content: 'The Korean Peninsula became a battleground for imperial powers like Qing, Russia, and Japan. The Joseon dynasty sought protection under international law and declared wartime neutrality. However, without the hard power to back it up, this neutrality was ignored, leading to colonization.',
        activeStrategies: ['balance', 'intlLaw', 'neutrality']
      },
      {
        era: 'Cold War Era',
        title: 'Division and New Bandwagoning',
        content: 'Following liberation and the Korean War, South Korea signed a Mutual Defense Treaty with the US. This served as a vital anchor for survival, firmly bandwagoning with the maritime power to block the expansion of continental forces (China/Russia).',
        activeStrategies: ['bandwagoning']
      },
      {
        era: 'Modern (21st Century)',
        title: 'Multi-layered Balance',
        content: 'Currently navigating a complex environment—relying heavily on the US for security and China for its economy. It actively participates in international organizations like the UN and G20, expanding its diplomatic space as a middle power to overcome geopolitical limitations.',
        activeStrategies: ['balance', 'intlLaw']
      }
    ]
  },
  taiwan: {
    id: 'taiwan',
    name: 'Taiwan',
    period: '17th Century ~ Present',
    status: 'Survived (Strategic Autonomy)',
    isAlive: true,
    coordinates: { top: '65%', left: '68%' },
    mapLabel: 'LAT 23°N / LON 120°E',
    summary: 'The crucial chokepoint of the First Island Chain. An unsinkable aircraft carrier withstanding continental pressure under the protection of maritime hegemons.',
    stats: { balance: 85, bandwagoning: 75, intlLaw: 20, neutrality: 10 },
    story: [
      {
        era: 'Early ~ Japanese Rule',
        title: 'From Periphery to Strategic Hub',
        content: 'Historically ruled by the Dutch, the Kingdom of Tungning, and the Qing Dynasty. Following the First Sino-Japanese War, it was ceded to Japan, experiencing involuntary bandwagoning as a bridgehead for imperial expansion.',
        activeStrategies: ['bandwagoning']
      },
      {
        era: 'Cold War Era (1949~)',
        title: 'Breakwater of the Free World',
        content: 'After losing the Chinese Civil War, the Nationalist government relocated to Taiwan. With massive US support, it bandwagoned with the liberal bloc, acting as a definitive counterweight to the military threat of the PRC.',
        activeStrategies: ['bandwagoning', 'balance']
      },
      {
        era: '1970s Diplomatic Crisis',
        title: 'Expulsion from the Global Stage',
        content: 'Expelled from the UN in 1971 alongside US-China normalization, Taiwan lost formal protection under international law. It plunged into extreme isolation as official diplomatic channels were severed due to the "One China" principle.',
        activeStrategies: []
      },
      {
        era: 'Modern (Pragmatic Diplomacy)',
        title: 'Silicon Shield & Informal Alliances',
        content: 'Denied formal participation in international bodies, Taiwan proved its indispensable value as the core of the global semiconductor supply chain (TSMC). It survives by constructing informal balance-of-power networks with value-sharing nations like the US and Japan.',
        activeStrategies: ['balance']
      }
    ]
  },
  westernXia: {
    id: 'westernXia',
    name: 'Western Xia',
    period: '1038 ~ 1227',
    status: 'Extinguished (Destroyed by Mongols)',
    isAlive: false,
    coordinates: { top: '38%', left: '35%' },
    mapLabel: 'LAT 38°N / LON 106°E',
    summary: 'Executed exquisite tightrope diplomacy in a multipolar system but was entirely wiped out due to a fatal strategic misjudgment against an overwhelming hegemon.',
    stats: { balance: 95, bandwagoning: 60, intlLaw: 50, neutrality: 40 },
    story: [
      {
        era: 'Early Foundation (11th C.)',
        title: 'Ruler of the Silk Road',
        content: 'Founded by the Tangut people, Western Xia was wedged between the massive Song and Liao empires. It initiated a delicate diplomatic dance, leveraging economic wealth generated by controlling the East-West trade routes.',
        activeStrategies: ['balance']
      },
      {
        era: 'Golden Age (11th-12th C.)',
        title: 'The Art of Yiyizhiyi',
        content: 'Mastered the strategy of "using barbarians to control barbarians" between Song, Liao, and later Jin. By frequently shifting allegiances and occasionally acting as a vassal (bandwagoning) for trade concessions, it thrived for two centuries.',
        activeStrategies: ['balance', 'bandwagoning', 'intlLaw']
      },
      {
        era: 'Rise of Crisis (Early 13th C.)',
        title: 'The Mongol Juggernaut',
        content: 'The regional multipolar balance collapsed with the rapid rise of Genghis Khan\'s Mongol Empire. Facing overwhelming military might, Western Xia initially submitted and pledged subordination to the Mongols.',
        activeStrategies: ['bandwagoning']
      },
      {
        era: 'Downfall (1227)',
        title: 'Fatal Miscalculation',
        content: 'As the Mongols expanded, Western Xia engaged in opportunistic neutrality and erratic betrayals—refusing to provide auxiliary troops and secretly conspiring with Jin. This enraged Genghis Khan, triggering a catastrophic retaliation that erased the nation from history.',
        activeStrategies: ['neutrality']
      }
    ]
  },
  ryukyu: {
    id: 'ryukyu',
    name: 'Ryukyu Kingdom',
    period: '1429 ~ 1879',
    status: 'Extinguished (Annexed by Japan)',
    isAlive: false,
    coordinates: { top: '55%', left: '80%' },
    mapLabel: 'LAT 26°N / LON 127°E',
    summary: 'Sought commercial peace through disarmament and dual subordination, but collapsed due to a complete lack of hard power in the era of imperialism.',
    stats: { balance: 20, bandwagoning: 90, intlLaw: 40, neutrality: 80 },
    story: [
      {
        era: 'Golden Age (15th-16th C.)',
        title: 'Bridge of Nations',
        content: 'Capitalizing on Ming China\'s maritime prohibition policies, Ryukyu flourished as the premier entrepôt connecting Southeast Asia, China, Japan, and Joseon. It secured its standing entirely through commerce and diplomacy rather than force.',
        activeStrategies: ['neutrality']
      },
      {
        era: 'Dual Subordination (1609~)',
        title: 'Sorrow of Two Masters',
        content: 'Following an invasion by Japan\'s Satsuma Domain, Ryukyu was forced into a dual-subordination system. It outwardly maintained its status as a tributary to Qing China while covertly paying heavy taxes to Satsuma—a desperate double-bandwagoning survival tactic.',
        activeStrategies: ['bandwagoning']
      },
      {
        era: 'Mid-19th Century',
        title: 'Encounter with the West',
        content: 'As Western powers advanced into Asia, Ryukyu hastily signed treaties with the US, France, and the Netherlands. This was an agonizing attempt to secure recognition as an independent sovereign state within the Western framework of international law.',
        activeStrategies: ['intlLaw', 'neutrality']
      },
      {
        era: 'Downfall (1879)',
        title: 'The End of Unarmed Peace',
        content: 'The modernized Meiji Japanese government executed the "Ryukyu Disposition," forcibly annexing the kingdom. Ryukyu\'s unarmed neutrality and reliance on international legal justifications proved utterly useless against the brutal mechanics of imperialist power.',
        activeStrategies: ['neutrality']
      }
    ]
  }
};

export default function App() {
  const [selectedNation, setSelectedNation] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Map Zoom & Pan State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset story step on nation change
  useEffect(() => {
    setCurrentStep(0);
  }, [selectedNation]);

  // Map Controls
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const handleResetMap = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // 마우스 휠 줌(Zoom) 기능
  const handleWheel = (e) => {
    const zoomSensitivity = 0.002; // 줌 민감도 조절
    setScale(prev => {
      const newScale = prev - e.deltaY * zoomSensitivity;
      return Math.min(Math.max(newScale, 1), 4); // 최소 1배, 최대 4배 제한
    });
  };

  const nation = selectedNation ? NATIONS_DATA[selectedNation] : null;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-amber-500/30">
      
      {/* ================= LEFT PANEL: TACTICAL FIELD MAP ================= */}
      <div className="relative w-full md:w-[45%] lg:w-[45%] h-[45vh] md:h-full bg-[#0a0f1c] border-r border-slate-800 shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Map Header Overlay */}
        <div className="absolute top-0 left-0 w-full p-5 bg-gradient-to-b from-slate-900/90 to-transparent z-30 pointer-events-none">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <Crosshair className="w-5 h-5 animate-pulse" />
            <span className="font-mono font-bold tracking-[0.2em] text-xs">GEO-STRATEGIC THEATER</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-md">Small State Survival Mechanisms</h1>
        </div>

        {/* Tactical Map Container */}
        <div 
          className="relative flex-grow w-full h-full overflow-hidden bg-[#0a0f1c]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Zoomable & Pannable Wrapper */}
          <div 
            className="absolute inset-0 w-full h-full transform-gpu"
            style={{ 
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            {/* Base Grid & Radar Lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <div className="w-[150%] h-[150%] rounded-full border border-cyan-500 border-dashed animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-[100%] h-[100%] rounded-full border border-cyan-500 border-dashed animate-[spin_40s_linear_infinite_reverse]" />
            </div>

            {/* Detailed SVG Map Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
               {/* Continental Landmass (China/Russia) */}
               <path d="M-10,-10 L60,-10 L68,15 L70,25 L65,30 L60,40 L62,55 L58,70 L50,85 L30,110 L-10,110 Z" fill="#111827" stroke="#334155" strokeWidth="0.3" />
               
               {/* Korean Peninsula */}
               <path d="M65,30 L72,32 L75,38 L72,42 L68,40 L65,35 Z" fill="#111827" stroke="#334155" strokeWidth="0.3" />
               
               {/* Japan Archipelago */}
               <path d="M85,25 L92,30 L86,45 L80,48 L76,45 L82,38 Z" fill="#111827" stroke="#334155" strokeWidth="0.3" />
               <path d="M88,15 L95,20 L92,25 L85,20 Z" fill="#111827" stroke="#334155" strokeWidth="0.3" />

               {/* Taiwan */}
               <polygon points="67,64 69,65 68,67 66,66" fill="#111827" stroke="#334155" strokeWidth="0.3" />
               
               {/* Hainan */}
               <polygon points="52,78 54,79 53,81 50,80" fill="#111827" stroke="#334155" strokeWidth="0.3" />

               {/* First Island Chain (Strategic Defensive Line) */}
               <path d="M85,45 Q85,55 80,55 Q75,60 68,65 Q60,72 50,85" fill="none" stroke="#ef4444" strokeWidth="0.2" strokeDasharray="1 1.5" className="opacity-60" />
               
               {/* Connection Lines (Trade/Tension) */}
               <path d="M35,38 L72,35 M72,35 L68,65 M68,65 L80,55 M80,55 L72,35" fill="none" stroke="#64748b" strokeWidth="0.1" strokeDasharray="0.5 1" className="opacity-50" />
            </svg>

            {/* Compass / Scale Indicator */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-col items-center opacity-40 pointer-events-none">
              <Compass className="w-10 h-10 text-slate-400 mb-1" />
              <div className="w-16 h-[1px] bg-slate-500 mt-2 relative">
                <div className="absolute top-[-4px] left-0 h-2 w-[1px] bg-slate-500"></div>
                <div className="absolute top-[-4px] right-0 h-2 w-[1px] bg-slate-500"></div>
              </div>
              <span className="text-[9px] font-mono mt-1 text-slate-400 tracking-widest">500 NM</span>
            </div>

            {/* Nation Nodes */}
            {Object.values(NATIONS_DATA).map((n) => (
              <button
                key={n.id}
                onClick={(e) => {
                  e.stopPropagation(); // 드래그 중 클릭 오작동 방지
                  setSelectedNation(n.id);
                }}
                className="absolute group z-30 focus:outline-none"
                style={{ 
                  top: n.coordinates.top, 
                  left: n.coordinates.left,
                  transform: `translate(-50%, -50%) scale(${1 / scale})` // 지도가 확대될 때 아이콘 크기 유지
                }}
              >
                {/* Pulse Effect */}
                <div className={`absolute -inset-5 rounded-full transition-all duration-700 
                  ${selectedNation === n.id ? 'animate-ping opacity-30 bg-amber-500' : 
                    n.isAlive ? 'opacity-0 group-hover:opacity-20 group-hover:animate-ping bg-cyan-400' : 'opacity-0 group-hover:opacity-20 group-hover:animate-ping bg-red-500'}`} />
                
                {/* Node Core */}
                <div className={`relative w-4 h-4 md:w-5 md:h-5 rounded-sm flex items-center justify-center transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] rotate-45
                  ${selectedNation === n.id 
                    ? 'scale-125 bg-amber-400 z-40 shadow-amber-500/50' 
                    : n.isAlive 
                      ? 'bg-cyan-500/80 hover:bg-cyan-400' 
                      : 'bg-red-500/80 hover:bg-red-400'}`}
                >
                  <div className="w-2 h-2 bg-slate-900 rounded-sm" />
                </div>

                {/* Advanced UI Label */}
                <div className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-300
                  ${selectedNation === n.id ? 'opacity-100 transform translate-y-0 z-50' : 'opacity-75 transform -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                  
                  {/* Connecting Line */}
                  <div className={`h-3 w-[1px] mb-1 ${selectedNation === n.id ? 'bg-amber-400' : 'bg-slate-400'}`} />
                  
                  <div className={`whitespace-nowrap px-3 py-1.5 rounded bg-slate-900/95 border backdrop-blur-md shadow-xl flex flex-col items-center gap-1
                    ${selectedNation === n.id ? 'border-amber-500/50' : 'border-slate-700'}`}>
                    <span className={`text-xs font-bold ${selectedNation === n.id ? 'text-amber-400' : 'text-slate-200'}`}>
                      {n.name.toUpperCase()}
                    </span>
                    <span className={`text-[9px] font-mono tracking-wider ${selectedNation === n.id ? 'text-amber-400/70' : 'text-slate-500'}`}>
                      {n.mapLabel}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Zoom Controls Overlay */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-40">
            <button onClick={handleZoomIn} className="p-2.5 bg-slate-900/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 backdrop-blur-md shadow-lg transition-colors">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={handleResetMap} className="p-2.5 bg-slate-900/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 backdrop-blur-md shadow-lg transition-colors" title="Reset Map">
              <Maximize className="w-4 h-4" />
            </button>
            <button onClick={handleZoomOut} className="p-2.5 bg-slate-900/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 backdrop-blur-md shadow-lg transition-colors">
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* ================= RIGHT PANEL: STORY & DATA ================= */}
      <div className="w-full md:w-[55%] lg:w-[55%] h-[55vh] md:h-full bg-slate-900 overflow-y-auto custom-scrollbar relative">
        
        {nation ? (
          <div className="min-h-full flex flex-col p-6 md:p-10 animate-fade-in relative z-10">
            
            {/* Header / Summary */}
            <div className="mb-8 border-b border-slate-800 pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border
                  ${nation.isAlive ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
                  {nation.isAlive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {nation.status}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                  <Map className="w-3.5 h-3.5 text-slate-500" /> {nation.period}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 drop-shadow-lg">
                {nation.name}
              </h2>
              
              <p className="text-lg text-slate-300 leading-relaxed border-l-[3px] border-amber-500 pl-5 bg-gradient-to-r from-slate-800/40 to-transparent py-3">
                {nation.summary}
              </p>
            </div>

            {/* Strategic Dependency Radar (Progress Bars) - FIXED ALIGNMENT */}
            <div className="mb-10 w-full">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Historical Strategy Dependency
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(STRATEGY_META).map(([key, meta]) => (
                  <div key={key} className="flex flex-col justify-between p-3.5 rounded-lg bg-slate-800/30 border border-slate-800 min-h-[85px]">
                    
                    {/* Header Area: Icon, Title & Percentage */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-start gap-1.5 flex-1 min-w-0">
                        <meta.icon className={`w-3.5 h-3.5 shrink-0 mt-[2px] ${meta.color}`} />
                        <span className="text-xs font-bold text-slate-300 leading-snug break-words">
                          {meta.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-slate-500 shrink-0">{nation.stats[key]}%</span>
                    </div>

                    {/* Progress Bar Area */}
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/50 mt-auto">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${meta.bg.replace('/20', '')}`}
                        style={{ width: `${nation.stats[key]}%` }}
                      />
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Timeline / Story Carousel */}
            <div className="flex-grow flex flex-col bg-slate-800/40 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden relative min-h-[380px]">
              
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 h-1 bg-slate-900 w-full z-10">
                <div 
                  className="h-full bg-amber-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                  style={{ width: `${((currentStep + 1) / nation.story.length) * 100}%` }} 
                />
              </div>

              {/* Story Content */}
              <div className="p-8 md:p-10 flex-grow flex flex-col justify-start relative">
                <div className="text-amber-500 font-bold tracking-[0.2em] text-[10px] mb-3 uppercase flex items-center gap-2">
                  <Flag className="w-3.5 h-3.5" /> Phase {currentStep + 1} of {nation.story.length}
                </div>
                
                <span className="text-xs text-slate-400 mb-2 font-mono uppercase tracking-wider block">{nation.story[currentStep].era}</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-5 leading-tight">
                  {nation.story[currentStep].title}
                </h3>
                
                <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8 flex-grow font-light">
                  {nation.story[currentStep].content}
                </p>

                {/* Active Strategies Box */}
                <div className="mt-auto pt-6 border-t border-slate-700/50 w-full">
                  <div className="text-[10px] text-slate-500 mb-3 font-bold uppercase tracking-widest">Active Mechanisms</div>
                  <div className="flex flex-wrap gap-2">
                    {nation.story[currentStep].activeStrategies.length > 0 ? (
                      nation.story[currentStep].activeStrategies.map(strategyId => {
                        const meta = STRATEGY_META[strategyId];
                        return (
                          <div key={strategyId} className={`flex items-center gap-1.5 px-3 py-1.5 rounded border ${meta.bg} ${meta.border} ${meta.color} animate-fade-in shadow-sm`}>
                            <meta.icon className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold uppercase tracking-wide">{meta.name}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="px-3 py-1.5 rounded border border-red-900/50 bg-red-950/30 text-red-400 text-[11px] font-bold uppercase tracking-wide">
                        Diplomatic Network Collapse
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Timeline Controls */}
              <div className="flex items-center justify-between p-5 bg-slate-900 border-t border-slate-800">
                <button 
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:hover:bg-transparent transition-all text-xs font-bold uppercase tracking-wider"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                
                <div className="flex gap-2">
                  {nation.story.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'bg-amber-500 w-6 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-slate-700 w-1.5'}`} />
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentStep(prev => Math.min(nation.story.length - 1, prev + 1))}
                  disabled={currentStep === nation.story.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded disabled:opacity-20 disabled:hover:bg-slate-800 transition-all text-xs font-bold uppercase tracking-wider border border-slate-700"
                >
                  Next Era <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Return to Framework (Home) Button */}
            <div className="mt-8 mb-4 flex justify-center w-full">
              <button
                onClick={() => setSelectedNation(null)}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/50 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 transition-all duration-300 border border-slate-700 hover:border-amber-500/40 text-[11px] font-bold uppercase tracking-widest shadow-lg"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Return to Framework
              </button>
            </div>

          </div>
        ) : (
          
          /* ================= LANDING STATE ================= */
          <div className="p-8 md:p-14 h-full flex flex-col justify-center animate-fade-in relative overflow-hidden">
            <div className="absolute top-10 right-10 p-12 opacity-5 pointer-events-none">
              <Globe className="w-96 h-96" />
            </div>
            
            <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-500/10 rounded-xl mb-6 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
              <BookOpen className="w-6 h-6 text-amber-500" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Theoretical <br/><span className="text-slate-500 font-light">Framework</span></h2>
            <p className="text-slate-400 leading-relaxed mb-12 text-base md:text-lg max-w-2xl font-light">
              Explore the four core strategic mechanisms small states employ to survive amidst great power competition in geopolitical fault lines.
              <strong className="text-amber-400 font-normal block mt-2">Select a nation on the tactical map to initialize the historical analysis.</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
              {Object.values(STRATEGY_META).map((meta) => (
                <div key={meta.id} className={`p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group shadow-lg`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-10 h-10 rounded-lg ${meta.bg} flex items-center justify-center border ${meta.border} group-hover:scale-110 transition-transform`}>
                      <meta.icon className={`w-5 h-5 ${meta.color}`} />
                    </div>
                    <h3 className={`text-lg font-bold tracking-wide uppercase ${meta.color}`}>{meta.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed font-light pl-14">
                    {meta.id === 'balance' && "Exploiting conflicts and rivalries between great powers to disperse influence and secure autonomy."}
                    {meta.id === 'bandwagoning' && "Submitting to the strongest hegemon, accepting subordination in exchange for physical survival."}
                    {meta.id === 'intlLaw' && "Overcoming physical limitations by leveraging the principle of sovereign equality and treaty systems."}
                    {meta.id === 'neutrality' && "Attempting to remain aloof from great power conflicts; effective only when backed by force or hegemon consent."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}} />
    </div>
  );
}