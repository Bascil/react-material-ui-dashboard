import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useDispatch, useSelector } from "react-redux";
import { reset, searchOrders } from "../../redux/slices/orderSlice";

import { options } from "../../data/options";

const useStyles: any = makeStyles((theme) => ({
  card: {
    border: "none",
    boxShadow: "none",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    ml: 3,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  spacing: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formDrawer: {
    marginLeft: theme.spacing(0),
    marginTop: theme.spacing(0),
  },
  drawer: {
    width: 350,
    height: "100%",
  },
  menuColor: {
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontWeight: 700,
  },
}));

const SideList: FC = ({ setTableData, setShow }: any) => {
  const dispatch = useDispatch();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [expanded, setExpanded] = useState<string>("panel1");

  //@ts-ignore
  const { orders, success } = useSelector((state) => state.order);

  useEffect(() => {
    if (success) {
      setTableData(orders);
      setShow(true);
    }
    reset();
  }, [success, orders, setShow, setTableData, dispatch]);

  const [formData, setFormData] = useState<any>({
    orderNumber: "",
    itemNumber: "",
    category: "",
  });

  const { orderNumber, itemNumber, category } = formData;

  const onChange: any = (e: any): void => {
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const payload: any = {
      orderNumber,
      itemNumber,
      category,
      type: selectedTypes.map((type: any) => type.value),
    };

    //@ts-ignore
    dispatch(searchOrders(payload));
  };

  const classes = useStyles();

  const handlePanelChange =
    (panel: any) =>
    (event: any, newExpanded: any): void => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, option: any) => {
    const checked = event.target.checked;
    if (checked) {
      //@ts-ignore
      setSelectedTypes((prev: any) => [...prev, option]);
    } else {
      //@ts-ignore
      setSelectedTypes(selectedTypes.filter((extra) => extra.id !== option.id));
    }
  };

  return (
    <Box className={classes.drawer} component="div">
      <form className={classes.formDrawer} onSubmit={onSubmit}>
        <Box
          sx={{
            borderRadius: 1,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Card className={classes.card}>
            <CardHeader
              className={classes.menuColor}
              avatar={<FilterListOutlinedIcon />}
              title="Set Parameters"
              subheader="0 Parameters Available"
            />
            <CardContent>
              <Accordion
                elevation={0}
                expanded={expanded === "panel1"}
                onChange={handlePanelChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.label}>
                    Order Number
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    name="orderNumber"
                    value={orderNumber}
                    onChange={onChange}
                    placeholder="6656,3433,3443"
                    variant="outlined"
                    multiline
                    minRows={2}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                elevation={0}
                expanded={expanded === "panel2"}
                onChange={handlePanelChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.label}>Item Number</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    name="itemNumber"
                    value={itemNumber}
                    onChange={onChange}
                    placeholder={'Item ID (Ex. "6783")'}
                    variant="outlined"
                    multiline
                    minRows={2}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                elevation={0}
                expanded={expanded === "panel3"}
                onChange={handlePanelChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.label}>Category</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    name="category"
                    value={category}
                    onChange={onChange}
                    placeholder={"Category Name"}
                    variant="outlined"
                    multiline
                    minRows={2}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                elevation={0}
                expanded={expanded === "panel4"}
                onChange={handlePanelChange("panel4")}
              >
                <AccordionSummary
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.label}>Type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <Box className={classes.box}>
                      <div>
                        {options.map((option, i) => (
                          <div key={option.id}>
                            <FormControlLabel
                              label={option.label}
                              control={
                                <Checkbox
                                  id={`${option.label}`}
                                  name={option.label}
                                  value={option.value}
                                  onChange={(e) => handleChange(e, option)}
                                />
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </Box>
                  </div>
                </AccordionDetails>
              </Accordion>
            </CardContent>
            <CardActions className={classes.actions}>
              <Box>
                <Button
                  className={classes.spacing}
                  color="default"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  className={classes.spacing}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Apply
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </form>
    </Box>
  );
};

export default SideList;
