import React from "react";
import styles from "../Homepage/Homepage.module.css";
import { useState, useEffect, useRef } from "react";
import { storage } from "../Firebase/Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useCustomNavigate } from "./useCustomNavigate";

const Homepage = () => {

  const thumbnailList = [
    
    {
      photolink: "ezbuildersThumbnails/BeachTent.webp",
      text: "Beach Tent - Jones Beach",
    },
    { photolink: "ezbuildersThumbnails/DeepPurple.webp", text: "Deep Purple Concert Bandshell - Schoellkopf Field" },
    { photolink: "ezbuildersThumbnails/HumpTent.webp", text: "Hump Tent - Arts Quad" },
    { photolink: "ezbuildersThumbnails/HyparIthaca.webp", text: "Hypar - Ithaca" },
    { photolink: "ezbuildersThumbnails/Inflatable.webp", text: "Inflatable - Arts Quad" },
    {
      photolink: "ezbuildersThumbnails/Sphere.webp",
      text: "Inflated Spheres - Wantagh",
    },
    {
      photolink: "ezbuildersThumbnails/Radial.webp",
      text: "Radial Wave Tent - Spifing Arts Festival - Arts Quad",
    },
    { photolink: "ezbuildersThumbnails/Thesis.webp", text: "Cutting Pattern Program and Physical Models" },
   
    { photolink: "ezbuildersThumbnails/Umass.webp", text: "UMass" },
  
    { photolink: "ezbuildersThumbnails/2.0 Hypar - Frei Otto.webp", text: "" },

    
  ];


  const navigate = useNavigate();

  const [imageRefs, setImageRefs] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    let imagePromises = thumbnailList.map((path) => {
      const imageRef = ref(storage, path.photolink);
      setImageRefs(getDownloadURL(imageRef));
      return getDownloadURL(imageRef);
    });
    Promise.all(imagePromises)
      .then((urls) => {
        console.log(urls); // Log the URLs
        setImageList(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const thumbnailList2 = [
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

  const [imageRefs2, setImageRefs2] = useState([]);
  const [imageList2, setImageList2] = useState([]);

  useEffect(() => {
    let imagePromises = thumbnailList2.map((path) => {
      const imageRef = ref(storage, path.photolink);
      setImageRefs2(getDownloadURL(imageRef));
      return getDownloadURL(imageRef);
    });
    Promise.all(imagePromises)
      .then((urls) => {
        console.log(urls); // Log the URLs
        setImageList2(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const thumbnailList3 = [
    {
      photolink: "ftldThumbnails/FTL - Airbeam Class Tent.jpg",
      text: "Airbeam Rental Tent",
    },
    {
      photolink: "ftldThumbnails/020000x.jpg",
      text: "Anchor New Clearspan Tent",
    },
    {
      photolink: "ftldThumbnails/AT & T_b.jpg",
      text: "Atlanta Olympics - 1996",
    },
    { photolink: "ftldThumbnails/054.JPG", text: "Aztec Rental Tents" },
    {
      photolink: "ftldThumbnails/Baby Dome09.jpg",
      text: "Baby Dome Millennium",
    },
    {
      photolink: "ftldThumbnails/445.jpg",
      text: "Baltimore Aquarium Entrance Pavilion",
    },
    {
      photolink: "ftldThumbnails/151879-10280169.jpg",
      text: "Bard College Entrance Pavilion",
    },
    {
      photolink: "ftldThumbnails/Untitled-1.jpg",
      text: "Beijing Olympic Kiosk",
    },

    { photolink: "ftldThumbnails/822.jpg", text: "BIiederman Event" },
    {
      photolink: "ftldThumbnails/boston_internal_even.jpg",
      text: "Boston Harbourlights Concert Pavilion",
    },
    {
      photolink: "ftldThumbnails/Slide29.JPG",
      text: "Cancun Mall",
    },
    {
      photolink: "ftldThumbnails/Catskill Corners.jpg",
      text: "Catskill Corners Pavilions",
    },
    { photolink: "ftldThumbnails/100-0023_IMG-1.JPG", text: "Cavaglia Circus" },
    {
      photolink: "ftldThumbnails/ChinaGrill_nice.jpg",
      text: "China Grill Lighting",
    },
    {
      photolink: "ftldThumbnails/Picture10.jpg",
      text: "Cirque de Soleil - Walt Disney World - 1998",
    },
    {
      photolink: "ftldThumbnails/Darien-Lakes-4-900x550.jpg",
      text: "Darien Lake Concert Pvilion",
    },
    {
      photolink: "ftldThumbnails/Picture 9 Dep class.JPG",
      text: "Deployable Classroom",
    },
    { photolink: "ftldThumbnails/RedCabina_Render.jpg", text: "Eco Cabina" },
    {
      photolink: "ftldThumbnails/FinnishChancery1.jpg",
      text: "Finnish Chancery",
    },
    {
      photolink: "ftldThumbnails/IMG_0150.jpg",
      text: "Fold-up Camping Tent",
    },
    {
      photolink: "ftldThumbnails/FTL_Brochure_page-0001.jpg",
      text: "FTL Design Engineering Studio - Brochure",
    },
    {
      photolink: "ftldThumbnails/costa rica 02.jpg",
      text: "Holcim Headquarters - Costs Rica",
    },
    {
      photolink: "ftldThumbnails/Hotel_Inter1.jpg",
      text: "Hotel Intercontinental Interior",
    },
    {
      photolink: "ftldThumbnails/Copy of Jeddah1.jpg",
      text: "Jeddah Hotel",
    },
    {
      photolink: "ftldThumbnails/MVC-003X (2).JPG",
      text: "John Lee Bandshell",
    },
    {
      photolink: "ftldThumbnails/White Charger 1.JPG",
      text: "Konarka Fold-Up Charger",
    },
    {
      photolink: "ftldThumbnails/Lincos pic3.jpg",
      text: "LINCOS",
    },
    {
      photolink: "ftldThumbnails/Picture10.jpg",
      text: "NASA - Lunar Habitation",
    },
    {
      photolink: "ftldThumbnails/NASArotated.jpg",
      text: "NASA - Transhab Shuttle Airlock",
    },
    {
      photolink: "ftldThumbnails/interior small.jpg",
      text: "Pier Six Concert Pavilion - 1980",
    },
    {
      photolink: "ftldThumbnails/Early_Skyscraper.JPG",
      text: "Portable Skyscraper 1",
    },
    {
      photolink: "ftldThumbnails/Slide63.JPG",
      text: "Portable Skyscraper 2",
    },
    {
      photolink: "ftldThumbnails/Slide64.JPG",
      text: "PowerShade",
    },
    { photolink: "ftldThumbnails/ftl06.jpg", text: "Really Fast Buildings" },
    {
      photolink: "ftldThumbnails/unnamed (3).jpg",
      text: "Ringling Bros. Barnum and Bailey Circus Tent",
    },
    {
      photolink: "ftldThumbnails/FTL3.JPEG",
      text: "Santiago Stadium",
    },
    {
      photolink: "ftldThumbnails/CCF06272013_0000.jpg",
      text: "Skybox Solar Curtains",
    },
    {
      photolink: "ftldThumbnails/arch9 copy.jpg",
      text: "Tentnology Clearspan Tent - 2003",
    },
    {
      photolink: "ftldThumbnails/60iso_solid.jpg",
      text: "Tentnology Poleadion Tent -2003",
    },
    {
      photolink: "ftldThumbnails/Under the Sun1.JPG",
      text: "Under the Sun Exhibition - Cooper Hewitt Museum - 1996",
    },
    {
      photolink: "ftldThumbnails/Picture253.jpg",
      text: "Woodstock Pavilion",
    },
    {
      photolink:
        "ftldThumbnails/Worldwide Shelter - Full Scale Prototype - photo.JPG",
      text: "Worldwide Disaster Relief Tents",
    },
    {
      photolink: "ftldThumbnails/churchst closeup copy.jpg",
      text: "WTC - Urban Icons",
    },
    { photolink: "ftldThumbnails/chile.jpg", text: "Zofri Mall - Iquique" },
  ];
  const [imageRefs3, setImageRefs3] = useState([]);
  const [imageList3, setImageList3] = useState([]);

  useEffect(() => {
    let imagePromises = thumbnailList3.map((path) => {
      const imageRef = ref(storage, path.photolink);
      setImageRefs3(getDownloadURL(imageRef));
      return getDownloadURL(imageRef);
    });
    Promise.all(imagePromises)
      .then((urls) => {
        console.log(urls); // Log the URLs
        setImageList3(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [imageList4, setImageList4] = useState([]);
  const imageListRef4 = ref(storage, "ftlh/");
  useEffect(() => {
    listAll(imageListRef4).then((response) => {
      const urlPromises = response.items.map((item) => {
        return getDownloadURL(item).then((url) => [url]); // Wraps the URL in an array
      });

      Promise.all(urlPromises).then((urlArrays) => {
        // Sort the array of URL arrays
        const sortedUrlArrays = urlArrays.sort((a, b) =>
          a[0].localeCompare(b[0])
        );
        setImageList4(sortedUrlArrays); // Sets the image list to a sorted array of arrays
      });
    });
  }, []);
  const thumbnailList5 = [
    {
      photolink: "ftlsProjects/ftlsThumbnails/Austin City Limits Canopy.jpg",
      text: "Austin City Limits Canopy",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/013.JPG",
      text: "Aztec Tents - 10'x10' Solar Rental Tent",
    },
    {
      photolink:
        "ftlsProjects/ftlsThumbnails/10' x 10' Solar Sculpture Tent- Powering Two Amplifiers LR (2).JPG",
      text: "Boston School",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/PM.jpg",
      text: "Classic Tents - 20'x20' Solar Rental Tent",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/cowboys4.jpg",
      text: "Dallas Cowboys Solar Tent",
    },
    {
      photolink:
        "ftlsProjects/ftlsThumbnails/FTL Solar in Fabric Architecture Magazine - LR_page-0001.jpg",
      text: "Fabric Architecture Magazine Article 1",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/FTL SOLAR - OVERVIEW_page-0001.jpg",
      text: "FTL Solar - logos",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/JOCOTAS3 LR.JPG",
      text: "JOCOTAS Charging Sail - US Army - 2010",
    },

    {
      photolink: "ftlsProjects/ftlsThumbnails/rendering3.jpg",
      text: "Millenium Park Sound Mix Booth -2008",
    },
    {
      photolink:
        "ftlsProjects/ftlsThumbnails/PowerMod 20x20 Single-Pole Power Plant Array.jpeg",
      text: "Portable Power Plant",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/Slide110.JPG",
      text: "PowerFold",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/2008 - POWERMOD.jpg",
      text: "PowerMod - 2009",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/PP1 Carpark LR.JPG",
      text: "PowerPark - 2007",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/2012 - SOLAR CHARGING PANEL.jpg",
      text: "Solar Charging Panel - 2012",
    },
    {
      photolink: "ftlsProjects/ftlsThumbnails/Solar Sail model 2.ashx (4).jpg",
      text: "Solar Sail Model",
    },
  ];

  const [imageRefs5, setImageRefs5] = useState([]);
  const [imageList5, setImageList5] = useState([]);

  useEffect(() => {
    let imagePromises = thumbnailList5.map((path) => {
      const imageRef = ref(storage, path.photolink);
      setImageRefs5(getDownloadURL(imageRef));
      return getDownloadURL(imageRef);
    });
    Promise.all(imagePromises)
      .then((urls) => {
        console.log(urls); // Log the URLs
        setImageList5(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const thumbnailList6 = [
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
  const [imageRefs6, setImageRefs6] = useState([]);
  const [imageList6, setImageList6] = useState([]);

  useEffect(() => {
    let imagePromises = thumbnailList6.map((path) => {
      const imageRef = ref(storage, path.photolink);
      setImageRefs6(getDownloadURL(imageRef));
      return getDownloadURL(imageRef);
    });
    Promise.all(imagePromises)
      .then((urls) => {
        console.log(urls); // Log the URLs
        setImageList6(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const scrollContainer = useRef(null);

  // Function to handle the horizontal scrolling
  const handleWheel = (e) => {
    if (scrollContainer.current) {
      // Prevent vertical scrolling
      e.preventDefault();
      // Scroll horizontally instead (deltaY gives the amount of pixels to scroll)
      scrollContainer.current.scrollLeft += e.deltaY;
    }
  };

  // Add event listener on component mount and clean up on unmount
  useEffect(() => {
    const currentContainer = scrollContainer.current;
    if (currentContainer) {
      currentContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(null);

  const setIndex = (url, link, List) => {
    const index = List.findIndex((imageUrl) => imageUrl === url);
    if (index !== -1) {
      // Navigate to the project page with the clicked image URL as state
      navigate(link, { state: { scrollUrl: url } });
    }
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

  // Inside your component

  return (
    <>
      <Navbar />

      <div className={styles.flexcontainer} ref={scrollContainer}>
        <div className={styles.contentbox}>
          <div className={styles.flexitemleft}></div>
          <div className={styles.flexitemright}>
            <div className={styles.project}>
              <div className={styles.titlebox}>
                <div className={styles.names}>
                  1971 - Denis Hector, Nic Goldsmith, Todd Dalland
                </div>
                <div className={styles.company}>E-Z BUILDERS</div>
              </div>
              <div className={styles.photobox}>
                {imageList.map((url, index) => {
                  return (
                    <img
                      key={index} // It's important to provide a unique key for each item in a list
                      className={styles.photo}
                      onClick={() => setIndex(url, "/ezbuilders", imageList)}
                      src={url}
                      alt={`Image ${index}`} // Always provide an alt attribute for accessibility
                    />
                  );
                })}
              </div>
            </div>

            <div className={styles.project}>
              <div className={styles.titlebox}>
                <div className={styles.names}>
                  1977 - Ross Dalland, Ray Gill, Nic Goldsmith, Denis Hector,
                  Todd Dalland
                </div>
                <div className={styles.company}>FUTURE TENTS LTD</div>
              </div>
              <div className={styles.photobox}>
                {imageList2.map((url, index) => {
                  return (
                    <img
                      key={index} // It's important to provide a unique key for each item in a list
                      className={styles.photo}
                      onClick={() => setIndex(url, "/ftl", imageList2)}
                      src={url}
                      alt={`Image ${index}`} // Always provide an alt attribute for accessibility
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.project}>
              <div className={styles.titlebox}>
                <div className={styles.names}>
                  1982 - Nic Goldsmith, Todd Dalland
                </div>
                <div className={styles.company}>FTL DESIGN ENGINEERING STUDIO</div>
              </div>
              <div className={styles.photobox}>
                {imageList3.map((url, index) => {
                  return (
                    <img
                      key={index} // It's important to provide a unique key for each item in a list
                      className={styles.photo}
                      onClick={() => setIndex(url, "/ftld", imageList3)}
                      src={url}
                      alt={`Image ${index}`} // Always provide an alt attribute for accessibility
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.project}>
              <div className={styles.titlebox}>
                <div className={styles.names}>
                  1992 - Nic Goldsmith, Ted Happold, Ian Liddell, Eddie Pugh,
                  Todd Dalland
                </div>
                <div className={styles.company}>FTL HAPPOLD</div>
              </div>
              <div className={styles.photobox}>
                {imageList4.map((url, index) => {
                  return (
                    <img
                      key={index} // It's important to provide a unique key for each item in a list
                      className={styles.photo}
                      onClick={() => setIndex(url[0], "/ftlh", imageList4)}
                      src={url[0]}
                      alt={`Image ${index}`} // Always provide an alt attribute for accessibility
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.project}>
              <div className={styles.titlebox}>
                <div className={styles.names}>
                  2006 - Robert Lerner, Tony Saxton, Todd Dalland
                </div>
                <div className={styles.company}>FTL SOLAR</div>
              </div>
              <div className={styles.photobox}>
                {imageList5.map((url, index) => {
                  return (
                    <img
                      key={index} // It's important to provide a unique key for each item in a list
                      className={styles.photo}
                      onClick={() => setIndex(url, "/ftls", imageList5)}
                      src={url}
                      alt={`Image ${index}`} // Always provide an alt attribute for accessibility
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.project}>
              <div className={styles.titlebox}>
                <div className={styles.names}>
                  2011 - Robert Lerner, Colin Touhey, Todd Dalland
                </div>
                <div className={styles.company}>PVILION</div>
              </div>
              <div className={styles.photobox}>
                {imageList6.map((url, index) => {
                  return (
                    <img
                      key={index} // It's important to provide a unique key for each item in a list
                      className={styles.photo}
                      onClick={() => setIndex(url, "/pvilion", imageList6)}
                      src={url}
                      alt={`Image ${index}`} // Always provide an alt attribute for accessibility
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
