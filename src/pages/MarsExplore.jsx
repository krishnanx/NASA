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
import { setEspNo } from "../Store/espSlice" 

const MarsExplore = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const dispatch = useDispatch();

  // generate image list
  const images = Array.from({ length: 6 }, (_, i) => `/marsExplore/${i + 1}.jpg`);

  const handlePress = (espNo) => {
    console.log("Pressed image:", espNo);
    dispatch(setEspNo(espNo)); // update Redux state
  };

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
    console.error(`Failed to load image: /marsExplore/${index + 1}.jpg`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-orange-950 flex flex-col items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-orange-400 mb-3 tracking-wide">
            Mars Exploration Gallery
          </h1>
          <p className="text-gray-400 text-lg">
            Explore the Red Planet through stunning imagery
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => handlePress(index + 1)} // 🔹 dispatch happens here
              className="relative group rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 bg-gray-800"
            >
              {/* Loading placeholder */}
              {!loadedImages[index] && !imageErrors[index] && (
                <div className="w-full aspect-square flex items-center justify-center bg-gray-800">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
                </div>
              )}

              {/* Error state */}
              {imageErrors[index] && (
                <div className="w-full aspect-square flex flex-col items-center justify-center bg-gray-800 text-gray-500">
                  <svg
                    className="w-16 h-16 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">Image not found</p>
                  <p className="text-xs mt-1">{index + 1}.jpg</p>
                </div>
              )}

              {/* Actual Image */}
              <img
                src={src}
                alt={`Mars Surface ${index + 1}`}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                className={`w-full aspect-square object-cover transition-opacity duration-300 ${
                  loadedImages[index] ? "opacity-100" : "opacity-0 absolute"
                } group-hover:opacity-90`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-lg">
                      Image #{index + 1}
                    </span>
                    <span className="text-orange-400 text-sm bg-orange-900/50 px-3 py-1 rounded-full">
                      View
                    </span>
                  </div>
                </div>
              </div>

              {/* Border glow effect on hover */}
              <div className="absolute inset-0 border-2 border-orange-500/0 group-hover:border-orange-500/50 rounded-2xl transition-all duration-300"></div>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          Click on any image to explore in detail
        </div>
      </div>
    </div>
  );
};

export default MarsExplore;
