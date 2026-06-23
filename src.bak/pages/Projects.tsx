import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Hospitality', 'Commercial', 'Casino', 'Residential'];

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  const projects = useMemo(() => [
    {
      id: 'caesars-southern-indiana',
      title: 'Caesars Southern Indiana Hotel & Casino',
      description: 'Custom lighting installation for luxury casino resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09181123/img_projects_cover_caesarsb1-1.jpg',
      category: 'Casino'
    },
    {
      id: 'borgata',
      title: 'Borgata Hotel Casino & Spa',
      description: 'Custom lighting installation for luxury casino resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09175946/img_projects_cover_borgata1-1.jpg',
      category: 'Casino'
    },
    {
      id: 'blazing-noodles',
      title: 'Blazing Noodles At Pechanga',
      description: 'Custom lighting installation for upscale Asian restaurant',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013611/img_projects_cover_blazing1-1.jpg',
      category: 'Commercial'
    },
    {
      id: 'ayce-buffet',
      title: 'Ayce Buffet',
      description: 'Custom lighting installation for modern buffet restaurant',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013520/img_projects_vertical_ayce2-1.jpg',
      category: 'Commercial'
    },
    {
      id: 'beauty-and-essex',
      title: 'Beauty And Essex',
      description: 'Custom lighting installation for luxury restaurant and lounge',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202953/img_projects_cover_beauty1-1.jpg',
      category: 'Commercial'
    },
    {
      id: 'aspen-dental-headquarters',
      title: 'Aspen Dental Corporate Headquarters',
      description: 'Custom lighting installation for corporate headquarters',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2022/11/07064655/1565_001-squere-1.jpg',
      category: 'Commercial'
    },
    {
      id: 'avra-restaurant',
      title: 'Avra Restaurant',
      description: 'Custom lighting installation for upscale dining venue',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013346/img_projects_cover_avra1-1.jpg',
      category: 'Commercial'
    },
    {
      id: 'avenue',
      title: 'Avenue Los Angeles',
      description: 'Custom lighting installation for luxury venue',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202807/img_projects_cover_avenue1-1.jpg',
      category: 'Commercial'
    },
    {
      id: 'ac-hotel-marriott',
      title: 'AC Hotel by Marriott',
      description: 'Custom lighting installation for luxury hotel',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10024138/img_projects_cover_ac1.jpg',
      category: 'Hospitality'
    },
    {
      id: 'avalon-bay-hollywood',
      title: 'Avalon Bay Hollywood',
      description: 'Custom lighting installation for luxury residential complex',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10005453/img_projects_cover_avalon1-2.jpg',
      category: 'Residential'
    },
    {
      id: 'avalon-apartments',
      title: 'Avalon Apartments',
      description: 'Custom lighting installation for luxury residential complex',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202537/img_projects_cover_avalon1-1.jpg',
      category: 'Residential'
    },
    {
      id: 'the-landing-hotel',
      title: 'The Landing Hotel at Rivers Casino',
      description: 'Custom lighting installation for luxury hotel and casino',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224244/img_projects_cover_thelanding1.jpg',
      category: 'Hospitality'
    },
    {
      id: 'resorts-world-las-vegas',
      title: 'Resorts World Las Vegas',
      description: 'Custom lighting installation for luxury resort and casino',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01222627/img_projects_cover_resortworld1.jpg',
      category: 'Casino'
    },
    {
      id: 'park-hyatt-aviara',
      title: 'Park Hyatt Aviara',
      description: 'Custom lighting installation for luxury resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011837/img_projects_cover_parkhyatt1-1024x1024.jpg',
      category: 'Hospitality'
    },
    {
      id: 'marriott-headquarters',
      title: 'Marriott Headquarters in Bethesda, MD',
      description: 'Custom lighting installation for corporate headquarters',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/10/18222313/img_projects_cover_rottetstudio1.jpg',
      category: 'Hospitality'
    },
    {
      id: 'margaritaville-resort-bossier-city',
      title: 'Margaritaville Resort Bossier City',
      description: 'Custom lighting installation for luxury resort',
      image: 'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/1-IMG_1965+copy+2+(1)_compressed.webp',
      category: 'Hospitality'
    },
    {
      id: 'peter-luger-steakhouse',
      title: 'Peter Luger Steakhouse',
      description: 'Custom lighting installation for iconic steakhouse',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/12/02000706/img_projects_peterlugersteakhouse2.jpg',
      category: 'Commercial'
    },
    {
      id: 'caesars-palace-las-vegas',
      title: 'Caesars Palace Las Vegas',
      description: 'Custom lighting installation for iconic casino resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180441/img_projects_cover_caesars1-1.jpg',
      category: 'Casino'
    },
    {
      id: 'four-winds-casino-resort',
      title: 'Four Winds Casino Resort in New Buffalo, MI',
      description: 'Custom lighting installation for luxury casino resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01225031/img_projects_cover_fourwinds1.jpg',
      category: 'Casino'
    },
    {
      id: 'live-casino-hotel-philadelphia',
      title: 'Live! Casino Hotel Philadelphia',
      description: 'Custom lighting installation for luxury casino and hotel',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10023747/img_projects_vertical_live2-1-1.jpg',
      category: 'Casino'
    }
  ], []);

  const filteredProjects = useMemo(() => 
    selectedCategory === 'All' 
      ? projects 
      : projects.filter(project => project.category === selectedCategory),
    [selectedCategory, projects]
  );

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = projects.map(project => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = project.image;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to load some images:', error);
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, [projects]);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-light mb-8">Project Installations</h1>
        
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden cursor-pointer rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <div className="aspect-[4/5] w-full">
                {!imagesLoaded ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <p className="text-sm font-medium mb-2">{project.category}</p>
                  <h3 className="text-xl font-light mb-2">{project.title}</h3>
                  <p className="text-sm opacity-90">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;