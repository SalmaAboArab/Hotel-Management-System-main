import { HighlightOff } from "@mui/icons-material";
import { Divider, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Theme, useTheme } from "@mui/material/styles";
import { animated, useSpring } from "@react-spring/web";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../../../Constants/Components/Urls";
import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>((props, ref) => {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
  width: "95%", // Default width
  "@media (min-width:400px)": {
    width: 400,
  },
  "@media (min-width:800px)": {
    width: 500,
  },
};

export default function AddAds({
  open,
  handleClose,
  updateValues,
  id,
  getAdsList,
}) {
  const theme = useTheme();
  const [roomName, setRoomName] = React.useState([]);
  const [personName, setPersonName] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [isActive, setIsActive] = React.useState("");

  const handleChangeRoomName = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const { value } = event.target;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(event.target.value);
  };

  const handleChangeIsActive = (event: SelectChangeEvent<typeof isActive>) => {
    setIsActive(event.target.value);
  };

  async function getAllRooms() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/rooms`, {
        headers: {
          Authorization:localStorage.getItem("adminToken")

        }
      });
      setRoomName(data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (open) {
      getAllRooms();
    }
  }, [open]);

  async function addAds(values) {
    console.log(values);
    try {
      const data = await axios.post(`${baseUrl}/admin/ads`, values, {
        headers: {
          Authorization:localStorage.getItem("adminToken")

        }
      });
      toast.success(data?.statusText);
      setDiscount("");
      setIsActive("");
      setPersonName("");
      handleClose();

    } catch (error) {
      toast.error(
        "you have already ads with the same room." || "There's a mistake."
      );
    }
  }
  async function updateAds(values) {
    try {
      const { data } = await axios.put(`${baseUrl}/admin/ads/${id}`, values, {
        headers: {
          Authorization:localStorage.getItem("adminToken")
        }
      });

      toast.success(data?.message);
      handleClose();

    } catch (error) {
      toast.error(error?.response.data.message || "There's a mistake.");
    }
    getAdsList();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    if (updateValues && id) {
      const valuesUpdate = {
        isActive: data.isActive,
        discount: Number(data.discount),
      };
      updateAds(valuesUpdate);
    } else {
      const valuesUpdateAdd = {
        isActive: data.isActive,
        discount: Number(data.discount),
        room: String(data.room),
      };
      addAds(valuesUpdateAdd);
    }
  }

  React.useEffect(() => {
    if (updateValues) {
      setDiscount(updateValues.room?.discount);
      setIsActive(Boolean(updateValues.isActive));
    }
  }, [updateValues]);

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { TransitionComponent: Fade } }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography id="spring-modal-title" variant="h6" component="h2">
                ADS
              </Typography>
              <Button onClick={handleClose}>
                <HighlightOff sx={{ color: "error.main" }} />
              </Button>
            </Box>

            <Box
              component={"form"}
              sx={{ textAlign: "center", marginTop: 2, pt: 2 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              {!updateValues ? (
                <Box sx={{ height: 85 }}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-name-label">
                      Room Name
                    </InputLabel>
                    <Select
                      {...register("room", { required: true })}
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={personName}
                      onChange={handleChangeRoomName}
                      input={<OutlinedInput label="Room Name" />}
                      MenuProps={MenuProps}
                    >
                      {roomName.map((name) => (
                        <MenuItem
                          key={name._id}
                          value={name._id}
                          style={getStyles(name, personName, theme)}
                        >
                          {name.roomNumber}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.room && (
                      <FormHelperText sx={{ color: "error.main", pY: 1 }}>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              ) : (
                ""
              )}

              <Box sx={{ height: 85 }}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    {...register("discount", { required: true })}
                    sx={{ width: "100%", "& input": { textAlign: "center" } }}
                    id="outlined-basic"
                    label="Discount"
                    variant="outlined"
                    value={discount}
                    onChange={handleChangeDiscount}
                    inputRef={(input) => {
                      if (updateValues && id) {
                        input && input.focus();
                      }
                    }
                  }
                  />

                  {errors.discount && (
                    <FormHelperText sx={{ color: "error.main", pY: 1 }}>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box sx={{ height: 85 }}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-multiple-name-label">Active</InputLabel>
                  <Select
                    {...register("isActive", { required: true })}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={isActive}
                    onChange={handleChangeIsActive}
                    input={<OutlinedInput label="Active" />}
                    MenuProps={MenuProps}
                  >
                    <MenuItem key={"true"} value={"true"}>
                      true
                    </MenuItem>
                    <MenuItem key={"false"} value={"false"}>
                      false
                    </MenuItem>
                  </Select>
                  {errors.isActive && (
                    <FormHelperText sx={{ color: "error.main", pY: 1 }}>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Divider
                component="hr"
                sx={{ bgcolor: "primary.main" }}
                aria-hidden="true"
              />
              <Box sx={{ textAlign: "end", mt: 2 }}>
                <Button sx={{ paddingX: 4 }} variant="contained" type="submit">
                  {updateValues && id ? "Update" : "Save"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
