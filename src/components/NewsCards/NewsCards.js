import React from "react";
import NewsCard from "../NewsCard/NewsCard";

// Material UI imports
import { Grid, Grow, Typography } from "@material-ui/core";
import useStyles from "./styles.js";

const infoCards = [
  { color: "#00838f", title: "Latest News", text: "Give me the latest news" },
  {
    color: "#1565c0",
    title: "News by Categories",
    info:
      "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
  },
  {
    color: "#4527a0",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with PlayStation 5",
  },
  {
    color: "#283593",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, ABC News...",
    text: "Give me the news from CNN",
  },
];

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();

  return (
    <>
      {!articles.length ? (
        // {/* If There are no articles loaded*/}
        <Grow in>
          <Grid
            className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
          >
            {infoCards.map((infoCard) => (
              <Grid
                item
                xs={12}
                sm={8}
                md={6}
                lg={5}
                className={classes.infoCard}
              >
                <div
                  className={classes.card}
                  style={{ backgroundColor: infoCard.color }}
                >
                  <Typography variant="h5" component="h5">
                    {infoCard.title}
                  </Typography>
                  {infoCard.info ? (
                    <Typography variant="h6" component="h6">
                      <strong>{infoCard.title.split(" ")[2]}</strong>: <br />
                      {infoCard.info}
                    </Typography>
                  ) : null}
                  <Typography variant="h6" component="h6">
                    Try saying: <br /> <i>{infoCard.text}</i>
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grow>
      ) : (
        //  {/* If There are  articles loaded*/}
        <Grow in>
          <Grid
            className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
          >
            {articles.map((article, i) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                style={{ display: "flex" }}
              >
                <NewsCard
                  article={article}
                  i={i}
                  activeArticle={activeArticle}
                />
              </Grid>
            ))}
          </Grid>
        </Grow>
      )}
    </>
  );
};

export default NewsCards;
