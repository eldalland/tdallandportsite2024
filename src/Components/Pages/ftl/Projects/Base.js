import React from "react";
import styles from "../../Ezbuilders/Ezbuilders.module.css"
import genstyles from "../../genlayout.module.css";


import { useState, useEffect, useRef } from "react";
import { storage } from "../../../Firebase/Firebase";
import { useLocation } from "react-router-dom";
import { createRef } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const Base = ({path}) => {

    const [imageList, setImageList] = useState([]);
    const [isFullScreen, setIsFullscreen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const location = useLocation();
    const { scrollUrl } = location.state || {};


    const setIndex = (url) => {
        // Set the current index
        const index = imageList.findIndex((imageUrl) => imageUrl === url);
        console.log("imageList:", imageList);
        console.log("index:", index);
      
        console.log("currentIndex:", currentIndex);
        setIsFullscreen(true);
        setTimeout(() => {
          setCurrentIndex(index);
          // Scroll to the modal with the matching index
          if (scrollModal.current) {
            scrollModal.current.scrollLeft = index * scrollModal.current.offsetWidth;
           
            console.log("New currentIndex:", currentIndex);
          }
        }, 0);
      };
      
      const slide = (index) => {
        setCurrentIndex(index + 1 < imageList.length ? index + 1 : 0);
        console.log(currentIndex);
        scrollModal.current.scrollLeft = currentIndex * scrollModal.current.offsetWidth; 
      }
      
      const backSlide = (index) => {
        setCurrentIndex(index > 0 ? index - 1 : imageList.length - 1);
        console.log(currentIndex);
        scrollModal.current.scrollLeft = currentIndex * scrollModal.current.offsetWidth; 
      }
      
      const close = ()=>{
        setIsFullscreen(false);
        setCurrentIndex(0);
      
      }
      useEffect(() => {
        console.log(scrollModal.current); // Logs the current value of the ref
      }, []);

      const imageListRef = ref(storage, path);
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
      const scrollModal = useRef(null);
    
      // Function to handle the horizontal scrolling
      const handleWheel = (e) => {
        if(scrollContainer.current){
          // Scroll horizontally (deltaY gives the amount of pixels to scroll)
          scrollContainer.current.scrollLeft += e.deltaY;
        }
    
        if(scrollModal.current){
          scrollModal.current.scrollLeft += e.deltaY;
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
    <div className={isFullScreen ? genstyles.prev : genstyles.hidden}>
      <IoIosArrowBack onClick={() => backSlide(currentIndex)} />
    </div>
    <div className={isFullScreen ? genstyles.next : genstyles.hidden}>
      <IoIosArrowForward onClick={() => slide(currentIndex)} />
    </div>
    <div className={isFullScreen ? genstyles.close : genstyles.hidden}>
      <IoIosCloseCircleOutline onClick={close} />
    </div>
    <div className={genstyles.ratio}>
      {" "}
      {currentIndex + 1}/{imageList.length}
    </div>
    <div
      ref={scrollModal}
      className={isFullScreen ? genstyles.modalcontainer : genstyles.hidden}
    >
      {imageList.map((url, index) => (
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
  </>
);
};
export default Base;
