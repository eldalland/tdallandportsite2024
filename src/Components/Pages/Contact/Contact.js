import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../Navbar/Navbar";
import styles from "./Contact.module.css";

const Contact = () => {
    const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleFocus = () => {
    setIsInputFocused(true);
  };
  const handleBlur = (e) => {
    e.preventDefault();
    inputRef.current.focus();
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formcontainer}>
          <form>
           
            <input
              ref = {inputRef}
              value={inputValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              className={styles.invisinput}
            ></input>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
