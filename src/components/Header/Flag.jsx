import { ReactComponent as EnFlag } from "../../icons/SVGs/en.svg";
import { ReactComponent as TrFlag } from "../../icons/SVGs/tr.svg"; 
import Cookies from 'universal-cookie';
import { useState } from "react";
import i18n from "i18next";
import { IconButton, SvgIcon } from "@mui/material";

function Flag() {
  const cookies = new Cookies();
  const [language, setLanguage] = useState(cookies?.get("i18next") || "tr");
  
  const handleClick = e => {
    e.preventDefault();
    let res = language === "tr" ? "en" : "tr";
    cookies.set("i18next", res, { path: "/" });
    setLanguage(res);
    i18n.changeLanguage(res);
    document.documentElement.lang = res;
  };

  return (
    <IconButton color="inherit" onClick={handleClick}>
      <SvgIcon
        component={language === "tr" ? TrFlag : EnFlag}
        value={language}
        inheritViewBox
      />
    </IconButton>
  )
}

export default Flag;