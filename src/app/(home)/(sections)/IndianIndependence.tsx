import React from 'react';

export default function IndianIndependence() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8 text-center border-b pb-2">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">HISTORIC MEMORYSCAPE</p>
        <h1 className="text-2xl font-medium text-amber-700">Indian Independence</h1>
      </div>

      {/* Top Grid Section */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {/* Large left box - spans 2 rows and 2 columns */}
        <div className="col-span-2 row-span-2 bg-stone-300 p-6 flex items-center justify-center h-64">
          <p className="text-center text-white font-medium">GANDHIJI & BHAGWAN ANUVR PHOTO</p>
        </div>
        
        {/* Top right box */}
        <div className="col-span-1 bg-stone-300 p-4 flex items-center justify-center h-32">
          <p className="text-center text-white font-medium">DELHI MUSEUM PHOTOS</p>
        </div>
        
        {/* Far right box - spans 2 rows */}
        <div className="col-span-1 row-span-2 bg-stone-300 p-4 flex items-center justify-center h-64">
          <p className="text-center text-white font-medium">GANDHIJI&apos;S HANDWRITINGS</p>
        </div>
        
        {/* Bottom middle box */}
        <div className="col-span-1 bg-stone-300 p-4 flex items-center justify-center h-28">
          <p className="text-center text-white">EMPTY</p>
        </div>
      </div>

      {/* Lorem Ipsum Text */}
      <div className="mb-8">
        <p className="text-xs text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum 
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
        </p>
      </div>

      {/* Bottom Grid Section - 3 equal columns */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-stone-300 p-4 flex items-center justify-center h-64">
          <p className="text-center text-white font-medium">GANDHIJI & BICHARJI SWAMI PAINTING</p>
        </div>
        <div className="bg-stone-300 p-4 flex items-center justify-center h-64">
          <p className="text-center text-white font-medium">GANDHIJI & CHIVALU MARRJI MAHASATIH PHOTO</p>
        </div>
        <div className="bg-stone-300 p-4 flex items-center justify-center h-64">
          <p className="text-center text-white font-medium">GANDHIJI & SHRIMAD RAJCHANDRAJI</p>
        </div>
      </div>

      {/* Bottom Lorem Ipsum Text */}
      <div>
        <p className="text-xs text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum 
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
        </p>
      </div>
    </div>
  );
}