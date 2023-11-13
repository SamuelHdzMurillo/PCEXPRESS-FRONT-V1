import React from "react";
import {
  Box,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Badge,
} from "@chakra-ui/react";

const handleDetailsClick = () => {
  // Llama a una función para abrir el modal aquí
  openDeviceModal(data.id); // Suponiendo que `openDeviceModal` proviene de `DeviceList`
};

const DeviceCard = ({ data, openTimelineModal, openDeviceModal }) => {
  return (
    <Card maxW="sm" m="5" mt="5">
      <CardBody>
        <Box display="flex" justifyContent="center">
          <Image
            src={data.imageUrl}
            alt={data.brand}
            borderRadius="lg"
            objectFit="cover"
            height="200px"
            width="100%"
          />
        </Box>
        <Stack mt="5" spacing="5">
          <Heading size="md">{data.brand}</Heading>
          <Heading size="sm">Orden: {data.id}</Heading>
          <Text size="sm">{data.owner.name}</Text>
          <Text>{data.damage}</Text>
          <Badge
            colorScheme={
              data.state === "Recibido"
                ? "red"
                : data.state === "En Proceso"
                ? "yellow"
                : data.state === "Terminado"
                ? "green"
                : "gray"
            }
            fontSize="l"
          >
            {data.state}
          </Badge>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="50" justifyContent="center" overflowX="auto">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => openDeviceModal(data.id)}
          >
            Ver Detalles
          </Button>
          <Button colorScheme="yellow" onClick={() => openTimelineModal(data)}>
            Ver Historial
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default DeviceCard;
