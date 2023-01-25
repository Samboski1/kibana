/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { ALERT_RISK_SCORE, ALERT_SEVERITY } from '@kbn/rule-data-utils';
import type { Severity } from '@kbn/securitysolution-io-ts-alerting-types';
import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiTitle } from '@elastic/eui';
import { isEmpty } from 'lodash';
import { useBasicDataFromDetailsData } from '../../../utils/helpers';
import { useEventDetailsPanelContext } from '../context';
import { EVENT_DETAILS, RISK_SCORE_TITLE, SEVERITY_TITLE } from '../translations';
import { PreferenceFormattedDate } from '../../../../../common/components/formatted_date';
import { SeverityBadge } from '../../../../../detections/components/rules/severity_badge';

export const HeaderTitle = React.memo(() => {
  const { dataFormattedForFieldBrowser, getFieldsData } = useEventDetailsPanelContext();
  const { isAlert, ruleName, timestamp } = useBasicDataFromDetailsData(
    dataFormattedForFieldBrowser
  );
  const alertRiskScore = getFieldsData(ALERT_RISK_SCORE) as string;
  const alertSeverity = getFieldsData(ALERT_SEVERITY) as Severity;

  return (
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
});

HeaderTitle.displayName = 'HeaderTitle';
