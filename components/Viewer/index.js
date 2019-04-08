import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import panesSubscription from './panesSubscription.gql';
import panesQuery from './panesQuery.gql';
import { useSubscription, useQuery } from 'react-apollo-hooks';

import Pane from './Pane';
import { Grid } from './Grid';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

const paneReducer = (state, updatedPane) => {
  console.log('panes in reducer', state);

  return state.map(pane => (pane.id === updatedPane.id ? updatedPane : pane));
};

const getInit = viewer => {
  console.log('init', viewer);

  return [];
};

const View = ({ viewer: { id, name, ...gridSize }, createNewNode }) => {
  console.log('name', name);

  const { data, loading, error: initialError } = useQuery(panesQuery, {
    variables: {
      viewerName: name,
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  console.log('initialError', initialError);
  console.log('initialData', data);

  const { viewer: activeViewer } = data;

  const [panes, dispatch] = useReducer(
    paneReducer,
    activeViewer,
    viewer => viewer.activePanes
  );

  console.log('panes', panes);

  const { error: updatedError, loading: updatedLoading } = useSubscription(
    panesSubscription,
    {
      variables: {
        viewerName: name,
      },
      onSubscriptionData: ({ client, subscriptionData: { data } }) => {
        // Optional callback which provides you access to the new subscription
        // data and the Apollo client. You can use methods of the client to update
        // the Apollo cache:
        // https://www.apollographql.com/docs/react/advanced/caching.html#direct
        dispatch(data.pane.node);
      },
    }
  );

  console.log(updatedError);

  return loading ? (
    <div>loading...</div>
  ) : (
    <Grid {...gridSize}>
      {
        /*placeholder/add-button cells*/
        <div>foo</div>
      }
      {panes.map(pane => (
        <Pane key={pane.id} {...pane} />
      ))}
    </Grid>
  );
};

const mapStateToProps = ({ viewer }) => ({
  viewer,
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(View);
