import { useContext, useState, } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Heading, Pane, TextInputField, Button, } from 'evergreen-ui';
import api from '../utils/api';
import { Context, } from '../utils/store';

export default function Login() {
  const { login } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { data } = await api('/login', {
      method: 'POST',
      data: { email, password },
    });
    setLoading(false);
    login(data.token);
    Router.push('/');
  }
  
  return (
    <Pane
      height='100vh'
      width='100vw'
      display='flex'
      background='tint1'
      alignItems='flex-start'
      justifyContent='center'
    >
      <Pane
        width={450}
        display='flex'
        elevation={2}
        marginTop={100}
        borderRadius='5px'
        background='white'
        alignItems='center'
        flexDirection='column'
        justifyContent='flex-start'
      >
        <Pane>
          <Heading
            size={700}
            marginTop={20}
            marginBottom={10}
          >
            Dive in to Bken
          </Heading>
        </Pane>
        <Pane
          padding={30}
          width='100%'
          display='flex'
          justifyContent='center'
          flexDirection='column'
          alignItems='flex-start'
        >
          <TextInputField
            required
            name='email'
            width='100%'
            label='Email'
            value={email}
            inputHeight={40}
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
          <TextInputField
            required
            width='100%'
            type='password'
            name='password'
            inputHeight={40}
            label='Password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            height={40}
            width='100%'
            intent='success'
            isLoading={loading}
            appearance='primary'
            justifyContent='center'
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link href='/register'>
            <Heading
              size={200}
              width='100%'
              marginTop={30}
              display='flex'
              cursor='pointer'
              alignItems='center'
              justifyContent='center'
            >
              <a> Register</a>
            </Heading>
          </Link>
          <Pane />
        </Pane>
      </Pane>
    </Pane>
  );
}