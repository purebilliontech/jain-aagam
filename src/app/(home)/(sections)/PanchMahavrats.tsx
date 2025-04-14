import React from 'react';

const PanchMahavrats = () => {
  const principles = [
    {
      name: "Ahimsa",
      sanskrit: "Non-violence",
      image: "/images/mahavrat-image-1.jpg",
      description: "Ahimsa is the principle of non-violence, which includes not causing harm to any living being through thoughts, words, or actions."
    },
    {
      name: "Satya",
      sanskrit: "Truth",
      image: "/images/mahavrat-image-2.jpg",
      description: "Satya emphasizes the importance of truthfulness in all aspects of life, encouraging honesty and integrity."
    },
    {
      name: "Achaurya",
      sanskrit: "Non-stealing",
      image: "/images/mahavrat-image-3.jpg",
      description: "Achaurya is the vow of non-stealing, which involves respecting others' property and not taking anything that does not belong to oneself."
    },
    {
      name: "Brahmacharya",
      sanskrit: "Celibacy",
      image: "/images/mahavrat-image-4.jpg",
      description: "Brahmacharya is the practice of celibacy or self-restraint, focusing on controlling desires and maintaining purity of mind and body."
    },
    {
      name: "Aparigraha",
      sanskrit: "Non-possessiveness",
      image: "/images/mahavrat-image-5.jpg",
      description: "Aparigraha teaches non-possessiveness, encouraging individuals to live a life free from materialistic attachments and greed."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 bg-white">
      {/* Header Section */}
      <div className="text-center mb-24">
        <h3 className="text-sm uppercase tracking-wider text-gray-500">THE FIVE GREAT VOWS</h3>
        <h2 className="text-3xl md:text-4xl font-serif text-amber-700 mt-2">Panch Mahavrats</h2>
        <p className="max-w-3xl mx-auto mt-4 text-gray-600 text-sm md:text-base">
          The Panch Mahavrats are the five great vows that form the foundation of Jain ethical practice. These principles guide individuals towards a life of non-violence, truthfulness, non-stealing, celibacy, and non-possessiveness.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-12">
        {principles.map((principle, index) => (
          <div key={index} className="relative w-64 mb-16">
            {/* Card with curved top cutout */}
            <div className="relative bg-amber-50 rounded-3xl h-96 w-full overflow-hidden">
              {/* Circular cutout at top */}
              {/* <div className="absolute top-0 left-0 w-full h-16 bg-white"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-amber-50 rounded-t-full"></div> */}
              
              {/* Card Content */}
              <div className="pt-20 px-6 pb-8 mt-0 text-center">
                <h3 className="text-xl font-serif text-amber-800 font-medium mt-2">{principle.name}</h3>
                <p className="text-amber-600 italic text-sm mt-1">{principle.sanskrit}</p>
                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
            
            {/* Circular Image */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={principle.image} 
                  alt={principle.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanchMahavrats;