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
      photolink: "ftlThumbnails/Picture26.png",
      text: "7th on Sixth Fashion Village",
    },
    { photolink: "ftlThumbnails/Slide79.JPG", text: "Anchor Bandshell" },
    { photolink: "ftlThumbnails/circus.jpg", text: "Anchor Modules" },
    { photolink: "ftlThumbnails/Picture_0129.jpg", text: "Arbee Canopy " },
    { photolink: "ftlThumbnails/Slide85Clipped.JPG", text: " Armbruster Tent" },
    {
      photolink: "ftlThumbnails/Slide12Cropped.JPG",
      text: " Bloomberg Headquarters",
    },
    {
      photolink: "ftlThumbnails/Slide96.JPG",
      text: "Bronx Zoo Aviary - 1996 ",
    },
    { photolink: "ftlThumbnails/Picture14.jpg", text: "Camp Wayne Pavilion" },
    {
      photolink: "ftlThumbnails/Picture23.jpg",
      text: "Canada's Wonderland Amphitheater",
    },
    { photolink: "ftlThumbnails/1010-800x400.jpg", text: "Century Tents " },
    {
      photolink: "ftlThumbnails/Slide11.JPG",
      text: " Charlottesville Amphitheater",
    },
    {
      photolink: "ftlThumbnails/FTL - EUREKA CAMPING TENT.jpg",
      text: "Eureka Camping Tents",
    },
    { photolink: "ftlThumbnails/Capri_2.JPG", text: "Eureka Capri Tents " },
    { photolink: "ftlThumbnails/Slide80.JPG", text: "Eureka Genesis Tents" },
    {
      photolink:
        "ftlThumbnails/4150ad619dbf4c20d7897a858687caddI77lbbzx0ZJ3dDKn-0.jpeg",
      text: "Ftl Brochure - 2005",
    },
    {
      photolink: "ftlThumbnails/Omni_Guggenheim_1.jpg",
      text: "Guggenheim Museum Mobiles",
    },
    {
      photolink: "ftlThumbnails/Harley Ext1.JPG",
      text: "Harley Davidson Traveling Pavilion",
    },
    {
      photolink: "ftlThumbnails/Jacksonville4.jpg",
      text: "Jacksonville Concert Pavilion",
    },
    { photolink: "ftlThumbnails/Slide31.JPG", text: "Kuwait Amphitheater" },
    { photolink: "ftlThumbnails/Airtube1.JPG", text: "LANMAS Airbeam Tent" },
    {
      photolink: "ftlThumbnails/Slide93.JPG",
      text: "MetPhil Travelling Stage",
    },
    { photolink: "ftlThumbnails/slide0088_image022.jpg", text: "MGPTS Tent" },
    {
      photolink: "ftlThumbnails/Montage-Mountain-Amplitheatre-2-900x550.jpg",
      text: "Montage Mountain Amphitheater",
    },
    { photolink: "ftlThumbnails/111.jpg", text: "New York Aquarium" },
    {
      photolink: "ftlThumbnails/Picture16.jpg",
      text: "Norwalk In-Water Boat Show Tents",
    },
    {
      photolink: "ftlThumbnails/Picture20.jpg",
      text: "NSO Bandshell at the Capitol - 1",
    },
    {
      photolink:
        "ftlThumbnails/National Symphony Orchestra Bandshell, The Capital, Washington , DC.JPG",
      text: "NSO Bandshell at the Capitol - 2",
    },
    {
      photolink: "ftlThumbnails/PHOENIX LIBRARY.jpg",
      text: "Phoenix Library Facade Shading - 1992",
    },
    {
      photolink: "ftlThumbnails/PierSix4.jpg",
      text: "Pier 6 Concert Pavilion",
    },
    {
      photolink: "ftlThumbnails/Procter_2.jpg",
      text: "Proctor and Gamble Pavilion",
    },
    {
      photolink: "ftlThumbnails/Ecclipse 120 Ft 1.JPG",
      text: "Remsberg Eclipse Tents",
    },
    {
      photolink: "ftlThumbnails/PDR_0300.JPG",
      text: "Schenley Plaza - Pittsburgh",
    },
    {
      photolink: "ftlThumbnails/Sopers 100 Ft 2.jpg",
      text: "Soper's 100' Tent",
    },
    {
      photolink: "ftlThumbnails/Picture12.jpg",
      text: "St. Michael's Montessori Net",
    },
    { photolink: "ftlThumbnails/121.jpg", text: "Staten Island Esplanade" },
    { photolink: "ftlThumbnails/Picture1.jpg", text: "Sunar Hauserman" },
    {
      photolink: "ftlThumbnails/Slide100.JPG",
      text: "Syracuse Mall with David Architects",
    },
    {
      photolink: "ftlThumbnails/pv solar fly for Temper Tent (FTL) 2.png",
      text: "Temper Tent Solar Fly",
    },
    {
      photolink: "ftlThumbnails/TimeforPeace_3.jpg",
      text: "Time for Peace - Travelling Museum",
    },
    { photolink: "ftlThumbnails/tmeint.jpeg", text: "TME Airbeam Tent" },
    {
      photolink: "ftlThumbnails/100-0023_IMG.JPG",
      text: "Voltige Circus Tent",
    },
    {
      photolink: "ftlThumbnails/Picture18.jpg",
      text: "White House Ellipse Tents",
    },
    { photolink: "ftlThumbnails/Slide7.JPG", text: "WTC Winter Garden" },
  ];

  const LinkList = [
    "ftlProjects/7thOnSixth/",
    "ftlProjects/anchorBandshell/",
    "ftlProjects/anchorModules/",
    "ftlProjects/arbeeCanopy/",
    "ftlProjects/armbrusterTent/",
    "ftlProjects/bloombergHQ/",
    "ftlProjects/bronxZooAviary/",
    "ftlProjects/campWaynePavilion/",
    "ftlProjects/canadasWonderlandAmphitheater/",
    "ftlProjects/centuryTents/",
    "ftlProjects/charlottesvilleAmphitheater/",
    "ftlProjects/eurekaCampingTents/",
    "ftlProjects/eurekaCapriTents/",
    "ftlProjects/eurekaGenesisTents/",
    "ftlProjects/ftlBrochure/",
    "ftlProjects/guggenheimMuseumMobiles/",
    "ftlProjects/harleydavidsonTravelingPavilion/",
    "ftlProjects/jacksonvilleConcertPavilion/",
    "ftlProjects/kuwaitAmphitheater/",
    "ftlProjects/lanmasAirbeamTent/",
    "ftlProjects/metPhilTravelingStage/",
    "ftlProjects/mgptsTent/",
    "ftlProjects/montageMountainAmphitheater/",
    "ftlProjects/newYorkAquarium/",
    "ftlProjects/norwalkInWaterBoatShowTents/",
    "ftlProjects/nsoBandshellAtTheCapitol1/",
    "ftlProjects/nsoBandshellAtTheCapitol2/",
    "ftlProjects/phoenixLibraryFacadeShading/",
    "ftlProjects/pier6ConcertPavilion/",
    "ftlProjects/proctorAndGamblePavilion/",
    "ftlProjects/remsbergEclipseTents/",
    "ftlProjects/schenleyPlazaPittsburgh/",
    "ftlProjects/sopers100Tent/",
    "ftlProjects/stMichaelsMontessoriNet/",
    "ftlProjects/statenIslandEsplanade/",
    "ftlProjects/sunarHauserman/",
    "ftlProjects/syracuseMallWithDavidArchitects/",
    "ftlProjects/temperTentSolarFly/",
    "ftlProjects/timeForPeaceTravelingMuseum/",
    "ftlProjects/tmeAirbeamTent/",
    "ftlProjects/voltigeCircusTent/",
    "ftlProjects/whiteHouseEllipseTents/",
    "ftlProjects/wtcWinterGarden/",
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
  return (
    <>
      <NavbarEZ text="FUTURE TENTS LIMITED" />
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

export default FTL;
