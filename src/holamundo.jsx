import { Button } from "@chakra-ui/react";
import UserRegistrationModal from "./components/RegisterUser";
import React from "react";

const MainComponent = () => {
  return (
    <div>
      <UserRegistrationModal openButton={<Button>Registrar Usuario</Button>} />
      {/* Resto de tu código */}
    </div>
  );
};

export default MainComponent;
