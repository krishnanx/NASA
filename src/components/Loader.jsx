import React, { useEffect, useState } from 'react';

const SolarSystemLoading = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [heading] = useState(() => {
    const headings = [
      'EXPLORING THE COSMOS',
      'JOURNEY THROUGH SPACE',
      'DISCOVERING THE UNIVERSE',
      'ENTERING THE SOLAR SYSTEM',
      'NAVIGATING THE GALAXY',
      'VOYAGE TO THE STARS'
    ];
    return headings[Math.floor(Math.random() * headings.length)];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onLoadComplete) {
              onLoadComplete();
            }
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  const styles = {
    loadingPage: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom, #000000, #0a0a2e, #16213e)'
    },
    starsContainer: {
      position: 'absolute',
      inset: 0
    },
    star: {
      position: 'absolute',
      background: 'white',
      borderRadius: '50%',
      animation: 'pulse 3s ease-in-out infinite'
    },
    contentContainer: {
      textAlign: 'center',
      width: '100%',
      padding: '0 2rem',
      position: 'relative',
      zIndex: 10
    },
    mainHeading: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      background: 'linear-gradient(to right, #a78bfa, #9333ea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    orbitContainer: {
      position: 'relative',
      width: '128px',
      height: '128px',
      margin: '0 auto 2rem'
    },
    sun: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '16px',
      height: '16px',
      background: '#fbbf24',
      borderRadius: '50%',
      boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
      transform: 'translate(-50%, -50%)',
      zIndex: 10
    },
    orbit: {
      position: 'absolute',
      border: '1px solid rgba(167, 139, 250, 0.2)',
      borderRadius: '50%',
      animation: 'spin 4s linear infinite'
    },
    orbit1: {
      inset: 0,
      animationDuration: '4s'
    },
    orbit2: {
      inset: '12px',
      animationDuration: '3s',
      animationDirection: 'reverse'
    },
    orbit3: {
      inset: '24px',
      animationDuration: '2.5s'
    },
    planet: {
      position: 'absolute',
      borderRadius: '50%',
      top: 0,
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    planetBlue: {
      width: '10px',
      height: '10px',
      background: '#60a5fa',
      boxShadow: '0 0 10px rgba(96, 165, 250, 0.5)'
    },
    planetOrange: {
      width: '12px',
      height: '12px',
      background: '#fb923c',
      boxShadow: '0 0 10px rgba(251, 146, 60, 0.5)'
    },
    planetRed: {
      width: '8px',
      height: '8px',
      background: '#f87171',
      boxShadow: '0 0 10px rgba(248, 113, 113, 0.5)'
    },
    loadingText: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.875rem',
      letterSpacing: '0.2em',
      marginBottom: '1rem'
    },
    progressBarContainer: {
      position: 'relative',
      width: '384px',
      height: '8px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '9999px',
      margin: '0 auto',
      maxWidth: '90%'
    },
    progressBar: {
      height: '100%',
      background: 'linear-gradient(to right, #a78bfa, #9333ea)',
      borderRadius: '9999px',
      transition: 'width 0.3s ease'
    },
    rocketIcon: {
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '32px',
      transition: 'left 0.3s ease',
      filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.5))'
    },
    percentage: {
      color: '#a78bfa',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginTop: '1.5rem'
    }
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={styles.loadingPage}>
        {/* Stars background */}
        <div style={styles.starsContainer}>
          {Array.from({ length: 150 }).map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.star,
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: Math.random() * 3 + 2 + 's',
                animationDelay: Math.random() * 2 + 's'
              }}
            />
          ))}
        </div>

        <div style={styles.contentContainer}>
          <h1 style={styles.mainHeading}>{heading}</h1>
          
          <div style={styles.orbitContainer}>
            {/* Sun center */}
            <div style={styles.sun}></div>
            
            {/* Orbit 1 with planet */}
            <div style={{...styles.orbit, ...styles.orbit1}}>
              <div style={{...styles.planet, ...styles.planetBlue}}></div>
            </div>
            
            {/* Orbit 2 with planet */}
            <div style={{...styles.orbit, ...styles.orbit2}}>
              <div style={{...styles.planet, ...styles.planetOrange}}></div>
            </div>
            
            {/* Orbit 3 with planet */}
            <div style={{...styles.orbit, ...styles.orbit3}}>
              <div style={{...styles.planet, ...styles.planetRed}}></div>
            </div>
          </div>

          <div style={styles.loadingText}>LOADING</div>
          
          <div style={styles.progressBarContainer}>
            <div 
              style={{...styles.progressBar, width: `${progress}%`}}
            ></div>
            <div 
              style={{...styles.rocketIcon, left: `${progress}%`}}
            >
              🚀
            </div>
          </div>
          
          <div style={styles.percentage}>{progress}%</div>
        </div>
      </div>
    </>
  );
};

export default SolarSystemLoading;