import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from 'Context/LoginContext';
import Global from 'Global';
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Container
} from '@chakra-ui/react';

export const EditUser = () => {

  const [dataToSend, setDataToSend] = useState({passwordCurrent: '', passwordNew: ''});
  const [isLoading, setIsLoading] = useState(false);

  
  const navigate = useNavigate();
  const Login = useContext(LoginContext);
  const { userInfo } = Login;

  const { passwordCurrent, passwordNew } = dataToSend;

  const handleOnChange = (e) => {
    setDataToSend({
      ...dataToSend,
      [e.target.name]: e.target.value
    });
  }

  const handleOnSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(Global.changePassword, dataToSend);
      console.log(response);
      navigate('/home');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return(
    <Container
    mt='15px'
    >
      <Stack>
        <FormControl isRequired>
          <FormLabel htmlFor='passwordCurrent'>Contraseña actual</FormLabel>
          <Input value={passwordCurrent}  name='passwordCurrent' id='passwordCurrent' type='password' onChange={(e) => handleOnChange(e)}/>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='passwordNew'>Contraseña nueva</FormLabel>
          <Input value={passwordNew}  name='passwordNew' id='passwordNew' type='password' onChange={(e) => handleOnChange(e)}/>
        </FormControl>
        {isLoading ?
          <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
          />
        :
        <Stack
        alignItems={'center'}
        justifyContent='space-around'
        direction='row'
        >
          <Button>
            <Link to='/home'>
              Volver
            </Link>
          </Button>
          <Button onClick={handleOnSubmit}>Aplicar</Button>
        </Stack>
        }
      </Stack>
    </Container>
)};