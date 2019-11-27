import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Scream from '../components/scream';
import Profile from '../components/profile';
import { getScreams } from '../store/actions/data-actions';

const Home = ({ getScreams, data: { screams, loading } }) => {
  useEffect(() => {
    getScreams();
  }, []);
  const recentScreamsMarkup = !loading ? (
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

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);
