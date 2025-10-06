// import React, { useState } from "react";

// const MarsExplore = () => {
//   const [loadedImages, setLoadedImages] = useState({});
//   const [imageErrors, setImageErrors] = useState({});

//   const handlePress = (num) => {
//     console.log("Pressed image:", num);
//     // Add your navigation or action here
//   };

//   // Fixed: .jpj -> .jpg
//   const images = Array.from({ length: 6 }, (_, i) => `/marsExplore/${i + 1}.jpg`);

//   const handleImageLoad = (index) => {
//     setLoadedImages(prev => ({ ...prev, [index]: true }));
//   };

//   const handleImageError = (index) => {
//     setImageErrors(prev => ({ ...prev, [index]: true }));
//     console.error(`Failed to load image: /marsExplore/${index + 1}.jpg`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-orange-950 flex flex-col items-center justify-center p-6">
//       <div className="max-w-6xl w-full">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-orange-400 mb-3 tracking-wide">
//             Mars Exploration Gallery
//           </h1>
//           <p className="text-gray-400 text-lg">
//             Explore the Red Planet through stunning imagery
//           </p>
//         </div>

//         {/* Image Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {images.map((src, index) => (
//             <button
//               key={index}
//               onClick={() => handlePress(index + 1)}

//               className="relative group rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 bg-gray-800"
//             >
//               {/* Loading placeholder */}
//               {!loadedImages[index] && !imageErrors[index] && (
//                 <div className="w-full aspect-square flex items-center justify-center bg-gray-800">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
//                 </div>
//               )}

//               {/* Error state */}
//               {imageErrors[index] && (
//                 <div className="w-full aspect-square flex flex-col items-center justify-center bg-gray-800 text-gray-500">
//                   <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   <p className="text-sm">Image not found</p>
//                   <p className="text-xs mt-1">{index + 1}.jpg</p>
//                 </div>
//               )}

//               {/* Actual Image */}
//               <img
//                 src={src}
//                 alt={`Mars Surface ${index + 1}`}
//                 onLoad={() => handleImageLoad(index)}
//                 onError={() => handleImageError(index)}
//                 className={`w-full aspect-square object-cover transition-opacity duration-300 ${
//                   loadedImages[index] ? 'opacity-100' : 'opacity-0 absolute'
//                 } group-hover:opacity-90`}
//               />

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="absolute bottom-0 left-0 right-0 p-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-white font-semibold text-lg">
//                       Image #{index + 1}
//                     </span>
//                     <span className="text-orange-400 text-sm bg-orange-900/50 px-3 py-1 rounded-full">
//                       View
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Border glow effect on hover */}
//               <div className="absolute inset-0 border-2 border-orange-500/0 group-hover:border-orange-500/50 rounded-2xl transition-all duration-300"></div>
//             </button>
//           ))}
//         </div>

//         {/* Footer hint */}
//         <div className="text-center mt-12 text-gray-500 text-sm">
//           Click on any image to explore in detail
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarsExplore;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setEspNo } from "../Store/espSlice";
import './MarsExplore.css'; // 🔹 import the CSS
import { useNavigate } from "react-router-dom";

const MarsExplore = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const images = Array.from({ length: 6 }, (_, i) => `/marsExplore/${i + 1}.jpg`);

   const marsImageInfo = [
  {
    title: "Jezerro Crater",
    description: "Landing site of NASA's Perseverance rover, key for searching signs of ancient life."
  },
  {
    title: "Chryse Planitia - Viking 1",
    description: "Historic Viking 1 landing site, first successful U.S. Mars landing in 1976."
  },
  {
    title: "Utopia Planitia - Viking 2",
    description: "Viking 2 site, providing early insights into Martian soil and atmosphere."
  },
  {
    title: "Elysium Planitia - InSight Lander",
    description: "InSight studies Mars' interior and seismic activity to understand planetary formation."
  },
  {
    title: "Meridiani Planum - Opportunity Rover",
    description: "Opportunity explored hematite-rich rocks, revealing evidence of past water on Mars."
  },
  {
    title: "Gusev Crater - Spirit Rover",
    description: "Spirit examined volcanic rocks, uncovering Mars' geological diversity."
  }
];


  const handlePress = (espNo) => {
    console.log("ESPNOOO: ",espNo);
    dispatch(setEspNo(espNo));
    navigate("/planets/deepzoom");
  };

  const handleImageLoad = (index) => setLoadedImages(prev => ({ ...prev, [index]: true }));
  const handleImageError = (index) => setImageErrors(prev => ({ ...prev, [index]: true }));

  return (
    <div className="mars-container flex flex-col items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div
          className="text-center mb-12"
          
        >
         <h1
          className="font-bold mb-3 tracking-wide"
          style={{
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize:"3.5rem",
          }}
        >
          Mars Exploration Gallery
        </h1>
        <p className="desc">
          Explore the Red Planet through stunning imagery
        </p>

        </div>


        {/* Image Grid */}
<div className="mars-grid">
  {images.map((src, index) => (
    <button
      key={index}
      onClick={() => handlePress(index)}
      className="mars-card"
    >
      <img
        src={src}
        alt={marsImageInfo[index].title}
        onLoad={() => handleImageLoad(index)}
        onError={() => handleImageError(index)}
        className={`mars-image ${loadedImages[index] ? "visible" : "hidden"}`}
      />

      {/* Hover Overlay */}
      <div className="mars-overlay">
        <h3>{marsImageInfo[index].title}</h3>
        <p>{marsImageInfo[index].description}</p>
      </div>
    </button>
  ))}
</div>

<style>
{`
.mars-grid {

padding:100px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 5rem;
}
  .desc{
  padding-top:30px;
  color:white;
  font-size:1.5rem;;
  }

.mars-card {
  position: relative;
  border: none;
  padding: 0;
  background: none;
  overflow: hidden;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mars-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(255, 140, 0, 0.4);
}

.mars-image {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  display: block;
  transition: opacity 0.3s ease;
}

.mars-image.hidden {
  opacity: 0;
}

.mars-image.visible {
  opacity: 1;
}

.mars-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  transition: opacity 0.4s ease;
}

.mars-card:hover .mars-overlay {
  opacity: 1;
}

.mars-overlay h3 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.mars-overlay p {
  font-size: 0.9rem;
  max-width: 85%;
  color: rgba(255, 255, 255, 0.85);
}
`}
</style>


      </div>
    </div>
  );
};

export default MarsExplore;
