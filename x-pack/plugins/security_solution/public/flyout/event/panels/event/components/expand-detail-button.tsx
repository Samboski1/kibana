/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiButtonEmpty } from '@elastic/eui';
import React from 'react';
import { useEventDetailsPanelContext } from '../context';
import { useExpandableFlyoutContext } from '../../../../context';
import { COLLAPSE_DETAILS_BUTTON, EXPAND_DETAILS_BUTTON } from '../translations';

export const ExpandDetailButton = React.memo(() => {
  const { closePanels, openPanels, panels } = useExpandableFlyoutContext();
  const isExpanded: boolean = panels.left != null;

  const { searchHit } = useEventDetailsPanelContext();
  const { _id, _index } = searchHit ?? {};
  if (!_id || !_index) return <></>;

  const expandAlertDetails = () => {
    openPanels({
      left: {
        key: 'visualize',
        params: {
          id: _id,
          indexName: _index,
        },
      },
    });
  };

  const collapseAlertDetails = () => {
    closePanels({
      left: undefined,
    });
  };

  return isExpanded ? (
    <EuiButtonEmpty iconSide="left" onClick={collapseAlertDetails} iconType="arrowEnd">
      {COLLAPSE_DETAILS_BUTTON}
    </EuiButtonEmpty>
  ) : (
    <EuiButtonEmpty iconSide="left" onClick={expandAlertDetails} iconType="arrowStart">
      {EXPAND_DETAILS_BUTTON}
    </EuiButtonEmpty>
  );
});

ExpandDetailButton.displayName = 'ExpandDetailButton';
