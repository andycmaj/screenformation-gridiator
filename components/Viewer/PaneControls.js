import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState, withStateHandlers } from 'recompose';
import styled, { css } from 'styled-components';
import theme from '../../lib/theme';
import convertSliderValuesToDimensions from '../../lib/convertSliderValuesToDimensions';
import { CONTENT_TYPE, updateContent, updatePane } from './store';

import {
  Icon,
  ButtonGroup,
  Button,
  Popover,
  Classes,
  Tooltip,
  Dialog,
  InputGroup,
  HTMLSelect,
  RangeSlider,
} from '@blueprintjs/core';
import GridPreview from './GridPreview';

const Root = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: ${theme.elevation.foreground};
`;

const Vertical = styled.div`
  width: 80px;
  height: auto;
  padding: 100px 10px 50px 10px;
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${theme.colors.darkBackground};
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.2), 0 2px 4px rgba(16, 22, 26, 0.4),
    0 8px 24px rgba(16, 22, 26, 0.4);
`;

const Horizontal = styled.div`
  width: auto;
  height: 70px;
  padding: 10px 120px 10px 50px;
`;

const ControlBar = styled.div`
  div,
  span {
    font-size: 20px;
  }

  svg {
    width: 60px;
    height: 60px;
  }
`;

const popoverStyle = css`
  .bp3-transition-container {
    z-index: ${theme.elevation.background};
  }
  .bp3-popover-content {
    border-radius: 0;
  }
`;

const EditButton = styled(Button)`
  width: 60px;
  height: 60px;
  padding: 10px;
  z-index: ${theme.elevation.foreground} !important;
`;

const EditDialog = styled(Dialog)`
  width: 50%;
`;

const formFieldStyle = css`
  margin: 20px;

  input.bp3-input,
  select {
    font-size: 3em;
    height: auto;
    padding: 10px 15px !important;
  }

  input.bp3-input {
    padding-left: 70px !important;
  }

  .bp3-icon {
    display: block;

    svg {
      width: 35px;
      height: 35px;
    }
  }
`;

const ContentInput = styled(InputGroup)`
  ${formFieldStyle};

  .bp3-icon {
    margin: 20px 0 0 15px;
  }
`;

const TypeSelect = styled(HTMLSelect)`
  ${formFieldStyle};

  display: block;

  .bp3-icon {
    margin: 10px 0;
  }

  select {
  }
`;

const TYPE_OPTIONS = Object.keys(CONTENT_TYPE).map(key => ({
  value: CONTENT_TYPE[key],
  disabled: key === 'googleAnalyticsChart',
}));

const ContentEditorDialog = ({
  isContentEditorOpen,
  setIsContentEditorOpen,
  content: { title, url, type },
  handleTitleFieldRef,
  handleUrlFieldRef,
  handleTypeFieldRef,
  handleSaveContent,
}) => (
  <EditDialog
    className={Classes.DARK}
    icon="edit"
    onClose={() => setIsContentEditorOpen(false)}
    title="Edit Pane"
    isOpen={isContentEditorOpen}
  >
    <div className={Classes.DIALOG_BODY}>
      <TypeSelect
        iconProps={{ iconSize: 100 }}
        defaultValue={type}
        options={TYPE_OPTIONS}
        elementRef={handleTypeFieldRef}
      />
      <ContentInput
        leftIcon="label"
        placeholder="title..."
        defaultValue={title}
        inputRef={handleTitleFieldRef}
      />
      <ContentInput
        leftIcon="globe"
        placeholder="url..."
        defaultValue={url}
        inputRef={handleUrlFieldRef}
      />
    </div>
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Tooltip content="Cancel">
          <Button onClick={() => setIsContentEditorOpen(false)}>Close</Button>
        </Tooltip>
        <Button intent="primary" onClick={handleSaveContent}>
          Save
        </Button>
      </div>
    </div>
  </EditDialog>
);

const PaneControls = ({
  viewerRowCount,
  viewerColCount,
  setIsContentEditorOpen,
  paneControlsVisible,
  setPaneControlsVisible,
  handlePaneControlsClosed,
  updateVertical,
  updateHorizontal,
  sliderValues: { vertical, horizontal },
  dimensions,
  previewHeight,
  setPreviewHeight,
  ...contentEditorProps
}) => (
  <>
    <Root>
      <ButtonGroup>
        <Popover
          css={popoverStyle}
          popoverClassName={Classes.DARK}
          usePortal={false}
          interactionKind="hover"
          position="left-top"
          onClosed={handlePaneControlsClosed}
          modifiers={{
            offset: {
              enabled: true,
              offset: '-5, -70',
            },
            arrow: {
              enabled: false,
            },
            flip: {
              enabled: false,
            },
          }}
          content={
            <ControlBar>
              <Horizontal>
                {/* <Button large className={Classes.MINIMAL} icon="cross" /> */}
                <RangeSlider
                  onChange={updateHorizontal}
                  className={Classes.DARK}
                  min={1}
                  max={viewerColCount + 1}
                  stepSize={1}
                  labelStepSize={1}
                  value={horizontal}
                />
                <GridPreview
                  dimensions={convertSliderValuesToDimensions({
                    vertical,
                    horizontal,
                  })}
                  colCount={viewerColCount}
                  rowCount={viewerRowCount}
                />
              </Horizontal>
              <Vertical>
                <RangeSlider
                  onChange={updateVertical}
                  className={Classes.DARK}
                  min={-viewerRowCount - 1}
                  max={-1}
                  stepSize={1}
                  labelStepSize={1}
                  vertical
                  value={vertical}
                  labelRenderer={Math.abs}
                  css={css`
                    &.bp3-slider.bp3-vertical {
                      height: ${viewerRowCount * 75}px;
                    }
                  `}
                />
              </Vertical>
            </ControlBar>
          }
        >
          <EditButton
            onClick={() => setIsContentEditorOpen(true)}
            intent="primary"
            large
          >
            <Icon icon="cog" iconSize={40} intent="primary" />
          </EditButton>
        </Popover>
      </ButtonGroup>
    </Root>

    <ContentEditorDialog
      {...{
        ...contentEditorProps,
        setIsContentEditorOpen,
      }}
    />
  </>
);

const mapStateToProps = ({
  viewer: { rowCount: viewerRowCount, colCount: viewerColCount },
}) => ({
  viewerRowCount,
  viewerColCount,
});

const mapDispatchToProps = {
  updateContent,
  updatePane,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('isContentEditorOpen', 'setIsContentEditorOpen', false),
  withState('paneControlsVisible', 'setPaneControlsVisible', false),
  withState('previewHeight', 'setPreviewHeight', undefined),
  withStateHandlers(
    ({ dimensions: { rowStart, rowSpan, colStart, colSpan } }) => ({
      sliderValues: {
        // Can't flip sliders and we want to display from top->bottom 1->rows, so use negative rows
        vertical: [-rowStart - rowSpan, -rowStart],
        horizontal: [colStart, colStart + colSpan],
        isDirty: false,
      },
    }),
    {
      updateVertical: ({ sliderValues: { horizontal } }) => ([start, end]) => ({
        sliderValues: {
          horizontal,
          vertical: [start, end],
          isDirty: true,
        },
      }),
      updateHorizontal: ({ sliderValues: { vertical } }) => ([start, end]) => ({
        sliderValues: {
          vertical,
          horizontal: [start, end],
          isDirty: true,
        },
      }),
      commitSliders: ({ sliderValues }) => () => ({
        sliderValues: { ...sliderValues, isDirty: false },
      }),
    }
  ),
  withHandlers(() => {
    let urlField = null;
    let titleField = null;
    let typeField = null;
    let gridPreview = null;
    return {
      handleTitleFieldRef: () => ref => {
        titleField = ref;
      },
      handleUrlFieldRef: () => ref => {
        urlField = ref;
      },
      handleTypeFieldRef: () => ref => {
        typeField = ref;
      },
      handleGridPreviewRef: ({ setPreviewHeight }) => ref => {
        gridPreview = ref;
        setPreviewHeight(gridPreview.clientHeight);
      },
      handlePaneControlsClosed: ({
        paneId,
        updatePane,
        commitSliders,
        sliderValues,
      }) => () => {
        if (!sliderValues.isDirty) {
          return;
        }

        commitSliders();

        // TODO: add an alert before committing https://blueprintjs.com/docs/#core/components/alert
        updatePane(paneId, convertSliderValuesToDimensions(sliderValues));
      },
      calculateVerticalSliderHeight: ({ previewHeight }) => () => {
        return previewHeight ? { height: `${previewHeight}px` } : null;
      },
      handleSaveContent: ({
        paneId,
        updateContent,
        setIsContentEditorOpen,
      }) => () => {
        setIsContentEditorOpen(false);
        updateContent(
          paneId,
          titleField.value,
          urlField.value,
          typeField.value
        );
      },
    };
  })
)(PaneControls);
