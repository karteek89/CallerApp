import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Grid, Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { AppCard } from "./components";
import { AppService } from "api";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  }
}));

const ProductList = ({ history }) => {
  const classes = useStyles();

  const [apps, setApps] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      var data = await AppService.getAll();
      setApps(data);
    };

    loadData();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={3}>
          {apps.map(product => (
            <Grid item key={product.id} lg={2} md={3} xs={6}>
              <AppCard product={product} history={history} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductList;
