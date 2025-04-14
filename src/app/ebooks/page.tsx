import React from 'react'

function Ebooks() {
  return (
    <html lang="en">
      <body>
      <div className="flex flex-col w-full max-w-5xl mx-auto bg-white">
      {/* Header Section */}
      <div className="flex bg-amber-50 p-8">
        <div className="w-1/3">
          <img 
            src="/api/placeholder/200/300" 
            alt="Bhagwan Mahavir" 
            className="rounded border-2 border-gray-300"
          />
        </div>
        <div className="w-2/3 flex flex-col justify-center pl-8">
          <h1 className="text-4xl font-light text-amber-600 mb-4">BHAGWAN<br />MAHAVIR</h1>
          <div className="text-blue-500 underline mt-4">← BANNER - TO BE DESIGNED→</div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="px-16 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <div className="h-px bg-gray-300 w-1/4"></div>
            <div className="px-4 text-sm text-gray-400 uppercase">THE 24TH TIRTHANKARA</div>
            <div className="h-px bg-gray-300 w-1/4"></div>
          </div>
          <h2 className="text-2xl text-amber-600 font-serif">Bhagwan Mahavir</h2>
          <div className="flex items-center justify-center mt-2">
            <div className="h-px bg-gray-300 w-1/3"></div>
          </div>
        </div>

        <div className="text-gray-600 text-sm leading-relaxed mb-12">
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultricies gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultricies gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultricies gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
          </p>
        </div>
      </div>

      {/* Bottom Quote Section */}
      <div className="bg-amber-100 bg-opacity-50 p-8 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-9xl text-amber-500">ॐ</div>
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h3 className="text-xl text-amber-600 font-serif mb-4">|| ઉવસગ્ગહરં પાસં ||</h3>
          <p className="text-sm text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultricies gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
          <p className="text-sm text-gray-700">Shreee Uvasaggaharam Sutra</p>
        </div>
      </div>
    </div>
      </body>
    </html>
  )
}

export default Ebooks