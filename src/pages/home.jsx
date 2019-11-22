import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Scream from '../components/scream';
import Profile from '../components/profile';

const Home = () => {
  const [screams, setScreams] = useState(null);
  useEffect(() => {
    axios
      .get('/screams')
      .then(res => {
        setScreams(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const recentScreamsMarkup = screams ? (
    screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid container spacing={3}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
