/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutHeader,
  EuiHorizontalRule,
  EuiSpacer,
  EuiTab,
  EuiTabs,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import { isEmpty } from 'lodash';
import { ALERT_RISK_SCORE, ALERT_SEVERITY } from '@kbn/rule-data-utils';
import type { Severity } from '@kbn/securitysolution-io-ts-alerting-types';
import { PreferenceFormattedDate } from '../../../../common/components/formatted_date';
import { SeverityBadge } from '../../../../detections/components/rules/severity_badge';
import { tabs } from './tabs';
import type { EventPanelPaths } from '../panel-model';
import { useExpandableFlyoutContext } from '../../../context';
import { EVENT_DETAILS, RISK_SCORE_TITLE, SEVERITY_TITLE } from './translations';
import { useEventDetailsPanelContext } from './context';
import { useBasicDataFromDetailsData } from '../../utils/helpers';

export const EventHeader = React.memo(
  ({
    selectedTabId,
    setSelectedTabId,
    handleOnEventClosed,
  }: {
    selectedTabId: EventPanelPaths;
    setSelectedTabId: (selected: EventPanelPaths) => void;
    handleOnEventClosed?: () => void;
  }) => {
    const { searchHit } = useEventDetailsPanelContext();
    const { _id, _index } = searchHit ?? {};
    const { openPanels } = useExpandableFlyoutContext();
    const openAlertDetails = () => {
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
    const expandButton = (
      <EuiButtonEmpty iconSide="left" onClick={openAlertDetails} iconType="arrowStart">
        EXPAND_DETAILS_BUTTON
      </EuiButtonEmpty>
    );

    const { dataFormattedForFieldBrowser, getFieldsData } = useEventDetailsPanelContext();
    const { isAlert, ruleName, timestamp } = useBasicDataFromDetailsData(
      dataFormattedForFieldBrowser
    );
    const alertRiskScore = getFieldsData(ALERT_RISK_SCORE) as string;
    const alertSeverity = getFieldsData(ALERT_SEVERITY) as Severity;
    const titleSection = (
      <>
        <EuiTitle size="s">
          <h4>{isAlert && !isEmpty(ruleName) ? ruleName : EVENT_DETAILS}</h4>
        </EuiTitle>
        <EuiSpacer size="m" />
        {timestamp && <PreferenceFormattedDate value={new Date(timestamp)} />}
        <EuiSpacer size="m" />
        <EuiFlexGroup direction="row" gutterSize="l">
          <EuiFlexItem grow={false}>
            <EuiFlexGroup alignItems="center" direction="row" gutterSize="xs">
              <EuiTitle size="xxs">
                <h5>{`${SEVERITY_TITLE}:`}</h5>
              </EuiTitle>
              <SeverityBadge value={alertSeverity} />
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup alignItems="center" direction="row" gutterSize="xs">
              <EuiTitle size="xxs">
                <h5>{`${RISK_SCORE_TITLE}:`}</h5>
              </EuiTitle>
              <span>{alertRiskScore}</span>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </>
    );

    const onSelectedTabChanged = (id: EventPanelPaths) => setSelectedTabId(id);
    const renderTabs = tabs.map((tab, index) => (
      <EuiTab
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        key={index}
      >
        {tab.name}
      </EuiTab>
    ));

    return (
      <EuiFlyoutHeader>
        <EuiFlexGroup>
          <EuiFlexItem>{expandButton}</EuiFlexItem>
        </EuiFlexGroup>
        <EuiHorizontalRule margin="none" />
        <EuiFlexGroup>
          <EuiFlexItem>{titleSection}</EuiFlexItem>
        </EuiFlexGroup>
        <EuiHorizontalRule margin="none" />
        <EuiTabs size="l" expand>
          {renderTabs}
        </EuiTabs>
      </EuiFlyoutHeader>
    );
  }
);

EventHeader.displayName = 'EventHeader';
