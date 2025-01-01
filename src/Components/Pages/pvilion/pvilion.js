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
  const [inView, setInView] = useState([]);
  const photoRefs = useRef([]);
  
  useEffect(() => {
    const handleTouchStart = (event) => {
      const target = event.target.closest(`.${genstyles.photocontainer}`);
      if (target) {
        target.classList.add(genstyles.hover);
      }
    };

    const handleTouchEnd = (event) => {
      const target = event.target.closest(`.${genstyles.photocontainer}`);
      if (target) {
        target.classList.remove(genstyles.hover);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
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
      photolink: "pvilionThumbnails/10-solar-roof-and-facade-building-envelope-study-architecture-for-humanity-boston-pvil-677055fee2ca5.webp",
      text: "SOLAR ROOF AND FACADE BUILDING ENVELOPE - STUDY - ARCHITECTURE FOR HUMANITY - BOSTON ",
    },
    { photolink: "pvilionThumbnails/1.0 SOLAR SHADE MODULES - ARIZONA STATE UNIVERSITY - STUDY.webp", text: "SOLAR SHADE MODULES - ARIZONA STATE UNIVERSITY - STUDY" },
    { photolink: "pvilionThumbnails/1.0 BATTERY PARK UMBRELLAS.jpg", text: "Battery Consevancy - Solar Umbrellas at Seaglass Carousel - 2016" },
    { photolink: "pvilionThumbnails/10-carnegie-hall-rooftop-gala-tent-airbeam-rental-tent-stamford-67705f009644e.webp", text: "CARNEGIE HALL ROOFTOP GALA TENT - AIRBEAM RENTAL TENT - STAMFORD" },
    { photolink: "pvilionThumbnails/10-navy-pier-governors-island-clip-on-fabric-solar-panels-67706052bf234.webp", text: "NAVY PIER GOVERNORS ISLAND - CLIP-ON FABRIC SOLAR PANELS" },
    {
      photolink: "pvilionThumbnails/10-nos-quedamos-community-gardens-modular-rooms-677060664fe5c.webp",
      text: "NOS QUEDAMOS COMMUNITY GARDENS - MODULAR ROOMS",
    },
    {
      photolink: "pvilionThumbnails/1500-flexible-solar-chargers-with-inverters-on-an-aircraft-hanger-roof-67706140e8510.webp",
      text: "FLEXIBLE SOLAR CHARGERS WITH INVERTERS ON AN AIRCRAFT HANGER ROOF",
    },
    { photolink: "pvilionThumbnails/10-fold-up-framed-solar-panel-on-container-in-miami-67706188ea05d.webp", text: "FOLD-UP FRAMED SOLAR PANEL ON CONTAINER IN MIAMI" },
   
    { photolink: "pvilionThumbnails/10-zion-modular-solar-roofs-677061c1874ce.webp", text: " ZION - MODULAR SOLAR ROOFS" },
  
    {
      photolink: "pvilionThumbnails/10-airbeam-rental-tent-design-concept-677061e6605cf.webp",
      text: "AIRBEAM RENTAL TENT DESIGN CONCEPT",
    },
    { photolink: "pvilionThumbnails/10-bridge-tower-facade-lantern-modules-6770620e11328.webp", text: "BRIDGE TOWER FACADE - LANTERN MODULES" },
    { photolink: "pvilionThumbnails/10-miami-beach-bandshell-67706397102f2.webp", text: "MIAMI BEACH BANDSHELL" },
    {
      photolink: "pvilionThumbnails/10-solar-decathlon-techstyle-haus-risd-677063f1caa9b.webp",
      text: "SOLAR DECATHLON - TECHSTYLE-HAUS - RISD",
    },
    {
      photolink: "pvilionThumbnails/10-carol-mcphillips-roberts-field-house-yale-67706425da4cf.webp",
      text: "CAROL MCPHILLIPS ROBERTS FIELD HOUSE - YALE",
    },
    {
      photolink: "pvilionThumbnails/10-hext-hands-off-expeditionary-tent-us-air-force-67706459717db.webp",
      text: "HEXT - HANDS OFF EXPEDITIONARY TENT - US AIR FORCE",
    },
    {
      photolink: "pvilionThumbnails/10-67706498dc7b2.webp",
      text: "COLDPLAY - MUSIC OF THE SPHERES WORLD TOUR -STADIUM CONCERTS - PORTABLE FABRIC SOLAR CHARGER PANELS",
    },
    {
      photolink: "pvilionThumbnails/10-solar-trellis-google-mountainview-ca-67706595053c5.webp",
      text: "SOLAR TRELLIS - GOOGLE - MOUNTAINVIEW, CA",
    },
    { photolink: "pvilionThumbnails/10-high-boys-with-solar-umbrellas-annual-bloomberg-event-randalls-island-nyc-677067c88aa54-67708e3ec8b38.webp", text: " HIGH BOYS WITH SOLAR UMBRELLAS - ANNUAL BLOOMBERG EVENT - RANDALLS ISLAND, NYC" },
    { photolink: "pvilionThumbnails/1.0 QUAD POLE AT TEXAS A&M UNIVERSITY.jpeg", text: "QUAD POLE AT TEXAS A&M UNIVERSITY" },
    {
      photolink: "pvilionThumbnails/1.0 CLIP-ON LIGHT WITH SOLAR CHARGER AND BATTERY.webp",
      text: "CLIP-ON LIGHT WITH SOLAR CHARGER AND BATTERY",
    },
    {
      photolink: "pvilionThumbnails/1.0 CAPITAL CASCADES CROSSING PEDESTRIAN BRIDGE - SOLAR CANOPIES - TALLAHASSEE, FL.webp",
      text: "CAPITAL CASCADES CROSSING PEDESTRIAN BRIDGE - SOLAR CANOPIES - TALLAHASSEE, FL",
    },
    { photolink: "pvilionThumbnails/10-ang-solar-frame-trailer-tent-us-air-force-677069e5714ea.webp", text: "ANG - SOLAR FRAME TRAILER TENT - US AIR FORCE" },
   
    { photolink: "pvilionThumbnails/10-new-york-botanical-garden-quadpoles-solar-powered-canopies-67706a2528290.webp", text: "NEW YORK BOTANICAL GARDEN - QUADPOLES - SOLAR POWERED CANOPIES" },
  
    {
      photolink: "pvilionThumbnails/10-ground-mount-portable-charging-stations-us-airforce-67706ac72b490.webp",
      text: "GROUND MOUNT - PORTABLE CHARGING STATIONS - US AIRFORCE",
    },
    { photolink: "pvilionThumbnails/10-ftf-event-at-brooklyn-navy-yard-67706baa219d3.webp", text: "FTF EVENT AT BROOKLYN NAVY YARD" },
    { photolink: "pvilionThumbnails/10-solar-hypar-on-elliptical-hyperboloid-of-revolution-67706c2018b7b.webp", text: "SOLAR HYPAR ON ELLIPTICAL HYPERBOLOID OF REVOLUTION" },
    {
      photolink: "pvilionThumbnails/10-clip-on-fabric-solar-panels-for-rental-tents-camp-rockaway-67706c5463437.webp",
      text: "CLIP-ON FABRIC SOLAR PANELS FOR RENTAL TENTS - CAMP ROCKAWAY",
    },
    {
      photolink: "pvilionThumbnails/10-retractable-solar-umbrellas-67706cd5f0329.webp",
      text: "RETRACTABLE SOLAR UMBRELLAS",
    },
    {
      photolink: "pvilionThumbnails/10-67706d25d721f.webp",
      text: "SINGLE POLE SOLAR SAIL",
    },
    {
      photolink: "pvilionThumbnails/10-solar-textiles-the-flexible-solution-for-solar-power-67706d431fc72.webp",
      text: "SOLAR TEXTILES - THE FLEXIBLE SOLUTION FOR SOLAR POWER",
    },
    {
      photolink: "pvilionThumbnails/10 Pvilion Solar Sail.webp",
      text: "DOUBLE POLE SOLAR SAIL",
    },

    { photolink: "pvilionThumbnails/10-rental-solar-frame-tent-system-boston-67706e911ca3e.webp", text: "RENTAL SOLAR FRAME TENT SYSTEM - BOSTON" },
    { photolink: "pvilionThumbnails/10-free-standing-charging-stations-67706eacc386d.webp", text: "FREE STANDING CHARGING STATIONS" },
    {
      photolink: "pvilionThumbnails/10-buildings-as-lightweight-self-powering-mass-produced-products-pvil-67706edc84d46.webp",
      text: "BUILDINGS AS LIGHTWEIGHT, SELF-POWERING, MASS PRODUCED PRODUCTS",
    },
    {
      photolink: "pvilionThumbnails/10-solar-sail-free-standing-shade-canopies-67706efd84bb8.webp",
      text: "SOLAR SAIL - FREE-STANDING SHADE CANOPIES",
    },
    { photolink: "pvilionThumbnails/10-skybox-motorized-solar-curtains-mock-up-67706f3e15a30.webp", text: "SKYBOX - MOTORIZED SOLAR CURTAINS - MOCK-UP" },
   
    { photolink: "pvilionThumbnails/10-influencers-67706fd58f46c.webp", text: "Influencers" },
  
    {
      photolink: "pvilionThumbnails/10-solar-fly-for-geodesic-dome-67706ff04d80f.webp",
      text: "SOLAR FLY FOR GEODESIC DOME",
    },
    { photolink: "pvilionThumbnails/10-solar-fly-for-base-camp-tent-6770702470d73.webp", text: "SOLAR FLY FOR  BASE CAMP TENT" },
    { photolink: "pvilionThumbnails/10-solar-fly-for-yurt-rainier-67707044235c4.webp", text: "SOLAR FLY FOR YURT - RAINIER" },
    {
      photolink: "pvilionThumbnails/10-stewart-park-carousel-canopy-ithaca-67707077d4ae5.webp",
      text: "STEWART PARK - CAROUSEL CANOPY - ITHACA",
    },
    {
      photolink: "pvilionThumbnails/10-tommy-hilfiger-solar-jackets-and-solar-clutch-6770709bf05dc.webp",
      text: "TOMMY HILFIGER - SOLAR JACKETS AND SOLAR CLUTCH",
    },
    {
      photolink: "pvilionThumbnails/10-accusteel-clearspan-tent-with-solar-roof-panels-6770a6c35eb01.webp",
      text: "ACCUSTEEL - CLEARSPAN TENT WITH SOLAR ROOF PANELS",
    },
    {
      photolink: "pvilionThumbnails/10-pvilion-logos-677070e17d4b7.webp",
      text: "PVILION LOGOS",
    },
    {
      photolink: "pvilionThumbnails/10-beach-chair-clip-on-fabric-solar-charger-677070f747157.webp",
      text: "BEACH CHAIR - CLIP-ON FABRIC SOLAR CHARGER",
    },
    { photolink: "pvilionThumbnails/10-google-shades-atlanta-grimshaw-6770710e836e6.webp", text: "GOOGLE SHADES - ATLANTA - GRIMSHAW" },
    { photolink: "pvilionThumbnails/10-pflugerville-car-park-charging-station-module-67707159e8e8d.webp", text: "PFLUGERVILLE - CAR PARK CHARGING STATION MODULE" },
    {
      photolink: "pvilionThumbnails/10-kennedy-visitors-center-pavilion-concepts-677071a43627c.webp",
      text: "KENNEDY VISITORS CENTER PAVILION CONCEPTS",
    },
    {
      photolink: "pvilionThumbnails/10-clip-on-fabric-solar-panels-for-rental-tents-677071d31d368.webp",
      text: "CLIP-ON FABRIC SOLAR PANELS FOR RENTAL TENTS",
    },
    { photolink: "pvilionThumbnails/1.0 MULTI-FOLD BATTERY CHARGER.jpg", text: "MULTI-FOLD BATTERY CHARGER" },
   
    { photolink: "pvilionThumbnails/10-5-x-5-fold-up-solar-fabric-cross-frame-charger-677072f3662c3.webp", text: "5' X 5' FOLD-UP SOLAR FABRIC CROSS-FRAME CHARGER" },
  
    {
      photolink: "pvilionThumbnails/1.0 HOME DEPOT - BATTERY CHARGING STATION.webp",
      text: "HOME DEPOT - BATTERY CHARGING STATION",
    },
    { photolink: "pvilionThumbnails/10-us-embassy-london-facade-solar-panels-kieran-timberlake-677073e8dcfb3.webp", text: "US EMBASSY - LONDON - FACADE SOLAR PANELS - KIERAN TIMBERLAKE" },
    { photolink: "pvilionThumbnails/10-single-pitch-expeditionary-tent-system-us-airforce-677074767d227.webp", text: "SINGLE-PITCH EXPEDITIONARY TENT SYSTEM - US AIRFORCE" },
    {
      photolink: "pvilionThumbnails/10-rooftop-reds-winery-rooftop-pavilion-with-clip-on-solar-fabric-panels-brooklyn-navy-yard-6770756a4de34.webp",
      text: "ROOFTOP REDS WINERY - ROOFTOP PAVILION WITH CLIP-ON SOLAR FABRIC PANELS - BROOKLYN NAVY YARD",
    },
    {
      photolink: "pvilionThumbnails/10-stretch-fabric-rental-tent-system-anchor-industries-6770759ff127b.webp",
      text: "STRETCH FABRIC RENTAL TENT SYSTEM - ANCHOR INDUSTRIES",
    },
    {
      photolink: "pvilionThumbnails/10-la-plaza-community-garden-solar-power-and-rainwater-collection-the-bronx-677076061a244.webp",
      text: "LA PLAZA COMMUNITY GARDEN - SOLAR POWER AND RAINWATER COLLECTION - THE BRONX",
    },
    {
      photolink: "pvilionThumbnails/1.0 CROTON RESERVOIR - GRIMSHAW.jpg",
      text: "CROTON RESERVOIR - GRIMSHAW",
    },
    {
      photolink: "pvilionThumbnails/10-fold-up-phone-charger-67707707a7831.webp",
      text: "FOLD-UP PHONE CHARGER",
    },

    
    { photolink: "pvilionThumbnails/1.0 BATTERY PARK OVAL - 100 STANDS - NYC.jpg", text: "BATTERY PARK OVAL - 100 STANDS - NYC" },
    { photolink: "pvilionThumbnails/10-brooklyn-roasters-cart-677077be3a080.webp", text: "BROOKLYN ROASTERS CART" },
    {
      photolink: "pvilionThumbnails/10-duggal-plaza-canopy-brooklyn-navy-yard-677077d314afa.webp",
      text: "DUGGAL PLAZA CANOPY - BROOKLYN NAVY YARD",
    },
    {
      photolink: "pvilionThumbnails/10-solar-charging-light-pole-plugerville-tx-677077fa20b82.webp",
      text: "SOLAR CHARGING LIGHT POLE - PLUGERVILLE, TX",
    },
    
   
    { photolink: "pvilionThumbnails/10-pvilion-brochure-67707fc09cb10.webp", text: "PVILION BROCHURE" },
  
    {
      photolink: "pvilionThumbnails/10-light-pole-solar-collectors-pflugerville-tx-67707fd9bc799.webp",
      text: "LIGHT POLE SOLAR COLLECTORS - PFLUGERVILLE, TX",
    },
    { photolink: "pvilionThumbnails/10-clandestina-pool-cover-osa-peninsula-costa-rica-6770812fcdd54.webp", text: "CLANDESTINA - POOL COVER - OSA PENINSULA - COSTA RICA" },
    { photolink: "pvilionThumbnails/10-museo-de-los-ninos-pavilion-costa-rica-67708158e2faf.webp", text: "MUSEO DE LOS NINOS - PAVILION - COSTA RICA" },
    
    

    

    
  ];

  const LinkList = [
    "pvilionProjects/architectureForHumanity/",
    "pvilionProjects/solarShadeModules/",
    "pvilionProjects/batteryParkUmbrellas/",
    "pvilionProjects/carnegieHallRooftop/",
    "pvilionProjects/navyPierGovernors/",
    "pvilionProjects/nosQuedamos/",
    "pvilionProjects/flexibleSolarCharger/",
    "pvilionProjects/atlanticCouncil/",
    "pvilionProjects/zion/",
    "pvilionProjects/airbeamRentalTent/",
    "pvilionProjects/bridgeTowerFacade/",
    "pvilionProjects/miamiBeachBandshell/",
    "pvilionProjects/solarDecathlon/",
    "pvilionProjects/carolMcPhillips/",
    "pvilionProjects/hext/",
    "pvilionProjects/coldplay/",
    "pvilionProjects/solarTrellis/",
    "pvilionProjects/highBoys/",
    "pvilionProjects/quadPole/",
    "pvilionProjects/clipOnLight/",
    "pvilionProjects/capitalCascades/",
    "pvilionProjects/ANG/",
    "pvilionProjects/nyBotanicalGarden/",
    "pvilionProjects/portableChargingStation/",
    "pvilionProjects/FTF/",
    "pvilionProjects/solarHypar/",
    "pvilionProjects/clipOnPanels/",
    "pvilionProjects/solarUmbrellas/",
    "pvilionProjects/solarSail/",
    "pvilionProjects/solarTextiles/",
    "pvilionProjects/doubleSolarSail/",
    "pvilionProjects/rentalSolarFrame/",
    "pvilionProjects/freeStandingCharging/",
    "pvilionProjects/buildingsAsLightweight/",
    "pvilionProjects/freeStandingCanopy/",
    "pvilionProjects/skybox/",
    "pvilionProjects/influencers/",
    "pvilionProjects/solarFly/",
    "pvilionProjects/solarFlyTent/",
    "pvilionProjects/solarFlyYurt/",
    "pvilionProjects/carouselCanopy/",
    "pvilionProjects/hilfiger/",
    "pvilionProjects/accusteel/",
    "pvilionProjects/logo/",
    "pvilionProjects/beachChair/",
    "pvilionProjects/googleShades/",
    "pvilionProjects/carPark/",
    "pvilionProjects/kennedyVisitors/",
    "pvilionProjects/clipOnStretch/",
    "pvilionProjects/multiFold/",
    "pvilionProjects/foldUpSolar/",
    "pvilionProjects/homeDepot/",
    "pvilionProjects/USEmbassyLondon/",
    "pvilionProjects/singlePitch/",
    "pvilionProjects/rooftopReds/",
    "pvilionProjects/stretchFabricRental/",
    "pvilionProjects/laPlaza/",
    "pvilionProjects/crotonResevoir/",
    "pvilionProjects/foldUpPhoneCharger/",
    "pvilionProjects/batteryParkOval/",
    "pvilionProjects/brooklynRoasters/",
    "pvilionProjects/duggalPlaza/",
    "pvilionProjects/solarLightPole/",
    "pvilionProjects/pvilionBrochure/",
    "pvilionProjects/lightPoleCollectors/",
    "pvilionProjects/clandestina/",
    "pvilionProjects/museoDeLosNinos/",
  
    
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
    photoRefs.current = photoRefs.current.slice(0, photos.length).map((_, i) => photoRefs.current[i] || createRef());

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = photoRefs.current.indexOf(entry.target);
          if (index !== -1) {
            setInView((prev) => {
              const newInView = [...prev];
              newInView[index] = entry.isIntersecting;
              console.log(newInView[index])
              return newInView;
            });
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when 10% of the element is in view
      }
    );

    photoRefs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      photoRefs.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [photos]);

  return (
    <>
      <NavbarEZ text= "PVILION"/>
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
            <div key={index} ref={photoRefs.current[index]} className={genstyles.photocontainer}>
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
                <div className={genstyles.overlay}></div>
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
