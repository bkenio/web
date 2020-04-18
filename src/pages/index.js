import React from 'react';
import withMe from '../lib/withMe';
import withApollo from '../lib/withApollo';

import Layout from '../components/Layout';
import Navigation from '../components/Navigation';

function Index() {
  const { me } = withMe();

  if (me) {
    return (
      <Layout>
        <Navigation />
        <h1>Welcome {me.email}</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navigation />
      <h1>Please sign in</h1>
    </Layout>
  );
}

export default withApollo({ ssr: true })(Index);