
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Flag from "./Flag";
import GithubButton from "./GithubButton";

export default function Header() {
  const { t } = useTranslation();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          {t('normal_distribution')}
        </Typography>
        <Flag />
        <GithubButton />
      </Toolbar>
    </AppBar>
  )
}
