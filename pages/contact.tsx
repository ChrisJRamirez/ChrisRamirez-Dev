import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import Layout from '../components/layouts/Article';
import Section from '../components/Section';
import emailjs from '@emailjs/browser';

const initialFormValues = {
  name: '',
  email: '',
  message: '',
};

const Contact = () => {
  const form = useRef<any>(null);
  const [formValues, setFormValues] = useState(initialFormValues);
  const toast = useToast();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `${process.env.NEXT_PUBLIC_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`,
        form.current,
        `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`
      )
      .then((res) => {
        setFormValues(initialFormValues);
        toast({
          title: 'Email Sent',
          description: 'Thank you for sending a message!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      })
      .catch((err) => {
        toast({
          title: 'Contact Error',
          description: 'Could not send message',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      });
  };

  return (
    <Layout>
      <Container maxW='4xl'>
        <Box display='flex' alignItems='center' mb={8}>
          <Heading as='h2' variant='page-title'>
            Contact Me!
          </Heading>
        </Box>

        <Section>
          <Box
            borderRadius='lg'
            mb={6}
            p={3}
            textAlign='center'
            bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
            css={{ backdropFilter: 'blur(10px)' }}
          >
            <Flex
              display='flex'
              justifyContent='space-around'
              alignItems='center'
            >
              <Section width={{ base: '90%', md: '45%' }}>
                <form ref={form} onSubmit={onSubmit}>
                  <VStack spacing='5%'>
                    <FormControl>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        name='name'
                        id='name'
                        value={formValues.name}
                        onChange={onChange}
                        required
                        borderBottom='1px'
                        borderRadius='sm'
                        borderColor={useColorModeValue('black', 'white')}
                        variant='unstyled'
                        type='text'
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        name='email'
                        id='email'
                        value={formValues.email}
                        onChange={onChange}
                        required
                        borderBottom='1px'
                        borderRadius='sm'
                        borderColor={useColorModeValue('black', 'white')}
                        variant='unstyled'
                        type='email'
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        name='message'
                        id='message'
                        value={formValues.message}
                        onChange={onChange}
                        required
                        borderBottom='1px'
                        borderRadius='sm'
                        borderColor={useColorModeValue('black', 'white')}
                        variant='unstyled'
                      />
                    </FormControl>
                    <Box>
                      <Button
                        type='submit'
                        value='Send'
                        borderRadius='lg'
                        colorScheme='teal'
                      >
                        Contact Me
                      </Button>
                    </Box>
                  </VStack>
                </form>
              </Section>

              <Section width='45%' display={{ base: 'none', md: 'block' }}>
                <VStack spacing='40%' align='center'>
                  <Box>
                    <Heading size='md'>Contact</Heading>
                    <Text>Chrisali.dev@gmail.com</Text>
                  </Box>
                  <Box>
                    <Heading size='md'>Based in</Heading>
                    <Text>New York, New York</Text>
                  </Box>
                </VStack>
              </Section>
            </Flex>
          </Box>
        </Section>
      </Container>
    </Layout>
  );
};

export default Contact;
