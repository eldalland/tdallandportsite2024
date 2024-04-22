import React from "react";
import styles from "../Ezbuilders/Ezbuilders.module.css"
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
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import NavbarEZ from "../../Navbar/NavbarEZ";

const Pvilion = () => {
  const [imageList, setImageList] = useState([]);
  const [isFullScreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const location = useLocation();
  const { scrollUrl } = location.state || {};

  const setIndex = (e) => {
    // Find the index of the array that contains the URL
    const index = imageList.findIndex(
      (urlArray) => urlArray[0] === e.target.src
    );
    setCurrentIndex(index);
    toggle();
  };

  const decrementIndex = () => {
    // Ensure the index stays within bounds
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (currentIndex == 0) {
      setCurrentIndex(imageList.length - 1);
    }
  };

  const incrementIndex = () => {
    // Ensure the index stays within bounds
    if (currentIndex < imageList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex == imageList.length - 1) {
      setCurrentIndex(0);
    }
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

  const imageListRef2 = ref(storage, "pvilion/");
  useEffect(() => {
    listAll(imageListRef2).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const imageListRef = ref(storage, "pvilion/");
  const [imageRefs, setImageRefs] = useState([]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      const urlPromises = response.items.map((item) => {
        return getDownloadURL(item).then((url) => [url]); // Wraps the URL in an array
      });

      Promise.all(urlPromises).then((urlArrays) => {
        // Sort the array of URL arrays
        const sortedUrlArrays = urlArrays.sort((a, b) =>
          a[0].localeCompare(b[0])
        );
        setImageList(sortedUrlArrays); // Sets the image list to a sorted array of arrays
        // Create a ref for each image
        setImageRefs((refs) =>
          Array(sortedUrlArrays.length)
            .fill()
            .map((_, i) => refs[i] || createRef())
        );
      });
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

  useEffect(() => {
    console.log(currentIndex); // This will log the updated value of currentIndex
  }, [currentIndex]);

  useEffect(() => {
    if (scrollUrl) {
      // Find the index of the clicked image URL in the image list
      const index = imageList.findIndex(
        (urlArray) => urlArray[0] === scrollUrl
      );
      if (index !== -1 && imageRefs[index].current) {
        // Scroll to the clicked image
        imageRefs[index].current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [scrollUrl, imageList, imageRefs]);

  const TextList = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m"
  ];

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
  return (
    <>
      <NavbarEZ text = "PVILION"/>
      <div className={isFullScreen ? genstyles.modal : ""}>
        <img
          className={isFullScreen ? genstyles.modalImg : genstyles.hidden}
          src={imageList[currentIndex]}
        ></img>
        <div className={isFullScreen ? genstyles.prev : genstyles.hidden}>
          <IoIosArrowBack onClick={decrementIndex} />
        </div>
        <div className={isFullScreen ? genstyles.next : genstyles.hidden}>
          <IoIosArrowForward onClick={incrementIndex} />
        </div>
        <div className={isFullScreen ? genstyles.close : genstyles.hidden}>
          <IoIosCloseCircleOutline onClick={toggle} />
        </div>
      </div>
      <div ref={scrollContainer} className={genstyles.flexcontainer}>
        <div className={genstyles.flexitemleft}> </div>
        <div className={genstyles.flexitemright}>
          {imageList.map((url, index) => (
            <div key={index} className={genstyles.photocontainer}>
              <img
                ref={imageRefs[index]}
                className={genstyles.photo}
                src={url}
                onClick={setIndex}
                alt={`Image ${index}`}
              />
              {/* Hover overlay with text */}
              <div className={genstyles.overlay}>
                <div className={genstyles.photoverlay}></div>
                <div className={genstyles.overlaytext}>{TextList[index]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pvilion;
