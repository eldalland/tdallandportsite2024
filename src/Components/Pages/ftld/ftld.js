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

const FTLD = () => {
  const [imageList, setImageList] = useState([]);
  const [isFullScreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const { scrollUrl } = location.state || {};
  const [slideIndex, setSlideIndex] = useState(0);



    const [navbarText, setNavbarText] = useState("FTL DESIGN ENGINEERING STUDIO");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600 || window.innerHeight <= 500) {
        setNavbarText("FTL D&E STUDIO");
      } else {
        setNavbarText("FTL DESIGN ENGINEERING STUDIO");
      }
    };

    // Initial check
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      photolink: "ftldThumbnails/10-676711f174710.webp",
      text: "SUNAR HAUSERMAN - SHOWROOM",
    },
    {
      photolink: "ftldThumbnails/10-67671206e637c.webp",
      text: "MONTAGE MOUNTAIN CONCERT PAVILION",
    },
    {
      photolink: "ftldThumbnails/10-6767122774bb3.webp",
      text: "PHOENIX LIBRARY",
    },

    {
      photolink: "ftldThumbnails/1-676712729e2b3.webp",
      text: "PIER 6 CONCERT PAVILION 2 - BALTIMORE",
    },
    {
      photolink: "ftldThumbnails/10-676712986877c.webp",
      text: "SCHENLEY PLAZA PVILION - PITTSBURGH",
    },
    {
      photolink: "ftldThumbnails/10-676712b651f7a.webp",
      text: "STATEN ISLAND ESPLANADE BUS SHELTER",
    },
    {
      photolink: "ftldThumbnails/10-676712cfad6ae.webp",
      text: "TEMPER TENT SOLAR FLY - US ARMY",
    },

    { photolink: "ftldThumbnails/10-676712ed4e93d.webp", text: "CAVALIA VOLTIGE CIRCUS TENT" },
    {
      photolink: "ftldThumbnails/10-67671307e0197.webp",
      text: "ARBEE HEADQUARTERS CANOPY",
    },
    {
      photolink: "ftldThumbnails/10-676715e94afe6.webp",
      text: "CHARLOTTESVILLE AMPHITHEATER",
    },
    {
      photolink: "ftldThumbnails/1-67671622a366a.webp",
      text: "GUGENHEIM - MOBILES - DRAKAR NOIR EVENT",
    },
    { photolink: "ftldThumbnails/10-harley-davidson-travelling-exhibition-6767164be4789.webp", text: "HARLEY DAVIDSON TRAVELLING EXHIBITION" },
    {
      photolink: "ftldThumbnails/10-metropolitan-opera-ny-philarmonic-travelling-concert-pvilion-67671664483e4.webp",
      text: "METROPOLITAN OPERA & NY PHILARMONIC TRAVELLING CONCERT PAVILION",
    },
    {
      photolink: "ftldThumbnails/10-lanmas-modular-airbeam-tent-us-army-6767167ec3768.webp",
      text: "LANMAS - MODULAR AIRBEAM TENT - US ARMY",
    },
    {
      photolink: "ftldThumbnails/10-powershade-us-army-6767169bac01e.webp",
      text: "POWERSHADE TENT - US ARMY",
    },
    {
      photolink: "ftldThumbnails/10-santiago-stadium-roof-concept-chile-676716e2320de.webp",
      text: "SANTIAGO STADIUM ROOF CONCEPT - CHILE",
    },
    { photolink: "ftldThumbnails/10-zofri-mall-iquique-chile-676717020f89d.webp", text: "ZOFRI MALL - IQUIQUE, CHILE" },
    {
      photolink: "ftldThumbnails/10-worldwide-disaster-relief-tents-6767171c7c51a.webp",
      text: "WORLDWIDE - DISASTER RELIEF TENTS",
    },
    {
      photolink: "ftldThumbnails/10-ringling-bros-barnum-bailey-circus-tent-6767173a86157.webp",
      text: "RINGLING BROS BARNUM & BAILEY - CIRCUS TENT CONCEPT",
    },
    {
      photolink: "ftldThumbnails/10-really-fast-buildings-heitsch-gallery-munich-676717671ac3e.webp",
      text: "REALLY FAST BUILDINGS - PRINTS - HEITSCH ART GALLERY - MUNICH",
    },
    {
      photolink: "ftldThumbnails/10-konarka-fold-up-battery-charger-6767177da27a8.webp",
      text: "KONARKA - FOLD-UP BATTERY CHARGER",
    },
    {
      photolink: "ftldThumbnails/10-bandshell-rental-tent-concepts-john-lee-676717dc0e931.webp",
      text: "BANDSHELL RENTAL TENT CONCEPTS - JOHN LEE",
    },
    {
      photolink: "ftldThumbnails/10-jeddah-hotel-courtyard-roof-concept-676718719058e.webp",
      text: "JEDDAH HOTEL COURTYARD ROOF CONCEPT",
    },
    {
      photolink: "ftldThumbnails/10-fold-up-camping-tent-prototype-hoberman-676718896c588.webp",
      text: "FOLD-UP CAMPING TENT PROTOTYPE - HOBERMAN",
    },
    {
      photolink: "ftldThumbnails/10-deployable-classroom-nyc-school-construction-authority-676718c15e90a.webp",
      text: "DEPLOYABLE CLASSROOM - NYC SCHOOL CONSTRUCTION AUTHORITY",
    },
    {
      photolink: "ftldThumbnails/10-darien-lake-concert-pavilion-buffalo-ny-676719001874a.webp",
      text: "DARIEN LAKE CONCERT PAVILION - BUFFALO, NY",
    },
    {
      photolink: "ftldThumbnails/10-catskill-corners-pvilion-ny-6767191d6f61e.webp",
      text: "CATSKILL CORNERS PVILION - PHOENICIA, NY",
    },
    {
      photolink: "ftldThumbnails/10-millenium-park-pavilion-sound-mix-station-chicago-6767193ae1085.webp",
      text: "MILLENIUM PARK PAVILION - SOUND MIX STATION - CHICAGO",
    },
    {
      photolink: "ftldThumbnails/10-rental-tent-systems-concepts-aztec-6767195c9a2cd.webp",
      text: "RENTAL TENT SYSTEMS CONCEPTS - AZTEC",
    },
    {
      photolink: "ftldThumbnails/10-powerfold-2000-fold-up-battery-charger-6767197b73a7f.webp",
      text: "POWERFOLD 2000 - FOLD-UP BATTERY CHARGER",
    },
    {
      photolink: "ftldThumbnails/10-powerfold-10-fold-up-battery-charger-676719944f15a.webp",
      text: "POWERFOLD 10 - FOLD-UP BATTERY CHARGER",
    },
    {
      photolink: "ftldThumbnails/10-national-symphony-orchestra-concert-shell-2-west-lawn-of-the-capitol-676719afcbd37.webp",
      text: "NATIONAL SYMPHONY ORCHESTRA CONCERT SHELL 2 - WEST LAWN OF THE CAPITOL",
    },
    { photolink: "ftldThumbnails/10-the-sea-bird-aviary-at-the-bronx-zoo-676719dad45cd.webp", text: "THE SEA BIRD AVIARY AT THE BRONX ZOO" },
    {
      photolink: "ftldThumbnails/10-airbeam-rental-tent-concept-anchor-industries-676719f3dee73.webp",
      text: "AIRBEAM RENTAL TENT CONCEPT - ANCHOR INDUSTRIES",
    },
    {
      photolink: "ftldThumbnails/10-harvard-exibition-shelter-to-spend-a-night-in-the-city-67671a0e1b20c.webp",
      text: "HARVARD EXHIBITION - SHELTER TO SPEND A NIGHT IN THE CITY",
    },
    {
      photolink: "ftldThumbnails/10-cirque-de-soleil-canopy-disneyworld-fl-67671a276b0ff.webp",
      text: "CIRQUE DE SOLEIL CANOPY - DISNEYWORLD - FL",
    },
    {
      photolink: "ftldThumbnails/10-ftl-design-engineering-studio-brochures-67671a3de6a7d.webp",
      text: "FTL DESIGN ENGINEERING STUDIO - BROCHURES",
    },
    {
      photolink: "ftldThumbnails/400-mesa-ftlde-67671a6a8a0d7.webp",
      text: "MESA",
    },
    {
      photolink: "ftldThumbnails/10-teaching-tensile-strutures-67671a8006e38.webp",
      text: "TEACHING TENSILE STRUCTURES",
    },
    
  ];

  const LinkList = [
    "ftldProjects/sunarHauserman/",
    "ftldProjects/montageMountain/",
    "ftldProjects/phoenixLibrary/",
    "ftldProjects/pier6ConcertPavilion/",
    "ftldProjects/schenleyPlaza/",
    "ftldProjects/statenIslandEsplanade/",
    "ftldProjects/temperTent/",
    "ftldProjects/cavaliaCircus/",
    "ftldProjects/arbeeHQ/",
    "ftldProjects/charlottesvilleAmphitheater/",
    "ftldProjects/gugenheimMobiles/",
    "ftldProjects/harleyDavidson/",
    "ftldProjects/metropolitanOpera/",
    "ftldProjects/lanmas/",
    "ftldProjects/powershade/",
    "ftldProjects/santiagoStadium/",
    "ftldProjects/zofriMall/",
    "ftldProjects/worldWideDisasterReliefTents/",
    "ftldProjects/ringlingBrosBarnumAndBaileyCircusTent/",
    "ftldProjects/reallyFastBuildings/",
    "ftldProjects/konarkaFoldUpCharger/",
    "ftldProjects/bandshellRentalTent/",
    "ftldProjects/jeddahHotel/",
    "ftldProjects/foldUpCampingTent/",
    "ftldProjects/deployableClassroom/",
    "ftldProjects/darienLakeConcertPavilion/",
    "ftldProjects/catskillConersPavilions/",
    "ftldProjects/milleniumParkPavilion/",
    "ftldProjects/aztecRentalTents/",
    "ftldProjects/powerfold2000/",
    "ftldProjects/powerfold10/",
    "ftldProjects/nationalSymphony/",
    "ftldProjects/bronxZoo/",
    "ftldProjects/airbeamRentalTent/",
    "ftldProjects/harvardExhibition/",
    "ftldProjects/cirqueDeSoleil/",
    "ftldProjects/ftlBrochure/",
    "ftldProjects/mesa/",
    "ftldProjects/teachingTensileStructures/",
 
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
      <NavbarEZ text={navbarText} />
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
    </>
  );
};

export default FTLD;
