"use client";
import React, { createContext, useState } from "react";

export let ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  let [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light"; // default to light
    }
    return "light"; // fallback for SSR
  });
  let toggleTheme = () => {
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
