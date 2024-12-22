import React from "react";
import styles from "../Homepage/Homepage.module.css";
import { useState, useEffect, useRef } from "react";
import { storage } from "../Firebase/Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useCustomNavigate } from "./useCustomNavigate";

const Homepage = () => {
  useEffect(() => {
    const ftld = document.getElementById("ftld");
    const handleResize = () => {
      const namesDivs = document.querySelectorAll(`.${styles.names}`);
      const originalContent = ['1971 - Denis Hector, Nic Goldsmith, Todd Dalland',
        '1977 - Ross Dalland, Ray Gill, Nic Goldsmith, Denis Hector, Todd Dalland',
        '1982 - Nic Goldsmith, Todd Dalland',
        '1992 - Nic Goldsmith, Ted Happold, Ian Liddell, Eddie Pugh, Todd Dalland',
        '2006 - Robert Lerner, Tony Saxton, Todd Dalland',
        '2011 - Robert Lerner, Colin Touhey, Todd Dalland'];
      const shortenedContent = ['1971 - Denis Hector, \n Nic Goldsmith, Todd Dalland',
        '1977 - Ross Dalland, Ray Gill, Nic Goldsmith, Denis Hector, Todd Dalland',
        '1982 - Nic Goldsmith, Todd Dalland',
        '1992 - Nic Goldsmith, \rTed Happold, Ian Liddell, Eddie Pugh,Todd Dalland',
        '2006 - Robert Lerner, \nTony Saxton, Todd Dalland',
        '2011 - Robert Lerner, \nColin Touhey, Todd Dalland'
        ];
        if (window.matchMedia('(max-width: 600px)').matches) {
          namesDivs.forEach((div, index) => {
            div.classList.add(styles.preLineText);
            div.textContent = shortenedContent[index];
          });
          if (ftld) ftld.textContent = 'FTL DES ENG STUDIO';
        } else {
          namesDivs.forEach((div, index) => {
            div.classList.remove(styles.preLineText);
            div.textContent = originalContent[index];
          });
          if (ftld) ftld.textContent = 'FTL DESIGN ENGINEERING STUDIO';
        }
      };

    // Initial check
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
  
    { photolink: "ezbuildersThumbnails/1.0 INFLUENCERS 1955 - HYPAR - FREI OTTO.webp", text: "" },

    
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
      text: "NEW YORK AQUARIUM - DOLPHIN SEA LION PVILION"
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
      text: "HARVARD EXIBITION - SHELTER TO SPEND A NIGHT IN THE CITY",
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

  const thumbnailList4 = [
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

  const [imageRefs4, setImageRefs4] = useState([]);
  const [imageList4, setImageList4] = useState([]);

  useEffect(() => {
    let imagePromises = thumbnailList4.map((path) => {
      const imageRef = ref(storage, path.photolink);
      setImageRefs4(getDownloadURL(imageRef));
      return getDownloadURL(imageRef);
    });
    Promise.all(imagePromises)
      .then((urls) => {
        console.log(urls); // Log the URLs
        setImageList4(urls);
      })
      .catch((error) => {
        console.log(error);
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
  /* useEffect(() => {
    const namesElements = document.querySelectorAll(`.${styles.names}`);

   const handleMouseOver = (e) => {
      const hiddenDiv = e.currentTarget.querySelector(`.${styles.hidden}`);
      if (hiddenDiv) {
        hiddenDiv.classList.remove(styles.hidden);
        hiddenDiv.classList.add(styles.collaborators);
      }
    };

    const handleMouseOut = (e) => {
      const hiddenDiv = e.currentTarget.querySelector(`.${styles.collaborators}`);
      if (hiddenDiv) {
        hiddenDiv.classList.remove(styles.collaborators);
        hiddenDiv.classList.add(styles.hidden);
      }
    };

    namesElements.forEach((namesElement) => {
      namesElement.addEventListener("mouseover", handleMouseOver);
      namesElement.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      namesElements.forEach((namesElement) => {
        namesElement.removeEventListener("mouseover", handleMouseOver);
        namesElement.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);
  */
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
                <div className={styles.names}onClick={() => navigate("/collaboratorsez")} >
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
                <div className={styles.names}onClick={() => navigate("/collaboratorsftl")}>
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
                <div className={styles.names}onClick={() => navigate("/collaboratorsftl")}>
                  1982 - Nic Goldsmith, Todd Dalland
                </div>
                <div id='ftld'className={styles.company}>FTL DESIGN ENGINEERING STUDIO</div>
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
                <div className={styles.names}onClick={() => navigate("/collaboratorsftl")}>
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
                      onClick={() => setIndex(url, "/ftlh", imageList4)}
                      src={url}
                      alt={`Image ${index}`} // Always provide an alt attribute for accessibility
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.project}>
              <div className={styles.titlebox}>
                <div className={styles.names}onClick={() => navigate("/collaboratorssolar")}>
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
                <div className={styles.names}onClick={() => navigate("/collaboratorspvilion")}>
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
