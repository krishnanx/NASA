import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Home, Maximize2, RotateCw, Info, Upload } from 'lucide-react';
import { useSelector } from 'react-redux';
import { setEspNo } from './Store/espSlice';

const DeepZoomViewer = () => {
  const viewerRef = useRef(null);
  const osdRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Initializing viewer...');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showInfo, setShowInfo] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [customDzi, setCustomDzi] = useState('');
  const [imageInfo, setImageInfo] = useState(null);
  const [tileLoadCount, setTileLoadCount] = useState(0);
  const [imageList] = useState([
    { name: 'Test Output Image', url: `./dzimages/${espNo}test_output.dzi', size: 'Default' `},
  ]);
  const [selectedImage, setSelectedImage] = useState(0);
   

  const espNo = useSelector((state) => state.espNo)

  useEffect(() => {
    const initViewer = async () => {
      const OpenSeadragon = (await import('openseadragon')).default;

      if (viewerRef.current && !osdRef.current) {
        setIsLoading(true);
        setLoadingProgress(10);
        setLoadingMessage('Initializing Deep Zoom viewer...');
        setTileLoadCount(0);

        osdRef.current = OpenSeadragon({
          element: viewerRef.current,
          //tileSources: customDzi || imageList[selectedImage].url,
          tileSources:  `/test_output/${espNo}/test_output.dzi`,
          
          prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/',
          animationTime: 0.5,
          springStiffness: 10,
          visibilityRatio: 1.0,
          constrainDuringPan: true,
          
          zoomPerClick: 1.4,
          zoomPerScroll: 1.2,
          gestureSettingsMouse: {
            scrollToZoom: true,
            clickToZoom: true,
            dblClickToZoom: false,
            pinchToZoom: true,
            flickEnabled: true,
            flickMinSpeed: 120,
            flickMomentum: 0.25
          },
          
          showNavigationControl: false,
          showZoomControl: false,
          showHomeControl: false,
          showFullPageControl: false,
          showRotationControl: false,
          
          immediateRender: true,
          blendTime: 0.1,
          alwaysBlend: false,
          autoHideControls: false,
          
          placeholderFillStyle: '#1a1a2e',
          maxZoomPixelRatio: 2,
          minZoomLevel: 0.8,
          maxZoomLevel: 10,
          
          imageLoaderLimit: 8,
          timeout: 300000,
          preload: true,
        });

        let tilesLoaded = 0;
let totalTiles = 0;

osdRef.current.addHandler('open', () => {
    const tiledImage = osdRef.current.world.getItemAt(0);
    if (!tiledImage) return;

    const levels = tiledImage.source.maxLevel + 1;
    totalTiles = 0;
    for (let i = 0; i < levels; i++) {
        const levelWidth = Math.ceil(tiledImage.source.dimensions.x / Math.pow(2, levels - i - 1) / tiledImage.source.tileSize);
        const levelHeight = Math.ceil(tiledImage.source.dimensions.y / Math.pow(2, levels - i - 1) / tiledImage.source.tileSize);
        totalTiles += levelWidth * levelHeight;
    }

    setImageInfo({
        width: tiledImage.source.dimensions.x,
        height: tiledImage.source.dimensions.y,
        tileSize: tiledImage.source.tileSize,
        maxLevel: tiledImage.source.maxLevel,
    });

    setLoadingProgress(5); // small initial value
});

osdRef.current.addHandler('tile-loaded', () => {
    tilesLoaded++;
    setTileLoadCount(tilesLoaded);

    if (totalTiles > 0) {
        const progress = 5 + Math.min((tilesLoaded / totalTiles) * 95, 95);
        setLoadingProgress(Math.round(progress));
    }
});

osdRef.current.addHandler('fully-loaded-change', (event) => {
    if (event.fullyLoaded) {
        setLoadingProgress(100);
        setLoadingMessage('Complete!');
        setTimeout(() => setIsLoading(false), 500);
    }
});


        osdRef.current.addHandler('zoom', (event) => {
          setZoomLevel(event.zoom.toFixed(2));
        });

        osdRef.current.addHandler('canvas-click', () => {
          setShowInfo(false);
        });

        osdRef.current.addHandler('open-failed', (event) => {
          setLoadingMessage('Failed to load image. Please check the URL.');
          setIsLoading(false);
        });
      }
    };

    initViewer();

    return () => {
      if (osdRef.current) {
        osdRef.current.destroy();
        osdRef.current = null;
      }
    };
  }, [customDzi, selectedImage]);

  const handleZoomIn = () => {
    if (osdRef.current) {
      const currentZoom = osdRef.current.viewport.getZoom();
      osdRef.current.viewport.zoomTo(currentZoom * 1.4);
    }
  };

  const handleZoomOut = () => {
    if (osdRef.current) {
      const currentZoom = osdRef.current.viewport.getZoom();
      osdRef.current.viewport.zoomTo(currentZoom / 1.4);
    }
  };

  const handleHome = () => {
    if (osdRef.current) {
      osdRef.current.viewport.goHome();
    }
  };

  const handleFullScreen = () => {
    if (osdRef.current) {
      osdRef.current.setFullScreen(!osdRef.current.isFullPage());
    }
  };

  const handleRotate = () => {
    if (osdRef.current) {
      const newRotation = (rotation + 90) % 360;
      setRotation(newRotation);
      osdRef.current.viewport.setRotation(newRotation);
    }
  };

  const loadCustomDzi = () => {
    if (customDzi && osdRef.current) {
      setIsLoading(true);
      osdRef.current.open(`devarc/${espNo}/image.dzi`);
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>
              <Maximize2 size={24} color="white" />
            </div>
            <div>
              <h1 style={styles.title}>Deep Zoom Viewer</h1>
              <p style={styles.subtitle}>Powered by OpenSeadragon</p>
            </div>
          </div>
          
          <div style={styles.headerRight}>
            <select
              value={selectedImage}
              onChange={(e) => {
                setSelectedImage(Number(e.target.value));
                setCustomDzi('');
              }}
              style={styles.select}
            >
              {imageList.map((img, idx) => (
                <option key={idx} value={idx}>
                  {img.name} {img.size && `(${img.size})`}
                </option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Or enter custom DZI URL..."
              value={customDzi}
              onChange={(e) => setCustomDzi(e.target.value)}
              style={styles.input}
            />
            <button onClick={loadCustomDzi} style={styles.loadButton}>
              <Upload size={16} />
              <span style={{ marginLeft: '8px' }}>Load</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Viewer Area */}
      <div style={styles.mainArea}>
        {/* Loading State */}
        {isLoading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingContent}>
              {/* Animated Logo */}
              <div style={styles.loadingLogoContainer}>
                <div style={styles.loadingLogoOuter} className="animate-pulse">
                  <div style={styles.loadingLogoInner}>
                    <Maximize2 size={48} color="#c084fc" className="animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={styles.progressContainer}>
                <div style={styles.progressBarBg}>
                  <div style={{...styles.progressBar, width: `${loadingProgress}%`}}>
                    <div style={styles.progressShimmer}></div>
                  </div>
                </div>
                <div style={styles.progressText}>
                  <span>{loadingProgress}%</span>
                  <span>{tileLoadCount > 0 ? `${tileLoadCount} tiles` : 'Starting...'}</span>
                </div>
              </div>

              {/* Loading Message */}
              <p style={styles.loadingMessage}>{loadingMessage}</p>
              <p style={styles.loadingSubtext}>
                {loadingProgress < 30 ? 'Preparing viewer...' : 
                 loadingProgress < 50 ? 'Loading image metadata...' :
                 loadingProgress < 90 ? 'Fetching high-resolution tiles...' :
                 'Almost ready!'}
              </p>

              {/* Image Info */}
              {imageInfo && (
                <div style={styles.imageInfo}>
                  <p style={styles.imageInfoTitle}>Image Details</p>
                  <div style={styles.imageInfoGrid}>
                    <div style={styles.imageInfoItem}>
                      <span style={styles.infoLabel}>Dimensions:</span>
                      <span style={styles.infoValue}>{imageInfo.width} × {imageInfo.height}</span>
                    </div>
                    <div style={styles.imageInfoItem}>
                      <span style={styles.infoLabel}>Tile Size:</span>
                      <span style={styles.infoValue}>{imageInfo.tileSize}px</span>
                    </div>
                    <div style={styles.imageInfoItem}>
                      <span style={styles.infoLabel}>Max Level:</span>
                      <span style={styles.infoValue}>{imageInfo.maxLevel}</span>
                    </div>
                    <div style={styles.imageInfoItem}>
                      <span style={styles.infoLabel}>Megapixels:</span>
                      <span style={styles.infoValue}>
                        {((imageInfo.width * imageInfo.height) / 1_000_000).toFixed(1)} MP
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <p style={styles.tip}>💡 Tip: Large images may take a moment to load all tiles</p>
            </div>
          </div>
        )}

        {/* Info Overlay */}
        {showInfo && !isLoading && (
          <div style={styles.infoOverlay} className="animate-fade-in">
            <Info size={20} color="#c084fc" style={{ marginTop: '4px', flexShrink: 0 }} />
            <div style={styles.infoContent}>
              <p style={styles.infoTitle}>How to Navigate:</p>
              <ul style={styles.infoList}>
                <li>🖱️ <strong>Scroll</strong> to zoom in/out smoothly</li>
                <li>🖐️ <strong>Click & Drag</strong> to pan around</li>
                <li>🖱️ <strong>Click</strong> to zoom to a point</li>
                <li>⌨️ Use toolbar buttons for precise control</li>
              </ul>
            </div>
          </div>
        )}

        {/* OpenSeadragon Viewer */}
        <div ref={viewerRef} style={styles.viewer} />

        {/* Control Panel */}
        <div style={styles.controlPanel}>
          <div style={styles.controlPanelInner}>
            <button onClick={handleZoomOut} style={styles.controlButton} title="Zoom Out">
              <ZoomOut size={20} />
            </button>

            <div style={styles.zoomDisplay}>
              <div style={styles.zoomLabel}>Zoom</div>
              <div style={styles.zoomValue}>{zoomLevel}x</div>
            </div>

            <button onClick={handleZoomIn} style={styles.controlButton} title="Zoom In">
              <ZoomIn size={20} />
            </button>

            <div style={styles.divider}></div>

            <button onClick={handleHome} style={styles.controlButton} title="Reset View">
              <Home size={20} />
            </button>

            <button onClick={handleRotate} style={styles.controlButton} title="Rotate 90°">
              <RotateCw size={20} />
            </button>

            <button onClick={handleFullScreen} style={styles.controlButton} title="Fullscreen">
              <Maximize2 size={20} />
            </button>

            <button onClick={() => setShowInfo(!showInfo)} style={styles.controlButton} title="Show Info">
              <Info size={20} />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div style={styles.statusBar}>
          Rotation: {rotation}°
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '16px 24px',
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(to bottom right, #a855f7, #ec4899)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: '#d8b4fe',
    margin: 0,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  select: {
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
  },
  input: {
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    width: '256px',
    outline: 'none',
  },
  loadButton: {
    padding: '8px 16px',
    background: '#9333ea',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.2s',
  },
  mainArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(4px)',
    zIndex: 20,
  },
  loadingContent: {
    textAlign: 'center',
    maxWidth: '448px',
    padding: '20px',
  },
  loadingLogoContainer: {
    marginBottom: '32px',
  },
  loadingLogoOuter: {
    width: '96px',
    height: '96px',
    margin: '0 auto',
    background: 'linear-gradient(to bottom right, #a855f7, #ec4899)',
    borderRadius: '16px',
    padding: '8px',
  },
  loadingLogoInner: {
    width: '100%',
    height: '100%',
    background: '#0f172a',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: '24px',
  },
  progressBarBg: {
    width: '100%',
    height: '12px',
    background: '#1e293b',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(to right, #a855f7, #ec4899, #a855f7)',
    transition: 'width 0.5s ease-out',
    position: 'relative',
    overflow: 'hidden',
  },
  progressShimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.2)',
    animation: 'shimmer 2s infinite',
  },
  progressText: {
    marginTop: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#d8b4fe',
  },
  loadingMessage: {
    color: 'white',
    fontSize: '18px',
    marginBottom: '8px',
  },
  loadingSubtext: {
    color: '#d8b4fe',
    fontSize: '14px',
  },
  imageInfo: {
    marginTop: '24px',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(168, 85, 247, 0.3)',
  },
  imageInfoTitle: {
    fontSize: '12px',
    color: '#d8b4fe',
    marginBottom: '8px',
  },
  imageInfoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    fontSize: '14px',
  },
  imageInfoItem: {
    textAlign: 'left',
  },
  infoLabel: {
    color: '#9ca3af',
  },
  infoValue: {
    color: 'white',
    marginLeft: '8px',
  },
  tip: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '16px',
  },
  infoOverlay: {
    position: 'absolute',
    top: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(168, 85, 247, 0.5)',
    borderRadius: '16px',
    padding: '16px 24px',
    maxWidth: '448px',
    display: 'flex',
    gap: '12px',
  },
  infoContent: {
    fontSize: '14px',
    color: 'white',
  },
  infoTitle: {
    fontWeight: '600',
    marginBottom: '8px',
  },
  infoList: {
    listStyle: 'none',
    color: '#e9d5ff',
    lineHeight: '1.8',
  },
  viewer: {
    width: '100%',
    height: '100%',
    background: '#0f0f1e',
  },
  controlPanel: {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
  },
  controlPanelInner: {
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '8px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  controlButton: {
    padding: '12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomDisplay: {
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    minWidth: '100px',
    textAlign: 'center',
  },
  zoomLabel: {
    fontSize: '12px',
    color: '#d8b4fe',
    marginBottom: '4px',
  },
  zoomValue: {
    color: 'white',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  divider: {
    width: '1px',
    height: '32px',
    background: 'rgba(255, 255, 255, 0.2)',
    margin: '0 4px',
  },
  statusBar: {
    position: 'absolute',
    bottom: '24px',
    right: '24px',
    zIndex: 10,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '8px 16px',
    fontSize: '14px',
    color: '#d8b4fe',
  },
};

export default DeepZoomViewer;