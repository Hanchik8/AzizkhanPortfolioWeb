import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const target = document.getElementById(targetId);

      if (target) {
        const headerOffset = 88;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, left: 0, behavior: "smooth" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
