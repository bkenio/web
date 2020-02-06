import { gql } from 'apollo-boost';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Label, Icon, Loader } from 'semantic-ui-react';

function timeConversion(startTime, completeTime) {
  const millisec = new Date(completeTime).getTime() - new Date(startTime).getTime();
  const seconds = (millisec / 1000).toFixed(1);
  const minutes = (millisec / (1000 * 60)).toFixed(1);
  const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return `${seconds} Sec`;
  }
  if (minutes < 60) {
    return `${minutes} Min`;
  }
  if (hours < 24) {
    return `${hours} Hrs`;
  }
  return `${days} Days`;
}

export default props => {
  const GET_VIDEO = gql`
    {
      video(id: "${props.id}") {
        id
        status
        files {
          status,
          preset,
          createdAt,
          modifiedAt,
          percentCompleted
        }
      }
    }
  `;

  const { loading, data, error, startPolling } = useQuery(GET_VIDEO);

  if (error) console.log(error);
  if (loading) return <Loader active />;

  if (data) {
    if (data.video.status !== 'completed') startPolling(2000);
    return data.video.files.map(({ status, preset, createdAt, modifiedAt, percentCompleted }) => {
      return (
        <div key={preset} style={{ margin: '5px 0px 5px 0px' }}>
          <Label as='a' color='grey'>
            {status === 'completed' ? (
              <Icon color='green' name='check circle outline' />
            ) : (
              <Icon color='yellow' name='setting' />
            )}
            {preset}
            <Label.Detail>{`${percentCompleted}%`}</Label.Detail>
            {createdAt && modifiedAt ? (
              <Label.Detail>{`took ${timeConversion(createdAt, modifiedAt)}`}</Label.Detail>
            ) : null}
          </Label>
        </div>
      );
    });
  }
};