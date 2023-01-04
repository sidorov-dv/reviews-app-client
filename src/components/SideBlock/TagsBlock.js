import React from "react";
import TagIcon from "@mui/icons-material/Tag";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import SideBlock from "./SideBlock";
import { useTranslation } from "react-i18next";

const TagsBlock = ({ items, isLoading, findReviewsByTags }) => {
  const { t } = useTranslation();
  return (
    <SideBlock title={t("tags_n1")}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Box key={i} sx={{ m: 1 }}>
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <Chip
                sx={{ fontWeight: 500 }}
                icon={<TagIcon />}
                color="primary"
                size="small"
                label={name}
                variant="outlined"
                clickable
                onClick={() => findReviewsByTags(name)}
              />
            )}
          </Box>
        ))}
      </Box>
    </SideBlock>
  );
};

export default TagsBlock;
