import React, { useEffect, useState } from "react";
import { Box, Button, Drawer, Typography, makeStyles } from "@material-ui/core";

import { PageBody, PageHeader, Spinner } from "../../components";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getOrders } from "../../redux/slices/orderSlice";
import OrderList from "../../components/OrderList/OrderList";
import SideList from "../../components/SideList/SideList";
const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [tableData, setTableData] = useState([]);

  const { loading, orders, success } = useSelector((state) => state.order);

  useEffect(() => {
    if (success) {
      setTableData(orders);
    }
  }, [success, orders, dispatch]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleFetch = () => {
    setShow(true);
    dispatch(getOrders());
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <PageHeader title="Item Search Page" />
      <PageBody style={{ display: "flex" }}>
        {show ? (
          <Box flexGrow="1" width="100%" display="flex" flexDirection="column">
            <Box className={classes.spacing} component="p" variant="body2">
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={handleClick}
              >
                Set Parameters
              </Button>

              <Button
                className={classes.button}
                color="default"
                variant="contained"
                onClick={() => setShow(false)}
              >
                Reset
              </Button>
            </Box>
            {loading ? <Spinner /> : <OrderList data={tableData} />}
          </Box>
        ) : (
          <Box
            flexGrow="1"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <h1>What are you looking for?</h1>
            <Typography
              className={classes.spacing}
              component="p"
              variant="body2"
              align="center"
            >
              Get started by searching and filtering a few
            </Typography>
            <Button
              className={classes.spacing}
              color="primary"
              variant="contained"
              onClick={handleFetch}
            >
              Fetch Data
            </Button>

            <Typography
              className={classes.spacing}
              component="p"
              variant="body2"
            >
              or{" "}
              <Link to="#" onClick={handleClick} underline="none">
                search for an Item
              </Link>
            </Typography>
          </Box>
        )}

        {open && (
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <SideList
              setTableData={setTableData}
              setShow={setShow}
              // setOpen={setOpen}
            />
          </Drawer>
        )}
      </PageBody>
    </React.Fragment>
  );
};

export default Dashboard;
