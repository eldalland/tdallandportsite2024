import React from "react";
import styles from "../Homepage/Homepage.module.css";
import { useState, useEffect, useRef } from "react";
import { storage } from "../Firebase/Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useCustomNavigate } from "./useCustomNavigate";

const Homepage = () => {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "ezbuilders/");
  const navigate = useNavigate();

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
      });
    });
  }, []);

  const [imageList2, setImageList2] = useState([]);
  const imageListRef2 = ref(storage, "ftl/");
  useEffect(() => {
    listAll(imageListRef2).then((response) => {
      const urlPromises = response.items.map((item) => {
        return getDownloadURL(item).then((url) => [url]); // Wraps the URL in an array
      });

      Promise.all(urlPromises).then((urlArrays) => {
        // Sort the array of URL arrays
        const sortedUrlArrays = urlArrays.sort((a, b) =>
          a[0].localeCompare(b[0])
        );
        setImageList2(sortedUrlArrays); // Sets the image list to a sorted array of arrays
      });
    });
  }, []);

  const [imageList3, setImageList3] = useState([]);
  const imageListRef3 = ref(storage, "ftld/");
  useEffect(() => {
    listAll(imageListRef3).then((response) => {
      const urlPromises = response.items.map((item) => {
        return getDownloadURL(item).then((url) => [url]); // Wraps the URL in an array
      });

      Promise.all(urlPromises).then((urlArrays) => {
        // Sort the array of URL arrays
        const sortedUrlArrays = urlArrays.sort((a, b) =>
          a[0].localeCompare(b[0])
        );
        setImageList3(sortedUrlArrays); // Sets the image list to a sorted array of arrays
      });
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

  const [imageList5, setImageList5] = useState([]);
  const imageListRef5 = ref(storage, "ftls/");
  useEffect(() => {
    listAll(imageListRef5).then((response) => {
      const urlPromises = response.items.map((item) => {
        return getDownloadURL(item).then((url) => [url]); // Wraps the URL in an array
      });

      Promise.all(urlPromises).then((urlArrays) => {
        // Sort the array of URL arrays
        const sortedUrlArrays = urlArrays.sort((a, b) =>
          a[0].localeCompare(b[0])
        );
        setImageList5(sortedUrlArrays); // Sets the image list to a sorted array of arrays
      });
    });
  }, []);

  const [imageList6, setImageList6] = useState([]);
  const imageListRef6 = ref(storage, "pvilion/");
  useEffect(() => {
    listAll(imageListRef6).then((response) => {
      const urlPromises = response.items.map((item) => {
        return getDownloadURL(item).then((url) => [url]); // Wraps the URL in an array
      });

      Promise.all(urlPromises).then((urlArrays) => {
        // Sort the array of URL arrays
        const sortedUrlArrays = urlArrays.sort((a, b) =>
          a[0].localeCompare(b[0])
        );
        setImageList6(sortedUrlArrays); // Sets the image list to a sorted array of arrays
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

  const [currentIndex, setCurrentIndex] = useState(null);

  const setIndex = (url, link,List) => {
    const index = List.findIndex((imageUrl) => imageUrl[0] === url);
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
                      onClick={() => setIndex(url[0], "/ezbuilders", imageList)}
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
                      onClick={() => setIndex(url[0], "/ftl", imageList2)}
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
                  1982 - Nic Goldsmith, Denis Hector, Ross Dalland, Todd Dalland
                </div>
                <div className={styles.company}>FTL DESIGN ENGINEERING</div>
              </div>
              <div className={styles.photobox}>
              {imageList3.map((url, index) => {
                  return (
                    <img
                      key={index} // It's important to provide a unique key for each item in a list
                      className={styles.photo}
                      onClick={() => setIndex(url[0], "/ftld", imageList3)}
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
                      onClick={() => setIndex(url[0], "/ftls", imageList5)}
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
                      onClick={() => setIndex(url[0], "/pvilion", imageList6)}
                      src={url[0]}
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
