import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ProjectData {
  title: string;
  description: string;
  image: string;
  category: string;
  fullDescription?: string;
  specs?: string[];
  additionalImages?: string[];
  video?: {
    url: string;
    poster: string;
  };
}

function Project() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageAspectRatios, setImageAspectRatios] = useState<Record<string, number>>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => {
      if (isMounted.current) setIsPlaying(true);
    };
    const handlePause = () => {
      if (isMounted.current) setIsPlaying(false);
    };
    const handleEnded = () => {
      if (isMounted.current) setIsPlaying(false);
    };
    const handleLoadedData = () => {
      if (isMounted.current) setIsVideoLoaded(true);
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('loadeddata', handleLoadedData);

    return () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('ended', handleEnded);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
      }
    };
  }, []);

  const handleImageLoad = (src: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setImageAspectRatios(prev => ({ ...prev, [src]: aspectRatio }));
    setLoadedImages(prev => new Set(prev).add(src));
  };

  const handleImageClick = (img: string, index: number) => {
    setSelectedImage(img);
    setCurrentImageIndex(index);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project) return;
    const allImages = [project.image, ...(project.additionalImages || [])];
    const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project) return;
    const allImages = [project.image, ...(project.additionalImages || [])];
    const newIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const projects: Record<string, ProjectData> = {
    'caesars-southern-indiana': {
      title: 'Caesars Southern Indiana Hotel & Casino',
      description: 'Custom lighting installation for luxury casino resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09181123/img_projects_cover_caesarsb1-1.jpg',
      category: 'Casino',
      fullDescription: 'A sophisticated lighting installation designed and manufactured for Caesars Southern Indiana Hotel & Casino. This project showcases our expertise in creating elegant lighting solutions that enhance the gaming and hospitality experience while maintaining the brand\'s high standards of luxury.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09181132/img_projects_vertical_caesarsb_2-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09181137/img_projects_vertical_caesarsb_3-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09181143/img_projects_vertical_caesarsb_4-2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09181156/img_projects_vertical_caesarsb_5-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09181203/img_projects_vertical_caesarsb_6-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09181210/img_projects_vertical_caesarsb_7-2.jpg'
      ]
    },
    'borgata': {
      title: 'Borgata Hotel Casino & Spa',
      description: 'Custom lighting installation for luxury casino resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09175946/img_projects_cover_borgata1-1.jpg',
      category: 'Casino',
      fullDescription: 'An exquisite lighting installation designed and manufactured for the prestigious Borgata Hotel Casino & Spa. This project showcases our expertise in creating sophisticated lighting solutions that enhance the luxury gaming and hospitality experience while maintaining the highest standards of elegance and refinement.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09175956/img_projects_vertical_borgata2-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180000/img_projects_vertical_borgata3-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180006/img_projects_vertical_borgata4-2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180018/img_projects_vertical_borgata5-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180023/img_projects_vertical_borgata6-1.jpg'
      ]
    },
    'blazing-noodles': {
      title: 'Blazing Noodles At Pechanga',
      description: 'Custom lighting installation for upscale Asian restaurant',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013611/img_projects_cover_blazing1-1.jpg',
      category: 'Commercial',
      fullDescription: 'A sophisticated lighting installation designed and manufactured for Blazing Noodles at Pechanga Resort Casino. This project showcases our expertise in creating elegant lighting solutions that enhance the dining experience while maintaining an authentic Asian atmosphere.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013622/img_projects_vertical_blazing2-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013629/img_projects_vertical_blazing3-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013644/img_projects_vertical_blazing5-1.jpg'
      ]
    },
    'ayce-buffet': {
      title: 'Ayce Buffet',
      description: 'Custom lighting installation for modern buffet restaurant',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013520/img_projects_vertical_ayce2-1.jpg',
      category: 'Commercial',
      fullDescription: 'A sophisticated lighting installation designed and manufactured for Ayce Buffet. This project showcases our expertise in creating elegant lighting solutions that enhance the dining experience while maintaining a modern and welcoming atmosphere.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013524/img_projects_vertical_ayce4-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013542/img_projects_vertical_ayce6-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013551/img_projects_vertical_ayce7-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013530/img_projects_vertical_ayce5-2.jpg'
      ]
    },
    'beauty-and-essex': {
      title: 'Beauty And Essex',
      description: 'Custom lighting installation for luxury restaurant and lounge',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202953/img_projects_cover_beauty1-1.jpg',
      category: 'Commercial',
      fullDescription: 'An exquisite lighting installation designed and manufactured for Beauty And Essex. This project showcases our expertise in creating sophisticated lighting solutions that enhance the luxurious dining and lounge experience while maintaining an elegant atmosphere.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09203004/img_projects_vertical_beauty2-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09203025/img_projects_vertical_beauty5-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09203031/img_projects_vertical_beauty6-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09203049/img_projects_vertical_beauty8-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09203055/img_projects_vertical_beauty9-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09203014/img_projects_vertical_beauty4-2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09203037/img_projects_vertical_beauty7-2.jpg'
      ]
    },
    'aspen-dental-headquarters': {
      title: 'Aspen Dental Corporate Headquarters',
      description: 'Custom lighting installation for corporate headquarters',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2022/11/07064655/1565_001-squere-1.jpg',
      category: 'Commercial',
      fullDescription: 'A sophisticated lighting installation designed and manufactured for the Aspen Dental Corporate Headquarters. This project demonstrates our expertise in creating elegant lighting solutions that enhance corporate environments while maintaining a professional and modern atmosphere.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2022/11/07062414/1565_001.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2022/11/07062604/1565_003.jpg'
      ]
    },
    'avra-restaurant': {
      title: 'Avra Restaurant',
      description: 'Custom lighting installation for upscale dining venue',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013346/img_projects_cover_avra1-1.jpg',
      category: 'Commercial',
      fullDescription: 'An elegant lighting installation designed and manufactured for Avra Restaurant. This project showcases our expertise in creating sophisticated lighting solutions that enhance the dining experience while maintaining an upscale atmosphere.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013358/img_projects_vertical_avra2-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013402/img_projects_vertical_avra3-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013409/img_projects_vertical_avra5-2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10013420/img_projects_vertical_avra6-1.jpg'
      ],
      video: {
        url: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10021934/img_projects_vertical_avra4-1.mp4?_=1',
        poster: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23f3f4f6"/%3E%3C/svg%3E'
      }
    },
    'avenue': {
      title: 'Avenue Los Angeles',
      description: 'Custom lighting installation for luxury venue',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202807/img_projects_cover_avenue1-1.jpg',
      category: 'Commercial',
      fullDescription: 'A sophisticated lighting installation designed and manufactured for Avenue Los Angeles. This project showcases our expertise in creating elegant lighting solutions that enhance the modern luxury venue experience while maintaining a contemporary atmosphere.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202818/img_projects_vertical_avenue2-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202826/img_projects_vertical_avenue3-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202831/img_projects_vertical_avenue4-2.jpg'
      ]
    },
    'ac-hotel-marriott': {
      title: 'AC Hotel by Marriott',
      description: 'Custom lighting installation for luxury hotel',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10024138/img_projects_cover_ac1.jpg',
      category: 'Hospitality',
      fullDescription: 'A sophisticated lighting installation designed and manufactured for the AC Hotel by Marriott. This project showcases our expertise in creating elegant lighting solutions that enhance the modern luxury hotel experience while maintaining brand standards.'
    },
    'avalon-bay-hollywood': {
      title: 'Avalon Bay Hollywood',
      description: 'Custom lighting installation for luxury residential complex',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10005453/img_projects_cover_avalon1-2.jpg',
      category: 'Residential',
      fullDescription: 'A sophisticated lighting installation designed and manufactured for Avalon Bay Hollywood. This project demonstrates our expertise in creating elegant lighting solutions that enhance modern residential spaces while maintaining a luxurious and contemporary atmosphere.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10005503/img_projects_vertical_avalon2-2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10005508/img_projects_vertical_avalon3-2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10005514/img_projects_vertical_avalon4-4.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10005524/img_projects_vertical_avalon5-2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10005529/img_projects_vertical_avalon6-2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10005537/img_projects_vertical_avalon7-1.jpg'
      ]
    },
    'avalon-apartments': {
      title: 'Avalon Apartments',
      description: 'Custom lighting installation for luxury residential complex',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202537/img_projects_cover_avalon1-1.jpg',
      category: 'Residential',
      fullDescription: 'A sophisticated lighting installation designed and manufactured for the Avalon Apartments. This project showcases our ability to create elegant lighting solutions that enhance residential spaces while maintaining a luxurious and welcoming atmosphere.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202546/img_projects_vertical_avalon2-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202553/img_projects_vertical_avalon3-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202559/img_projects_vertical_avalon4-3.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202613/img_projects_vertical_avalon5-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202618/img_projects_vertical_avalon6-1.jpg'
      ]
    },
    'the-landing-hotel': {
      title: 'The Landing Hotel at Rivers Casino',
      description: 'Custom lighting installation for luxury hotel and casino',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224244/img_projects_cover_thelanding1.jpg',
      category: 'Hospitality',
      fullDescription: 'A sophisticated lighting installation designed and manufactured for The Landing Hotel at Rivers Casino. This project showcases our expertise in creating custom lighting solutions that enhance the luxurious atmosphere of modern hotel and casino spaces.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224202/img_projects_vertical_thelanding9.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224205/img_projects_vertical_thelanding8.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224217/img_projects_vertical_thelanding6.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224223/img_projects_vertical_thelanding5.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224228/img_projects_vertical_thelanding4.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224239/img_projects_vertical_thelanding2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12183636/IMG_4084-High-Res-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224210/img_projects_vertical_thelanding7.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224235/img_projects_vertical_thelanding3.jpg'
      ]
    },
    'resorts-world-las-vegas': {
      title: 'Resorts World Las Vegas',
      description: 'Custom lighting installation for luxury resort and casino',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01222627/img_projects_cover_resortworld1.jpg',
      category: 'Casino',
      fullDescription: 'An extensive lighting installation designed and manufactured for the prestigious Resorts World Las Vegas. This project demonstrates our capability to create sophisticated lighting solutions that enhance the luxurious atmosphere of world-class casino resorts.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01222633/img_projects_vertical_resortworld2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01222636/img_projects_vertical_resortworld3.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01222641/img_projects_vertical_resortworld4.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01222649/img_projects_vertical_resortworld5.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01222652/img_projects_vertical_resortworld6.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12183455/IMG_4924-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01222706/img_projects_vertical_resortworld8.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01222708/img_projects_vertical_resortworld9.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01222714/img_projects_vertical_resortworld10.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12184431/IMG_4815-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12184527/IMG_4820-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12184735/IMG_4860-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12185033/IMG_4866-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12185132/IMG_4871-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12185328/IMG_4912-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12185421/IMG_4942-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12185516/IMG_4980-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12185624/IMG_5054-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12185727/IMG_5056-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12185828/IMG_5060-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12185917/IMG_5063-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12190017/IMG_5114-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12190107/IMG_5118-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12190212/IMG_5124-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12190311/IMG_5146-1-copy-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12190426/IMG_5152-1-copy-scaled.jpg'
      ]
    },
    'park-hyatt-aviara': {
      title: 'Park Hyatt Aviara',
      description: 'Custom lighting installation for luxury resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011837/img_projects_cover_parkhyatt1-1024x1024.jpg',
      category: 'Hospitality',
      fullDescription: 'A sophisticated lighting installation designed and manufactured for the Park Hyatt Aviara. This project exemplifies our ability to create elegant lighting solutions that complement the luxurious atmosphere of high-end resorts while maintaining the brand\'s commitment to excellence.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011848/img_projects_vertical_parkhyatt2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011854/img_projects_vertical_parkhyatt3.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011859/img_projects_vertical_parkhyatt4-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011910/img_projects_vertical_parkhyatt5.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011916/img_projects_vertical_parkhyatt6.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011921/img_projects_vertical_parkhyatt7.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011927/img_projects_vertical_parkhyatt8-1-1536x800.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011938/img_projects_vertical_parkhyatt9.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10011950/img_projects_vertical_parkhyatt10-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10012001/img_projects_vertical_parkhyatt11.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10012005/img_projects_vertical_parkhyatt12.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10012010/img_projects_vertical_parkhyatt13-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10012020/img_projects_vertical_parkhyatt14.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10012024/img_projects_vertical_parkhyatt15.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10012029/img_projects_vertical_parkhyatt16-1.jpg'
      ]
    },
    'marriott-headquarters': {
      title: 'Marriott Headquarters in Bethesda, MD',
      description: 'Custom lighting installation for corporate headquarters',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/10/18222313/img_projects_cover_rottetstudio1.jpg',
      category: 'Hospitality',
      fullDescription: 'A comprehensive lighting installation designed and manufactured for the new Marriott International Headquarters in Bethesda, Maryland. This project showcases our expertise in creating sophisticated lighting solutions that enhance corporate environments while maintaining brand identity.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/10/18222318/img_projects_vertical_rottetstudio2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/10/18222323/img_projects_vertical_rottetstudio3.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/10/18222333/img_projects_vertical_rottetstudio4.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/10/18222343/img_projects_vertical_rottetstudio5.jpg'
      ]
    },
    'margaritaville-resort-bossier-city': {
      title: 'Margaritaville Resort Bossier City',
      description: 'Custom lighting installation for luxury resort',
      image: 'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/1-IMG_1965+copy+2+(1)_compressed.webp',
      category: 'Hospitality',
      fullDescription: 'A comprehensive lighting installation designed and manufactured for the Margaritaville Resort in Bossier City. This project showcases our expertise in creating custom lighting solutions that enhance the resort atmosphere while maintaining the brand\'s signature style.',
      additionalImages: [
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/2-IMG_1980+copy+2+(1)_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/3-IMG_2361+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/4-IMG_2436+copy+2_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/5-IMG_1993+copy+(1)_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/6-IMG_2130+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/7-IMG_2188+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/8-IMG_2244+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/9-IMG_2163+copy+2_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/10-IMG_2164+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/11-IMG_2170+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/12-IMG_2176+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/13-IMG_2209+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/14-IMG_2252+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/15-IMG_2307+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/16-IMG_2338+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/17-IMG_2347+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/18-IMG_2358+copy_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/19-IMG_2436+copy+3_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/20-IMG_2449+copy+3_compressed.webp',
        'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/21-IMG_2502+copy2_compressed.webp'
      ]
    },
    'peter-luger-steakhouse': {
      title: 'Peter Luger Steakhouse',
      description: 'Custom lighting installation for iconic steakhouse',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/12/02000706/img_projects_peterlugersteakhouse2.jpg',
      category: 'Commercial',
      fullDescription: 'A custom lighting installation designed and manufactured for the iconic Peter Luger Steakhouse. The project combines traditional aesthetics with modern lighting technology to enhance the historic ambiance of this renowned establishment.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/12/02000717/img_projects_peterlugersteakhouse3.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/12/02000748/img_projects_peterlugersteakhouse5.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/12/02000734/img_projects_peterlugersteakhouse4.jpg'
      ]
    },
    'caesars-palace-las-vegas': {
      title: 'Caesars Palace Las Vegas',
      description: 'Custom lighting installation for iconic casino resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180441/img_projects_cover_caesars1-1.jpg',
      category: 'Casino',
      fullDescription: 'A prestigious lighting installation designed and manufactured for the iconic Caesars Palace in Las Vegas. This project demonstrates our ability to create luxurious, large-scale lighting solutions that complement the grandeur of world-renowned hospitality venues.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180451/img_projects_vertical_caesars2-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180456/img_projects_vertical_caesars3-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180524/img_projects_vertical_caesars7-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180515/img_projects_vertical_caesars5-1.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180531/img_projects_vertical_caesars8-2.jpg'
      ]
    },
    'four-winds-casino-resort': {
      title: 'Four Winds Casino Resort in New Buffalo, MI',
      description: 'Custom lighting installation for luxury casino resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01225031/img_projects_cover_fourwinds1.jpg',
      category: 'Casino',
      fullDescription: 'This comprehensive lighting installation was designed and manufactured for the Four Winds Casino Resort in New Buffalo, Michigan. The project showcases our expertise in creating custom lighting solutions that enhance the architectural beauty and ambiance of luxury hospitality spaces.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12194619/IMG_4580-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12194455/IMG_4545-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12194300/IMG_4527-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12193904/IMG_4450-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12192855/IMG_4280-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12192457/IMG_4233-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12192957/IMG_4324-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12193057/IMG_4394-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12193456/IMG_4420-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12193649/IMG_4438-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12193802/IMG_4441-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12194106/IMG_4482-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12194213/IMG_4510-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12194359/IMG_4531-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12194707/IMG_4600-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12194833/IMG_4619-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12194903/IMG_4627-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12195018/IMG_4646-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12195103/IMG_4656-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12195210/IMG_4666-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12195338/IMG_4682-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12195510/IMG_4693-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12192151/IMG_4184-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12195636/IMG_4706-copy-2-scaled.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224912/img_projects_vertical_fourwinds13.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224924/img_projects_vertical_fourwinds11.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224932/img_projects_vertical_fourwinds10.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01224939/img_projects_vertical_fourwinds9.jpg'
      ]
    },
    'live-casino-hotel-philadelphia': {
      title: 'Live! Casino Hotel Philadelphia',
      description: 'Custom lighting installation for luxury casino and hotel',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10023747/img_projects_vertical_live2-1-1.jpg',
      category: 'Casino',
      fullDescription: 'A comprehensive lighting installation designed and manufactured for the Live! Casino Hotel Philadelphia. This project showcases our expertise in creating custom lighting solutions that enhance the luxurious atmosphere of modern casino and hotel spaces.',
      additionalImages: [
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10023759/img_projects_vertical_live2-2.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10023805/img_projects_vertical_live2-3.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10023816/img_projects_vertical_live2-4.jpg',
        'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10023831/img_projects_vertical_live2-5.jpg'
      ]
    }
  };

  if (!id || !projects[id]) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-3xl font-light mb-6">Project Not Found</h1>
          <Link to="/projects" className="text-amber-500 hover:text-amber-600">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  const project = projects[id];
  const allImages = [project.image, ...(project.additionalImages || [])];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <Link to="/projects" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="mr-2" />
          Back to Projects
        </Link>
        
        <div className="mb-8">
          <span className="text-sm font-medium text-gray-500">{project.category}</span>
          <h1 className="text-3xl font-light mt-2 mb-4">{project.title}</h1>
          <p className="text-gray-600">{project.fullDescription}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {allImages.map((img, index) => (
            <div
              key={index}
              className="aspect-[3/4] overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleImageClick(img, index)}
            >
              <div className="relative w-full h-full">
                <div 
                  className={`absolute inset-0 bg-gray-200 animate-pulse ${
                    loadedImages.has(img) ? 'hidden' : ''
                  }`}
                />
                <img
                  src={img}
                  alt={`Project image ${index + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    selectedImage === img ? 'scale-105' : ''
                  } ${loadedImages.has(img) ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={(e) => handleImageLoad(img, e)}
                />
              </div>
            </div>
          ))}
          
          {project.video && (
            <div
              className="aspect-[3/4] overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity relative"
              onClick={() => setSelectedImage(project.video!.poster)}
            >
              <img
                src={project.video.poster}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
          )}
        </div>

        {selectedImage === project.video?.poster && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
              <video
                ref={videoRef}
                poster={project.video.poster}
                className="w-full"
                controls
                playsInline
              >
                <source src={project.video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {selectedImage && selectedImage !== project.video?.poster && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Blurred background */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px) brightness(0.3)',
                transform: 'scale(1.1)',
              }}
            />

            {/* Navigation buttons */}
            <button
              onClick={handlePrevImage}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={handleNextImage}
              className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="fixed top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main image */}
            <div 
              className="relative z-10 max-h-[90vh] max-w-[90vw]"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Selected project image"
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;