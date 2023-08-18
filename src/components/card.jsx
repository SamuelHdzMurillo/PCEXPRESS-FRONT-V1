import React from 'react';
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
} from '@chakra-ui/react';

const DeviceCard = ({ data , openTimelineModal}) => {
  return (
    
    <Card maxW='sm' m='8' mt='8'>
      <CardBody>
        <Box display='flex' justifyContent='center'>
          <Image
            src={data.imageUrl}
            alt={data.brand}
            borderRadius='lg'
            objectFit='cover'
            height='200px'
            width='100%' 
          />
        </Box>
        <Stack mt='6' spacing='5'>
          <Heading size='md'>{data.brand}</Heading>
          <Text>{data.damage}</Text>
          <Text color='blue.600' fontSize='2xl'>
            {data.state === 'Active' ? 'Active' : 'Inactive'}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='55'justifyContent='center' overflowX='auto'>
          <Button variant='solid' colorScheme='blue'>
            Ver Detalles
          </Button>
          <Button variant='outline' 
          colorScheme='yellow' 
          onClick={() => openTimelineModal(data)}>Ver Historial</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default DeviceCard;
