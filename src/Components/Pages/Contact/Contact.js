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
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.form.submit();
    }
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
          <form
            action="https://formsubmit.co/36ed2173551bd958471631763d25322c"
            method="POST"
          >
            <textarea
              type="text"
              name="Message"
              required
              rows="10"
              maxLength={520}
              ref={inputRef}
              value={inputValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={styles.invisinput}
              placeholder="Type your message here"
            ></textarea>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
