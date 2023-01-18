import { IconButton, Tooltip } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function GithubButton() {
  const { t } = useTranslation();
  return (
    <Tooltip title={t("github_link")}>
      <IconButton color="black" href="https://github.com/mytunca/normal-distribution" target="_blank">
        <GitHub />
      </IconButton>
    </Tooltip>
  )
}
