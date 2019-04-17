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

const getInit = viewer => (viewer ? viewer.activePanes : []);

const View = ({ name }) => {
  const {
    data: { viewer: activeViewer },
    loading,
  } = useQuery(panesQuery, {
    variables: {
      viewerName: name,
    },
  });

  const [panes, dispatch] = useReducer(paneReducer, activeViewer, getInit);

  useSubscription(panesSubscription, {
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
  });

  return loading ? (
    <div>loading...</div>
  ) : (
    <Grid rowCount={2} colCount={2}>
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

export default View;
