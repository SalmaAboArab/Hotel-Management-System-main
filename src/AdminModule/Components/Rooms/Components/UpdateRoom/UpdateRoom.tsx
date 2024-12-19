import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../../Constants/Components/Urls";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ICreateRoom } from "../RoomsForm/RoomListInterface";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  styled,
  Typography,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UpdateRoom() {
  const location = useLocation();
  const { room } = location.state;
  const navigateTo = useNavigate();
  const curruntRoomId = localStorage.getItem("curruntItem");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICreateRoom>();
  const [facilitiesList, setfacilitiesList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const appendToFormData = (data: ICreateRoom) => {
    const formData = new FormData();
    formData.append("roomNumber", data?.roomNumber);
    formData.append("price", String(data?.price));
    formData.append("capacity", data?.capacity);
    formData.append("discount", String(data?.discount));
    if (Array.isArray(data.facilities) && data.facilities.length > 0) {
      data.facilities.forEach((facility) => {
        formData.append("facilities", String(facility));
      });
    } else {
      Array.isArray(room.facilities) &&
        room.facilities.forEach((facility: any) => {
          formData.append("facilities", String(facility._id));
        });
    }

    for (let i = 0; i < data.imgs.length; i++) {
      formData.append("imgs", data.imgs[i]);
    }
    return formData;
  };

  const submitUpdateRoom = async (data: ICreateRoom) => {
    const AppendData = appendToFormData(data);
    try {
      const response = await axios.put(
        `${baseUrl}/admin/rooms/${room._id}`,
        AppendData,
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      );
      toast.success("Room updated successfully");
      navigateTo("/Admin/rooms");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  // get facilitiesList

  const gitAllFacilities = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/room-facilities`, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });

      setfacilitiesList(response?.data?.data?.facilities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gitAllFacilities();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(submitUpdateRoom)}>
        <Grid
          justifyContent="center"
          alignItems="center"
          container
          p={1}
          paddingTop={5}
          spacing={2}
        >
          <Grid item xs={4}>
            <TextField
              label="roomNumber"
              defaultValue={room?.roomNumber}
              {...register("roomNumber")}
              name="roomNumber"
              required
              fullWidth
              margin="normal"
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="price"
              defaultValue={room?.price}
              {...register("price")}
              name="price"
              required
              fullWidth
              variant="filled"
              margin="normal"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          p={1}
          spacing={2}
        >
          <Grid item xs={4}>
            <TextField
              label="capacity"
              variant="filled"
              defaultValue={room?.capacity}
              {...register("capacity")}
              name="capacity"
              required
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{ color: "blue" }}
              label="discount"
              defaultValue={room?.discount}
              {...register("discount")}
              name="discount"
              required
              variant="filled"
              fullWidth
              margin="normal"
              type="text"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid
          container
          p={1}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Select
              label="facilities"
              multiple
              defaultValue={room?.facilities?.map(
                (facility: any) => facility._id
              )}
              {...register("facilities")}
              variant="filled"
              fullWidth
              type="text"
              name="facilities"
            >
              {facilitiesList.map((facility: any) => (
                <MenuItem key={facility._id} value={facility._id}>
                  {facility.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={8} p={2}>
            <Stack>
              <Box display="flex" flexWrap="wrap" gap={2}>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={2}
                  sx={{ margin: "auto" }}
                >
                  {/* Render existing room images */}
                  {watch("imgs") &&
                    watch("imgs").length == 0 &&
                    room.images &&
                    room.images.map((image: string, index: number) => (
                      <Box key={`existing-${index}`} sx={{ margin: "auto" }}>
                        <img
                          src={image}
                          alt={`Room Image ${index + 1}`}
                          width="100"
                        />
                      </Box>
                    ))}

                  {/* Render newly uploaded images */}
                  {watch("imgs") &&
                    Array.from(watch("imgs")).map((file, index) => (
                      <Box key={`new-${index}`} sx={{ margin: "auto" }}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Uploaded ${index + 1}`}
                          width="100"
                        />
                      </Box>
                    ))}
                </Box>
              </Box>

              <Button
                component="label"
                role={undefined}
                size="large"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Upload Room Image
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  multiple
                  {...register("imgs")}
                />
              </Button>

              {errors.imgs && (
                <Typography variant="caption" color="error">
                  {errors.imgs.message}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid
            container
            spacing={8}
            p={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={3}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={() => navigateTo("/Admin/rooms")}
                type="submit"
                size="large"
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
