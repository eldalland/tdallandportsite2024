import React from "react";
import styles from "../Ezbuilders/Ezbuilders.module.css";
import genstyles from "../genlayout.module.css";
import Navbar from "../../Navbar/Navbar";
import ProjectFooter from "../../ProjectFooter/ProjectFooter";
import { useState, useEffect, useRef } from "react";
import { storage } from "../../Firebase/Firebase";

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

const FTLS = () => {
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
      scrollContainer.current.scrollLeft += e.deltaY;
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
      photolink: "ftlsProjects/ftlsThumbnails/Austin City Limits Canopy.jpg",
      text: "Austin City Limits Canopy",
    },
    { photolink: "ftlsProjects/ftlsThumbnails/013.JPG", text: "Aztec Tents - 10'x10' Solar Rental Tent" },
    { photolink: "ftlsProjects/ftlsThumbnails/10' x 10' Solar Sculpture Tent- Powering Two Amplifiers LR (2).JPG", text: "Boston School" },
    { photolink: "ftlsProjects/ftlsThumbnails/PM.jpg", text: "Classic Tents - 20'x20' Solar Rental Tent" },
    { photolink: "ftlsProjects/ftlsThumbnails/cowboys4.jpg", text: "Dallas Cowboys Solar Tent" },
    {
      photolink: "ftlsProjects/ftlsThumbnails/FTL Solar in Fabric Architecture Magazine - LR_page-0001.jpg",
      text: "Fabric Architecture Magazine Article 1",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/FTL SOLAR - OVERVIEW_page-0001.jpg",
      text: "FTL Solar - Overview",
    },
    { photolink: "ftlsProjects/ftlsThumbnails/JOCOTAS3 LR.JPG", text: "JOCOTAS Charging Sail - US Army - 2010" },
   
    { photolink: "ftlsProjects/ftlsThumbnails/rendering3.jpg", text: "Millenium Park Sound Mix Booth -2008" },
    {
      photolink: "ftlsProjects/ftlsThumbnails/PowerMod 20x20 Single-Pole Power Plant Array.jpeg",
      text: "Portable Power Plant",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/Slide110.JPG",
      text: "PowerFold",
    },
    { photolink: "ftlsProjects/ftlsThumbnails/2008 - POWERMOD.jpg", text: "PowerMod - 2009" },
    { photolink: "ftlsProjects/ftlsThumbnails/PP1 Carpark LR.JPG", text: "PowerPark - 2007" },
    {
      photolink:
        "ftlsProjects/ftlsThumbnails/2012 - SOLAR CHARGING PANEL.jpg",
      text: "Solar Charging Panel - 2012",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/Solar Sail model 2.ashx (4).jpg",
      text: "Solar Sail Model",
    },
    
  ];

  const LinkList = [
    "ftlsProjects/austinCityLimitsCanopy/",
"ftlsProjects/aztecTents10x10SolarRentalTent/",
"ftlsProjects/bostonSchool/",
"ftlsProjects/classicTents20x20SolarRentalTent/",
"ftlsProjects/dallasCowboysSolarTent/",
"ftlsProjects/fabricArchitectureMagazineArticle1/",
"ftlsProjects/ftlSolarOverviewAndLogos/",
"ftlsProjects/jocotasChargingSailUSArmy/",
"ftlsProjects/milleniumParkSoundMixBooth/",
"ftlsProjects/portablePowerPlant/",
"ftlsProjects/powerFold/",
"ftlsProjects/powerMod2009/",
"ftlsProjects/powerPark2007/",
"ftlsProjects/solarChargingPanel/",
"ftlsProjects/solarSailModel/",
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

  const calculateIndex = () => {
    if (scrollModal.current) {
      const index = Math.round(
        scrollModal.current.scrollLeft / scrollModal.current.offsetWidth
      );
      setSlideIndex(index);
    }
  };

  // Add scroll event listener to the scrollModal
  useEffect(() => {
    if (scrollModal.current) {
      scrollModal.current.addEventListener("scroll", calculateIndex);
    }
    return () => {
      if (scrollModal.current) {
        scrollModal.current.removeEventListener("scroll", calculateIndex);
      }
    };
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
      <NavbarEZ text="FTL DESIGN ENGINEERING STUDIO" />
      <div className={isFullScreen ? genstyles.prev : genstyles.hidden}>
        <IoIosArrowBack onClick={() => backSlide()} />
      </div>
      <div className={isFullScreen ? genstyles.next : genstyles.hidden}>
        <IoIosArrowForward onClick={() => slide()} />
      </div>
      <div className={isFullScreen ? genstyles.close : genstyles.hidden}>
        <IoIosCloseCircleOutline onClick={close} />
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
          <div
            index={index}
            className={isFullScreen ? genstyles.modal : genstyles.hidden}
          >
            <img
              ref={imageRefs[index]}
              className={isFullScreen ? genstyles.modalImg : genstyles.hidden}
              src={url}
            ></img>
          </div>
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

export default FTLS;
