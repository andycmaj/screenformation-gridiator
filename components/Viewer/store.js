export const CONTENT_TYPE = {
  empty: 'no content',
  youtubeFrame: 'a 16:9 youtube frame',
  fillFrame: 'full-frame content',
  // TODO: https://www.raymondcamden.com/2015/07/07/using-the-google-analytics-embed-api-to-build-a-dashboard
  // https://ga-dev-tools.appspot.com/query-explorer/
  // https://ga-dev-tools.appspot.com/embed-api/custom-components/
  googleAnalyticsChart: 'a google analytics chart',
  embedSnippet: 'a code snippet provided by a web site',
};

const INITIAL_STATE = {
  id: 'cjte19wpla9ws0b514gpr94k6',
  rowCount: 2,
  colCount: 2,
  name: "andy's laptop",
  panes: [
    {
      id: 0,
      rowStart: 1,
      rowSpan: 1,
      colStart: 1,
      colSpan: 2,
      content: {
        type: CONTENT_TYPE.fillFrame,
        title: 'a gantt chart',
        url:
          'https://docs.google.com/a/howardschultz.com/spreadsheets/d/e/2PACX-1vQfEelB2TWOMvUWq-MMVoKjudCRBQyi1hcfDP1Ow7yKazzjwFOXiXUXtNgG3QSjpUkLT7H0lbbLuqm1/pubhtml?gid=1115838130&amp;single=true&amp;widget=true&amp;headers=false',
      },
    },
    {
      id: 2,
      rowStart: 2,
      rowSpan: 1,
      colStart: 1,
      colSpan: 1,
      content: {
        type: CONTENT_TYPE.youtubeFrame,
        title: 'a video',
        url:
          'https://www.youtube.com/embed/s27RL-F3RTs?playlist=s27RL-F3RTs&vq=hd1080&autoplay=1&loop=1&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&fs=0&color=white&controls=0&mute=1',
      },
    },
    {
      id: 3,
      rowStart: 2,
      rowSpan: 1,
      colStart: 2,
      colSpan: 1,
      content: {
        type: CONTENT_TYPE.embedSnippet,
        title: 'a caniuse embed',
        requiredScripts: [
          'https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/caniuse-embed.min.js',
        ],
        snippet:
          '&#x3C;p class=&#x22;ciu_embed&#x22; data-feature=&#x22;once-event-listener&#x22; data-periods=&#x22;future_1,current,past_1,past_2&#x22; data-accessible-colours=&#x22;false&#x22;&#x3E; &#x3C;a href=&#x22;http://caniuse.com/#feat=once-event-listener&#x22;&#x3E; &#x3C;picture&#x3E; &#x3C;source type=&#x22;image/webp&#x22; srcset=&#x22;https://res.cloudinary.com/ireaderinokun/image/upload/v1551210177/caniuse-embed/once-event-listener-2019-2-26.webp&#x22;&#x3E; &#x3C;source type=&#x22;image/png&#x22; srcset=&#x22;https://res.cloudinary.com/ireaderinokun/image/upload/v1551210177/caniuse-embed/once-event-listener-2019-2-26.png&#x22;&#x3E; &#x3C;source type=&#x22;image/jpeg&#x22; srcset=&#x22;https://res.cloudinary.com/ireaderinokun/image/upload/v1551210177/caniuse-embed/once-event-listener-2019-2-26.jpg&#x22;&#x3E; &#x3C;img src=&#x22;https://res.cloudinary.com/ireaderinokun/image/upload/v1551210177/caniuse-embed/once-event-listener-2019-2-26.png&#x22; alt=&#x22;Data on support for the once-event-listener feature across the major browsers from caniuse.com&#x22;&#x3E; &#x3C;/picture&#x3E; &#x3C;/a&#x3E; &#x3C;/p&#x3E; &#x3C;script src=&#x22;https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/caniuse-embed.min.js&#x22;&#x3E;&#x3C;/script&#x3E; ',
      },
    },
  ],
};

export const updatePane = (paneId, dimensions) => ({
  type: 'UPDATE_PANE',
  payload: {
    paneId,
    dimensions,
  },
});

export const updateContent = (paneId, title, url, type) => ({
  type: 'UPDATE_CONTENT',
  payload: {
    paneId,
    title,
    url,
    type,
  },
});

export const createPane = id => ({
  type: 'CREATE_PANE',
  payload: {
    id,
  },
});

// TODO: https://alligator.io/react/redux-beacon/

const contentReducer = (panes, { paneId, ...rest }) =>
  panes.map(pane =>
    // TODO: consolidate pane/content id
    pane.id === paneId
      ? {
          ...pane,
          content: { ...pane.content, ...rest, isEmpty: false },
        }
      : pane
  );

const paneReducer = (panes, { paneId, dimensions }) =>
  panes.map(pane =>
    pane.id === paneId
      ? {
          ...pane,
          ...dimensions,
        }
      : pane
  );

export const viewerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_CONTENT':
      return {
        ...state,
        panes: contentReducer(state.panes, action.payload),
      };
    case 'UPDATE_PANE':
      return {
        ...state,
        panes: paneReducer(state.panes, action.payload),
      };
    default:
      return state;
  }
};
