import React from 'react';
import useSWR from 'swr';
import { CircularProgress, } from '@chakra-ui/react';
import Layout from '../components/Layout';
import VideoGrid from '../components/VideoGrid/Index';

const fetcher = (url) => fetch(url).then((res) => res.json());

function index() {
  const { data } = useSWR('/api/videos', fetcher);

  if (data) {
    return (
      <Layout>
        <div className='p-2'>
          <h2 className='text-3xl mb-2 text-gray-100 font-bold'> Latest Videos </h2>
          {data && <VideoGrid videos={data} />}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='flex flex-row justify-center p-2'>
        <CircularProgress isIndeterminate />
      </div>
    </Layout>
  );
}

export default index;