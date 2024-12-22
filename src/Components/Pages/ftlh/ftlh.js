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
const FTLH = () => {
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
      photolink: "ftlhThumbnails/10-mgpts-tent-modular-general-purpose-tent-system-us-army-67671c7c5d73d.webp",
      text: "MGPTS TENT - MODULAR GENERAL PURPOSE TENT SYSTEM - US ARMY",
    },
    {
      photolink: "ftlhThumbnails/10-world-trade-center-site-urban-icons-concepts-67671d12e0766.webp",
      text: "WORLD TRADE CENTER SITE - URBAN ICONS - CONCEPTS",
    },
    {
      photolink: "ftlhThumbnails/10-under-the-sun-pvilion-cooper-hewitt-museum-nyc-67671d33f1337.webp",
      text: "UNDER THE SUN PVILION - COOPER HEWITT MUSEUM - NYC",
    },
    {
      photolink: "ftlhThumbnails/10-portable-skyscraper-concept-1-1992-67671d4b0db1d.webp",
      text: "PORTABLE SKYSCRAPER - CONCEPT 1 - 1992",
    },
    {
      photolink: "ftlhThumbnails/10-nasa-space-shuttle-advanced-inflatable-airlock-room-honeywell-67671d7266655.webp",
      text: "NASA SPACE SHUTTLE - ADVANCED INFLATABLE AIRLOCK ROOM - HONEYWELL",
    },
    {
      photolink: "ftlhThumbnails/1.0 INFLATABLE LUNAR HABITAT - HONEYWELL.webp",
      text: "INFLATABLE LUNAR HABITAT - HONEYWELL",
    },
    {
      photolink: "ftlhThumbnails/1.0 ECO-CABINA - CONCEPT 1 - COSTA RICA.webp",
      text: "ECO-CABINA - CONCEPT 1 - COSTA RICA",
    },
    { 
      photolink: "ftlhThumbnails/10-100-eco-cabina-concept-2-ftlh-67671fe0888bd.webp", 
      text: "ECO-CABINA - CONCEPT 2" 
    },
    {
      photolink: "ftlhThumbnails/10-eco-cabina-concept-3-bill-moss-67671ff4cfa47.webp",
      text: "ECO-CABINA - CONCEPT 3 - BILL MOSS",
    },
    {
      photolink: "ftlhThumbnails/40-676720158c510.webp",
      text: "ECO-CABINA - CONCEPT 4",
    },
    {
      photolink: "ftlhThumbnails/10-67672028cbb39.webp",
      text: "BOSTON HARBOURLIGHTS CONCERT PAVILION",
    },
    { 
      photolink: "ftlhThumbnails/10-baby-dome-millenium-celebration-london-67672071b3138.webp", 
      text: "BABY DOME - MILLENIUM CELEBRATION - LONDON" 
    },
    {
      photolink: "ftlhThumbnails/1.0-frame.webp",
      text: "FRAME SUPPORT - POLE SUPPORT RENTAL TENT SYSTEM - CONCEPT - ANCHOR INDUSTRIES",
    },
    {
      photolink: "ftlhThumbnails/10-atlanta-olympics-att-global-olympic-village-676720bcebc7e.webp",
      text: "ATLANTA OLYMPICS - AT&T GLOBAL OLYMPIC VILLAGE",
    },
    {
      photolink: "ftlhThumbnails/10-cancun-mall-676720d4c53b0.webp",
      text: "CANCUN MALL",
    },
    {
      photolink: "ftlhThumbnails/10-portable-skyscraper-concept-2-676720e9aa70d.webp",
      text: "PORTABLE SKYSCRAPER - CONCEPT 2 - 2004",
    },
    { 
      photolink: "ftlhThumbnails/1.0 THE MUSIC PAVILION COMPANY.webp", 
      text: "THE MUSIC PAVILION COMPANY" 
    },
    {
      photolink: "ftlhThumbnails/destiny-usa-mall-roof-concpet-rockwell-architects-6767222a03bc0.webp",
      text: "DESTINY USA - MALL ROOF CONCPET - ROCKWELL ARCHITECTS",
    },
    {
      photolink: "ftlhThumbnails/10-mahaffey-solar-frame-tent-67672242bafb9.webp",
      text: "SOLAR RENTAL FRAME TENT - MAHAFFEY TENT",
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
      <NavbarEZ text="FTL HAPPOLD" />
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
export default FTLH;
