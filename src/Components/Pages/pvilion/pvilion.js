import React from "react";
import styles from "../Ezbuilders/Ezbuilders.module.css";
import genstyles from "../genlayout.module.css";
import Navbar from "../../Navbar/Navbar";
import ProjectFooter from "../../ProjectFooter/ProjectFooter";
import { useState, useEffect, useRef } from "react";
import { storage } from "../../Firebase/Firebase";
import CloseIcon from "../ftl/CloseIcon.png"
import { useLocation } from "react-router-dom";
import { createRef } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import NavbarEZ from "../../Navbar/NavbarEZ";

const Pvilion = () => {
  const [imageList, setImageList] = useState([]);
  const [isFullScreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const { scrollUrl } = location.state || {};
  const [slideIndex, setSlideIndex] = useState(0);

  const slide = () => {
    slideIndex < numPhotos - 1
      ? scrollModal.current.scrollBy({
          left: scrollModal.current.offsetWidth, // 100% of the div's width
          behavior: "smooth", // Optional, for smooth scrolling
        })
      : (scrollModal.current.scrollLeft = 0 * scrollModal.current.offsetWidth);
  };

  const backSlide = () => {
    slideIndex > 0
      ? scrollModal.current.scrollBy({
          left: -scrollModal.current.offsetWidth, // 100% of the div's width
          behavior: "smooth", // Optional, for smooth scrolling
        })
      : (scrollModal.current.scrollLeft =
          numPhotos * scrollModal.current.offsetWidth);
  };

  const close = () => {
    setIsFullscreen(false);
    setCurrentIndex(0);
    setPphotos([]);
    setSlideIndex(0);
  };
  useEffect(() => {
    console.log(scrollModal.current); // Logs the current value of the ref
  }, []);
  const decrementIndex = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return imageList.length - 1;
      }
    });
  };

  const incrementIndex = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < imageList.length - 1) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  };

  const toggle = () => {
    if (isFullScreen) {
      // Code to enter fullscreen

      // Set it to false after entering fullscreen
      setIsFullscreen(false);
    } else {
      // Code to exit fullscreen

      // Set it to true after exiting fullscreen
      setIsFullscreen(true);
    }
  };

  const [imageRefs, setImageRefs] = useState([]);

  useEffect(() => {
    let imagePromises = thumbnailList.map((path) => {
      const imageRef = ref(storage, path.photolink);
      setImageRefs(getDownloadURL(imageRef));
      return getDownloadURL(imageRef);
    });

    Promise.all(imagePromises)
      .then((urls) => {
        console.log(urls); // Log the URLs
        setPhotos(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const scrollContainer = useRef(null);
  const scrollModal = useRef(null);

  // Function to handle the horizontal scrolling
  const handleWheel = (e) => {
    if (scrollContainer.current) {
      // Scroll horizontally (deltaY gives the amount of pixels to scroll)
      scrollContainer.current.scrollLeft += e.deltaY * 10;
    }
  };

  const handleModalWheel = (e) => {
    if (scrollModal.current) {
      scrollModal.current.scrollLeft += e.deltaY;
    }
  };
  // Add event listener on component mount and clean up on unmount
  useEffect(() => {
    const currentModal = scrollModal.current;
    const currentContainer = scrollContainer.current;
    if (currentContainer) {
      currentContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    if (currentModal) {
      currentModal.addEventListener("wheel", handleModalWheel, {
        passive: false,
      });
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("wheel", handleWheel);
      }
      if (currentModal) {
        currentModal.removeEventListener("wheel", handleModalWheel);
      }
    };
  }, []);

  const thumbnailList = [
    {
      photolink: "pvilionThumbnails/3 copy.jpeg",
      text: "Alta Fold-Up Charger - 2015",
    },
    { photolink: "pvilionThumbnails/The Fair at the Battery.jpg", text: "Battery Conservancy - 96 Stands at Oval - 2016" },
    { photolink: "pvilionThumbnails/PVILION1_1 (1).jpg", text: "Battery Consevancy - Solar Umbrellas at Seaglass Carousel - 2016" },
    { photolink: "pvilionThumbnails/Screenshot (268).png", text: "Brooklyn Roasters - Solar Coffee Cart - 2016" },
    { photolink: "pvilionThumbnails/Slide106.JPG", text: "Carnegie Hall Rooftop Airbeam Event Tent - 2014" },
    {
      photolink: "pvilionThumbnails/Capital Cascades Connector (16).jpg",
      text: "Cascades Canopies - Figg - Tallahassee - 2013",
    },
    {
      photolink: "pvilionThumbnails/Duggal Plaza Canopy - Conoid - Framing.jpg",
      text: "Duggal Plaza Canopy - 2013",
    },
    { photolink: "pvilionThumbnails/Pvilion_Desmond_BlueLR.JPG", text: "Gerald Desmond Bridge - Figg - 2014" },
   
    { photolink: "pvilionThumbnails/Trellis 3.jpg", text: "Google - Solar Trellis - 2014" },
  
    {
      photolink: "pvilionThumbnails/Capture100.JPG",
      text: "Google Office Shades - Atlanta",
    },
    { photolink: "pvilionThumbnails/Google Solar Sail - Carport LR.jpg", text: "Google Solar Sail - Electric Car Charging Station - 2014" },
    { photolink: "pvilionThumbnails/20583D02-D672-432B-84F2-68978F2399D1.jpeg", text: "Lobo Dome - 2018" },
    {
      photolink: "pvilionThumbnails/Vera - Museo-de-los-Ninos-Tent.jpg",
      text: "Museo De Los Ninos - 2014",
    },
    {
      photolink: "pvilionThumbnails/Picture16.png",
      text: "Osa Clandestina Pool Cover -2019",
    },
    {
      photolink: "pvilionThumbnails/IMG_0514 (2).JPG",
      text: "Pflugerville - Electric Car Charging Station - 2011",
    },
    {
      photolink: "pvilionThumbnails/06 (2).jpg",
      text: "Solar Umbrellas - 2017",
    },
    {
      photolink: "pvilionThumbnails/Slide35.JPG",
      text: "Techstyle Haus - 2014",
    },

    

    
  ];

  const LinkList = [
    "pvilionProjects/altaFoldUpChargr2015/",
    "pvilionProjects/batteryConservancy96StandsAtOval2016/",
    "pvilionProjects/batteryConservancySolarUmbrellasAtSeaglassCarousel2016/",
    "pvilionProjects/brooklynRoastersSolarCoffeeCart2016/",
    "pvilionProjects/carnegieHallRooftopAirbeamEventTent2014/",
    "pvilionProjects/cascadesCanopiesFiggTallahassee2013/",
    "pvilionProjects/dugalPlazaCanopy2013/",
    "pvilionProjects/geraldDesmondBridgeFigg2014/",
    "pvilionProjects/googleOfficeShadesAtlanta/",
    "pvilionProjects/googleSolarSailElectricCarChargingStation2014/",
    "pvilionProjects/googleSolarTrellis2014/",
    "pvilionProjects/loboDome2018/",
    "pvilionProjects/museoDeLosNinos2014/",
    "pvilionProjects/osaClandestinaPoolCover2019/",
    "pvilionProjects/pflugervilleElectricCarChargingStation2011/",
    "pvilionProjects/solarUmbrellas2017/",
    "pvilionProjects/techstyleHaus2014/",

    
  ];

  const [currentFolder, setCurrentFolder] = useState(LinkList[0]);
  const [photos, setPhotos] = useState([]);
  const [pphotos, setPphotos] = useState([]);
  const [numPhotos, setNumPhotos] = useState(0);
  const fetchPhotos = async (folder) => {
    const storage = getStorage();
    const imageRefs = await listAll(ref(storage, folder));
    console.log(imageRefs.items.length);
    // Get the number of photos
    setNumPhotos(imageRefs.items.length);
    console.log("Number of photos:", numPhotos);

    const urlPromises = imageRefs.items.map((imageRef) =>
      getDownloadURL(ref(storage, imageRef.fullPath))
    );
    const urls = await Promise.all(urlPromises);
    setPphotos(urls);
  };

  const handleToggle = (index) => {
    setIsFullscreen(true);
    fetchPhotos(LinkList[index]);
  };
  const toggle2 = () => {
    setIsFullscreen(true);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (scrollContainer.current) {
        if (e.key === "ArrowLeft") {
          scrollContainer.scrollLeft -= 50; // Scroll left by 50 pixels
        } else if (e.key === "ArrowRight") {
          scrollContainer.scrollLeft += 50; // Scroll right by 50 pixels
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (scrollModal.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute("data-index"));
              setSlideIndex(index);
            }
          });
        },
        {
          root: scrollModal.current,
          threshold: 0.5,
        }
      );

      const children = scrollModal.current.children;
      for (let i = 0; i < children.length; i++) {
        children[i].setAttribute("data-index", i);
        observer.observe(children[i]);
      }

      return () => observer.disconnect();
    }
  }, [pphotos]);

  useEffect(() => {
    const updateSlideIndex = () => {
      if (scrollModal.current) {
        const containerWidth = scrollModal.current.offsetWidth;
        let totalWidth = 0;
        const images = scrollModal.current.getElementsByTagName("img");
        for (let i = 0; i < images.length; i++) {
          totalWidth += images[i].offsetWidth;
          if (totalWidth >= containerWidth) {
            setSlideIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("resize", updateSlideIndex);

    return () => window.removeEventListener("resize", updateSlideIndex);
  }, []);

  useEffect(() => {
    if (scrollUrl && photos.length > 0) {
      const index = photos.findIndex((url) => url === scrollUrl);
      if (index !== -1) {
        const imageElement = scrollContainer.current.querySelector(
          `img[src="${scrollUrl}"]`
        );
        if (imageElement) {
          const containerWidth = scrollContainer.current.offsetWidth;
          const imageRect = imageElement.getBoundingClientRect();
          const imageWidth = imageRect.width;
          const scrollLeft = imageRect.left - (containerWidth - imageWidth) / 2;
          scrollContainer.current.scrollLeft = scrollLeft;
        }
      }
    }
  }, [scrollUrl, photos]);
  return (
    <>
      <NavbarEZ text="PVILION" />
      <div className={isFullScreen ? genstyles.close : genstyles.hidden}>
        <img src={CloseIcon} style={{width:"40px",}} onClick={close} />
      </div>
      <div className={genstyles.ratio}>
        {" "}
        {slideIndex + 1}/{numPhotos}
      </div>
      <div
        ref={scrollModal}
        className={isFullScreen ? genstyles.modalcontainer : genstyles.hidden}
      >
        {pphotos.map((url, index) => (
          
            <img
              ref={imageRefs[index]}
              className={isFullScreen ? genstyles.modalImg : genstyles.hidden}
              src={url}
            ></img>
         
        ))}
      </div>
      <div ref={scrollContainer} className={genstyles.flexcontainer}>
        <div className={genstyles.flexitemleft}> </div>
        <div className={genstyles.flexitemright}>
          {photos.map((url, index) => (
            <div key={index} className={genstyles.photocontainer}>
              <img
                ref={imageRefs[index]}
                className={genstyles.photo}
                src={url}
                alt={`Image ${index}`}
                onClick={() => {
                  handleToggle(index);
                }}
              />
              {/* Hover overlay with text */}
              <div className={genstyles.overlay}>
                <div className={genstyles.photoverlay}></div>
                <div className={genstyles.overlaytext}>
                  {thumbnailList[index].text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pvilion;
