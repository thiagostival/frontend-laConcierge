import React, { useEffect, useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Chart from "react-apexcharts";
import axios from "axios";

import { BiEdit } from "react-icons/bi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

// STYLES
import {
  Box,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

// COMPONENTS
import { Input, InputProps } from "../../components/form/Input";
import { Loading } from "../../components/Loading";

// SERVICES
import {
  updateBusyEstablishment,
  updateMaxEstablishment,
} from "../../services";

// HOOKS
import { useAuth } from "../../contexts/AuthContext";

// TYPES
interface IData {
  max_capacity: number;
  busy_capacity: number;
}

export function DashboardEstablishment() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState,
    setError,
    getValues,
    clearErrors,
    setValue,
  } = useForm();

  const { user } = useAuth();

  const [data, setData] = useState<IData>({
    max_capacity: 0,
    busy_capacity: 0,
  });
  const [chartSeries, setChartSeries] = useState([0, 0]);

  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const customInputProps: Omit<InputProps, "name"> = {
    h: "30px",
    maxW: "80px",
    border: "none",
    bgColor: "gray.900",
    _readOnly: {
      p: "0",
      bgColor: "transparent",
      fontWeight: "bold",
      _focusVisible: {
        borderColor: "transparent",
        boxShadow: "none",
      },
    },
    _focusVisible: {
      bgColor: "gray.900",
    },
    StackProps: {
      direction: "row",
      align: "center",
    },
    labelProps: {
      m: "0",
      w: "80px",
      fontWeight: "normal",
    },
  };

  const changeInputs = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const key = e.target.name;
      const value = Number(e.target.value);

      if (key === "max_capacity" && value < getValues().busy_capacity) {
        setError(
          "max_capacity",
          {
            message:
              "Occupied Capacity cannot be greater than the Maximum Capacity",
            type: "min",
          },
          { shouldFocus: true }
        );

        return;
      } else if (key === "busy_capacity" && value > getValues().max_capacity) {
        setError(
          "max_capacity",
          {
            message:
              "Occupied Capacity cannot be greater than the Maximum Capacity",
            type: "min",
          },
          { shouldFocus: true }
        );

        return;
      }

      clearErrors();

      const available = getValues().max_capacity - getValues().busy_capacity;

      setValue("available", available);
      setChartSeries([getValues().max_capacity, getValues().busy_capacity]);
    },
    [getValues, setValue, clearErrors]
  );

  const onCancel = useCallback(() => {
    setIsEdit(!isEdit);

    setValue("max_capacity", data.max_capacity);
    setValue("busy_capacity", data.busy_capacity);
    setValue("available", data.max_capacity - data.busy_capacity);

    setChartSeries([data.max_capacity, data.busy_capacity]);

    clearErrors();
  }, [isEdit, data, clearErrors, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (d) => {
    try {
      setIsEdit(false);
      setUpdating(true);

      const { apiCall: apiCallMax } = updateMaxEstablishment();
      const { apiCall: apiCallBusy } = updateBusyEstablishment();

      console.log(d);

      await axios.all([
        apiCallMax({
          id: user?.id as string,
          busyCapacity: d.busy_capacity,
          maxCapacity: d.max_capacity,
        }),
        apiCallBusy({
          id: user?.id as string,
          busyCapacity: d.busy_capacity,
          maxCapacity: d.max_capacity,
        }),
      ]);

      setData(d as IData);

      setUpdating(false);
    } catch (error) {
      setUpdating(false);

      toast({
        id: "fail_update_data",
        title: "Failed to submit",
        description:
          "There was a problem submitting the data. Please try again later!",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleLoadData = useCallback(() => {
    try {
      if (!user?.max_capacity || !user?.busy_capacity) {
        return;
      }

      const newData = {
        max_capacity: user?.max_capacity as number,
        busy_capacity: user?.busy_capacity as number,
      };
      setData(newData);

      setChartSeries([newData.max_capacity, newData.busy_capacity]);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast({
        id: "fail_load_data",
        title: "Failed to load",
        description:
          "There was a problem loading the data. Please try again later!",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  }, [user?.max_capacity, user?.busy_capacity]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  return (
    <SimpleGrid flex="1" gap="4" alignItems="flex-start">
      <Box p="8" bg="gray.800" borderRadius={8} pb="4" width="730px">
        <Text fontSize="xl" mb="4" fontWeight="bold">
          Occupancy rate
        </Text>

        {loading ? (
          <Loading />
        ) : (
          <HStack
            justifyContent="space-between"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <VStack gap="3">
              <HStack w="100%">
                <Text fontSize="lg" fontWeight="bold">
                  Capacities
                </Text>

                {isEdit ? (
                  <>
                    <IconButton
                      aria-label="confirmar edicoes"
                      icon={<AiOutlineCheckCircle />}
                      variant="transparent"
                      fontSize="xl"
                      color="green.400"
                      type="submit"
                      isDisabled={
                        !!Object.keys(formState.errors).length || updating
                      }
                    />
                    <IconButton
                      aria-label="cancelar edicoes"
                      icon={<AiOutlineCloseCircle />}
                      variant="transparent"
                      fontSize="xl"
                      color="red.400"
                      onClick={onCancel}
                      isDisabled={updating}
                    />
                  </>
                ) : (
                  <IconButton
                    aria-label="editar indices"
                    icon={<BiEdit />}
                    variant="transparent"
                    fontSize="xl"
                    isDisabled={updating}
                    isLoading={updating}
                    onClick={() => setIsEdit(!isEdit)}
                  />
                )}
              </HStack>

              <VStack align="flex-start" w="100%">
                <Input
                  label="Maximum: "
                  type="number"
                  defaultValue={data.max_capacity}
                  isReadOnly={!isEdit}
                  error={formState?.errors?.max_capacity}
                  {...register("max_capacity", {
                    required: "Max Capacity is required",
                    valueAsNumber: true,
                    onChange: changeInputs,
                  })}
                  {...customInputProps}
                />

                <Input
                  label="Busy: "
                  type="number"
                  min={0}
                  defaultValue={data.busy_capacity}
                  isReadOnly={!isEdit}
                  error={formState?.errors?.busy_capacity}
                  {...register("busy_capacity", {
                    required: "Busy Capacity is required",
                    valueAsNumber: true,
                    onChange: changeInputs,
                  })}
                  {...customInputProps}
                />

                <Input
                  label="Available: "
                  type="number"
                  defaultValue={data.max_capacity - data.busy_capacity}
                  isReadOnly
                  {...register("available", { valueAsNumber: true })}
                  {...customInputProps}
                />
              </VStack>
            </VStack>

            <Chart
              options={{
                chart: {
                  foreColor: "#fff",
                },
                labels: ["Max Capacity", "Busy Capacity"],
                colors: ["#DD6B20", "#F6AD55"],
                legend: {
                  show: true,
                  position: "bottom",
                },
                stroke: {
                  show: false,
                },
              }}
              series={chartSeries}
              type="pie"
              width={380}
            />
          </HStack>
        )}
      </Box>

      {/* <Box p="8" bg="gray.800" borderRadius={8} width="730px">
        <Text fontSize="xl" mb="4" fontWeight="bold">
          Reservations
        </Text>

        {loading ? (
          <Loading />
        ) : (
          <Box>
            <Table
              containerProps={{
                maxH: "300px",
                overflowY: "auto",
              }}
              headers={{
                props: {
                  position: "sticky",
                  top: 0,
                  bgColor: "gray.900",
                },
                columnsProps: {
                  color: "white",
                  fontSize: "sm",
                  fontWeight: "500",
                  textAlign: "center",
                },
                rows: [
                  {
                    columns: [
                      {
                        value: "Name",
                      },
                      {
                        value: "Schedule",
                      },
                      {
                        value: "N° of Peoples",
                      },
                    ],
                  },
                ],
              }}
              body={{
                columnsProps: {
                  textAlign: "center",
                  fontSize: "sm",
                },
                rows: tableData,
              }}
            />
          </Box>
        )}
      </Box> */}
    </SimpleGrid>
  );
}
