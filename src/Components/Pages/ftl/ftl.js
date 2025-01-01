import React from "react";
import styles from "../Ezbuilders/Ezbuilders.module.css";
import genstyles from "../genlayout.module.css";
import Navbar from "../../Navbar/Navbar";
import ProjectFooter from "../../ProjectFooter/ProjectFooter";
import { useState, useEffect, useRef } from "react";
import { storage } from "../../Firebase/Firebase";

import { useLocation } from "react-router-dom";
import { createRef } from "react";
import CloseIcon from "../ftl/CloseIcon.png"
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

const FTL = () => {
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
    : (scrollModal.current.scrollLeft = numPhotos * scrollModal.current.offsetWidth);
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
    if (scrollContainer.current ) {
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
      photolink: "ftlThumbnails/1.0 CARMELO POMODORO SHOWROOM - INTERIOR - NYC.webp",
      text: "CARMELO POMODORO SHOWROOM - INTERIOR - NYC"
    },
    { 
      photolink: "ftlThumbnails/1.0 NORWALK IN-WATER BOAT SHOW.webp",
      text: "NORWALK IN-WATER BOAT SHOW"
    },
    { 
      photolink: "ftlThumbnails/1.0 NATIONAL SYMPHONY ORCHESTRA CONCERT SHELL 1 - WEST LAWN OF THE CAPITOL.webp",
      text: "NATIONAL SYMPHONY ORCHESTRA CONCERT SHELL 1 - WEST LAWN OF THE CAPITOL"
    },
    { 
      photolink: "ftlThumbnails/1.0 PROCTOR & GAMBLE PAVILION - SAWYER POINT, CINCINNATI.webp",
      text: "PROCTOR & GAMBLE PAVILION - SAWYER POINT, CINCINNATI"
    },
    { 
      photolink: "ftlThumbnails/1.0 REMSBERG ECLIPSE TENT - RENTAL TENT SYSTEM.webp",
      text: "REMSBERG ECLIPSE TENT - RENTAL TENT SYSTEM"
    },
    {
      photolink: "ftlThumbnails/1.0 SOPER'S 100 TENT - RENTAL TENT SYSTEM.webp",
      text: "SOPER'S 100 TENT - RENTAL TENT SYSTEM"
    },
    {
      photolink: "ftlThumbnails/1.0 ST. MICHAEL'S MONTESSORI SCHOOL PLAYGROUND NET.webp",
      text: "ST. MICHAEL'S MONTESSORI SCHOOL PLAYGROUND NET"
    },
    { 
      photolink: "ftlThumbnails/1.0 TIME FOR PEACE PVILION - DEPLOYABLE TRAVELLING MUSEUM CONCEPT.webp",
      text: "TIME FOR PEACE PVILION - DEPLOYABLE TRAVELLING MUSEUM CONCEPT"
    },
    {
      photolink: "ftlThumbnails/1.0 TME - DEPLOYABLE AIRBEAM TENT - US ARMY.webp",
      text: "TME - DEPLOYABLE AIRBEAM TENT - US ARMY"
    },
    { 
      photolink: "ftlThumbnails/1.0 WHITE HOUSE - GRANDSTAND TENTS AT THE ELLIPSE.webp",
      text: "WHITE HOUSE - GRANDSTAND TENTS AT THE ELLIPSE"
    },
    {
      photolink: "ftlThumbnails/1.0 ARMBRUSTER TENSION TENT - RENTAL TENT SYSTEM.webp",
      text: "ARMBRUSTER TENSION TENT - RENTAL TENT SYSTEM"
    },
    {
      photolink: "ftlThumbnails/1.0 CAMP WAYNE GYMNASTICS PAVILION.webp",
      text: "CAMP WAYNE GYMNASTICS PAVILION"
    },
    { 
      photolink: "ftlThumbnails/1.0 CANADA'S WONDERLAND - DOLPHIN SHOW PAVILION.webp",
      text: "CANADA'S WONDERLAND - DOLPHIN SHOW PAVILION"
    },
    { 
      photolink: "ftlThumbnails/1.0 ANCHOR CENTURY TENT - RENTAL TENT SYSTEM.webp",
      text: "ANCHOR CENTURY TENT - RENTAL TENT SYSTEM"
    },
    {
      photolink: "ftlThumbnails/1.0 EUREKA! CAPRI TENT - RENTAL TENT SYSTEM.webp",
      text: "EUREKA! CAPRI TENT - RENTAL TENT SYSTEM"
    },
    {
      photolink: "ftlThumbnails/1.0 TENTNOLOGY - RENTAL TENT SYSTEM CONCEPT.webp",
      text: "TENTNOLOGY - RENTAL TENT SYSTEM CONCEPT"
    },
    {
      photolink: "ftlThumbnails/1.0 TENTNOLOGY - RENTAL CLEARSPAN  TENT CONCEPT.webp",
      text: "TENTNOLOGY - RENTAL CLEARSPAN  TENT CONCEPT"
    },
    {
      photolink: "ftlThumbnails/1.0 HOTEL INTERCONTINENTAL - INTERIOR SAILS.webp",
      text: "HOTEL INTERCONTINENTAL - INTERIOR SAILS"
    },
    { 
      photolink: "ftlThumbnails/1.0 HOLCIM HEADQUARTERS - SAN JOSE, COSTA RICA.webp",
      text: "HOLCIM HEADQUARTERS - SAN JOSE, COSTA RICA"
    },
    { 
      photolink: "ftlThumbnails/1.0 FINNISH CHANCERY - WASHINGTON DC.webp",
      text: "FINNISH CHANCERY - WASHINGTON DC"
    },
    {
      photolink: "ftlThumbnails/1.0 BIEDERMAN TENT EVENT - INTERIOR - NYC.webp",
      text: "BIEDERMAN TENT EVENT - INTERIOR - NYC"
    },
    { 
      photolink: "ftlThumbnails/1.0 BEIJING OLYMPICS MODULAR KIOSK TENT.webp",
      text: "BEIJING OLYMPICS MODULAR KIOSK TENT"
    },
    {
      photolink: "ftlThumbnails/1.0 BARD COLLEGE ENTRANCE PVILION.webp",
      text: "BARD COLLEGE ENTRANCE PVILION"
    },
    { 
      photolink: "ftlThumbnails/1.0 BALTIMORE AQUARIUM ENTRANCE PAVILION.webp",
      text: "BALTIMORE AQUARIUM ENTRANCE PAVILION"
    },
    {
      photolink: "ftlThumbnails/1.0 CHINA GRILL CEILING LIGHTING - INTERIOR - NYC.webp",
      text: "CHINA GRILL CEILING LIGHTING - INTERIOR - NYC"
    },
    {
      photolink: "ftlThumbnails/1.0 PIER 6 CONCERT PAVILION 1 - BALTIMORE.webp",
      text: "PIER 6 CONCERT PAVILION 1 - BALTIMORE"
    },
    {
      photolink: "ftlThumbnails/1.0 INFLUENCERS.webp",
      text: "INFLUENCERS"
    },
    {
      photolink: "ftlThumbnails/1.0 EUREKA! DENALI CAMPING TENT.webp",
      text: "EUREKA! DENALI CAMPING TENT"
    },
    {
      photolink: "ftlThumbnails/1.0 ANCHOR BANDSHELL - RENTAL TENT.webp",
      text: "ANCHOR BANDSHELL - RENTAL TENT"
    },
    {
      photolink: "ftlThumbnails/1.0 ANCHOR MODULES - RENTAL TENT SYSTEM.webp",
      text: "ANCHOR MODULES - RENTAL TENT SYSTEM"
    },
    {
      photolink: "ftlThumbnails/1.0 EUREKA! GENESIS TENT - RENTAL TENT SYSTEM.webp",
      text: "EUREKA! GENESIS TENT - RENTAL TENT SYSTEM"
    },
    {
      photolink: "ftlThumbnails/1.0 CORNER PLATES - RENTAL TENT SYSTEM.webp",
      text: "CORNER PLATES - RENTAL TENT SYSTEM"
    },
    {
      photolink: "ftlThumbnails/1.0 FLORIDA NATIONAL PAVILION - JACKSONVILLE.webp",
      text: "FLORIDA NATIONAL PAVILION - JACKSONVILLE"
    },
    {
      photolink: "ftlThumbnails/1.0 NEW YORK AQUARIUM - DOLPHIN SEA LION PVILION.webp",
      text: "NEW YORK AQUARIUM - DOLPHIN SEA LION PAVILION"
    },
    { 
      photolink: "ftlThumbnails/1.0 WORLD TRADE CENTER - WINTER GARDEN - INTERIOR.webp",
      text: "WORLD TRADE CENTER - WINTER GARDEN - INTERIOR"
    },
    { 
      photolink: "ftlThumbnails/1.0 WORLD FINANCIAL CENTER - FERRY TERMINAL.webp",
      text: "WORLD FINANCIAL CENTER - FERRY TERMINAL"
    },
    {
      photolink: "ftlThumbnails/1.0 SEVENTH ON 6TH FASHION WEEK - BRYANT PARK, NYC.webp",
      text: "SEVENTH ON 6TH FASHION WEEK - BRYANT PARK, NYC"
    }
  ];

  const LinkList = [
    "ftlProjects/pomodoro/",
    "ftlProjects/norwalkInWaterBoatShowTents/",
    "ftlProjects/nationalSymphony/",
    "ftlProjects/proctorAndGamblePavilion/",
    "ftlProjects/remsbergEclipseTents/",
    "ftlProjects/sopers100Tent/",
    "ftlProjects/stMichaelsMontessoriNet/",
    "ftlProjects/timeForPeacePavilion/",
    "ftlProjects/timeDeployableAirbeamTent/",
    "ftlProjects/whiteHouseGrandstand/",
    "ftlProjects/armbrusterTent/",
    "ftlProjects/campWaynePavilion/",
    "ftlProjects/canadasWonderlandAmphitheater/",
    "ftlProjects/anchorCenturyTent/",
    "ftlProjects/eurekaCapriTents/",
    "ftlProjects/tentologySystem/",
    "ftlProjects/tentologyClearspan/",
    "ftlProjects/hotelIntercontinental/",
    "ftlProjects/holcim/",
    "ftlProjects/finnishChancery/",
    "ftlProjects/biederman/",
    "ftlProjects/beijingOlympics/",
    "ftlProjects/bardCollege/",
    "ftlProjects/baltimoreAquarium/",
    "ftlProjects/chinaGrill/",
    "ftlProjects/pier6ConcertPavilion/",
    "ftlProjects/influencers/",
    "ftlProjects/eurekaCampingTents/",
    "ftlProjects/anchorBandshell/",
    "ftlProjects/anchorModules/",
    "ftlProjects/eurekaGenesisTents/",
    "ftlProjects/cornerPlates/",
    "ftlProjects/floridaNational/",
    "ftlProjects/newYorkAquarium/",
    "ftlProjects/wtcWinterGarden/",
    "ftlProjects/ferryTerminal/",
    "ftlProjects/seventhOnSixth/",
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
    if (scrollUrl && photos.length > 0) {
      const index = photos.findIndex((url) => url === scrollUrl);
      if (index !== -1) {
        const imageElement = scrollContainer.current.querySelector(`img[src="${scrollUrl}"]`);
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


  return (
    <>
    <div className={genstyles.box}>
      <NavbarEZ text="FUTURE TENTS LIMITED" />
      
      <div className={isFullScreen ? genstyles.close : genstyles.hidden}>
        <img src={CloseIcon} style={{width:"40px",}} onClick={close} />
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
      </div>
    </>
  );
};

export default FTL;
