import { useCallback, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

import { RiFundsFill, RiRestaurantFill } from "react-icons/ri";

// STYLES
import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  Icon,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";

// ASSETS
import restaurant from "../../assets/restaurant.png";

// COMPONENTS
import { Loading } from "../../components/Loading";
import { Carousel } from "../../components/Carousel";

// SERVICES
import { isCancel } from "../../services/api";
import { getAllEstablishment } from "../../services";

// TYPES
import { IEstablishment } from "../../types";
interface IListEstablishment extends IEstablishment {
  available: string;
}

export function DashboardClient() {
  const [loading, setLoading] = useState(true);
  const [establishment, setEstablishment] = useState<IListEstablishment[]>([]);

  const handleGetEstablishment = useCallback(async () => {
    const { apiCall } = getAllEstablishment();

    try {
      const { data } = await apiCall();

      const formatted = (data as IEstablishment[]).map((item) => {
        if (item?.busy_capacity && item?.max_capacity) {
          const available = (item.busy_capacity * 100) / item.max_capacity;

          return {
            ...item,
            available: `${available}%`,
          };
        }

        return {
          ...item,
          available: "no info at this time",
        };
      });

      setEstablishment(formatted);

      setLoading(false);
    } catch (err) {
      console.error(err);

      if (!isCancel) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    handleGetEstablishment();
  }, [handleGetEstablishment]);

  return (
    <Flex flex="1" gap="4" flexDirection="column">
      <Box
        p="8"
        pb="4"
        bg="gray.800"
        borderRadius={8}
        textAlign="center"
        height="400px"
      >
        <Text fontSize="lg" mb="4">
          Mais Visitados
        </Text>

        {loading && <Loading size="xl" />}

        {!loading && (
          <Carousel>
            {establishment.map((item) => (
              <SwiperSlide
                key={item.name}
                style={{
                  width: 300,
                  height: 300,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Button
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                  colorScheme="none"
                  onClick={() => console.log(item.name)}
                >
                  <Text fontWeight="normal" mb="2">
                    {item.name}
                  </Text>

                  <Image alt={item.name} src={item.avatar_url || restaurant} />
                </Button>
              </SwiperSlide>
            ))}
          </Carousel>
        )}
      </Box>

      <Box p="6" bg="gray.800" borderRadius={8}>
        <List spacing={3}>
          {loading && <Loading size="lg" />}

          {!loading &&
            establishment.map((item) => (
              <ListItem key={item.id} width="100%">
                <Button
                  type="button"
                  colorScheme="yellow"
                  variant="link"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  w="100%"
                  p="2"
                  onClick={() => console.log(item.name)}
                  borderBottomColor="gray.800"
                  transition="border-color 0.3s ease-in-out color 0.3s ease-in-out"
                  _hover={{
                    textDecoration: "none",
                    borderBottom: "1px solid",
                    borderBottomColor: "yellow.500",
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  _active={{
                    color: "tomato",
                    borderBottomColor: "tomato",
                  }}
                >
                  <Flex gap="3" alignItems="center">
                    <Circle border="2px solid" borderColor="tomato" p="2">
                      {item?.avatar_url ? (
                        <Avatar
                          size="md"
                          name={item?.name}
                          src={item.avatar_url}
                        />
                      ) : (
                        <Icon
                          as={RiRestaurantFill}
                          fontSize="25"
                          color="tomato"
                        />
                      )}
                    </Circle>

                    <Text>{item.name}</Text>
                  </Flex>

                  <Flex gap="3" alignItems="center">
                    <Icon as={RiFundsFill} fontSize="35" color="tomato" />
                    <Text>{item.available}</Text>
                  </Flex>
                </Button>
              </ListItem>
            ))}
        </List>
      </Box>
    </Flex>
  );
}
