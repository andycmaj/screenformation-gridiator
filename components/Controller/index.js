import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import updatePaneMutation from './updatePaneMutation.gql';
import viewerQuery from './viewerQuery.gql';
import { useSubscription, useQuery, useMutation } from 'react-apollo-hooks';

const Controller = () => {
  const { data, loading, error } = useQuery(viewerQuery, {
    variables: {
      viewerName: "andy's laptop",
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  const {
    viewer: { id, name, rowCount, colCount },
  } = data;

  // activePanes: {
  //   rowStart,
  //   rowSpan,
  //   colStart,
  //   colSpan,
  //   content: { title, url },
  // },

  return (
    <div>
      <h2>{name}</h2>
      <div>
        rows: <input type="number" value={rowCount} />
      </div>
      <div>
        cols: <input type="number" value={colCount} />
      </div>
    </div>
  );
};

export default Controller;
