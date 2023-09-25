import React from "react";
import { Grid, Typography } from '@material-ui/core';
import { Content, InfoCard, Progress, ResponseErrorPanel } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useAsync } from 'react-use';
import { discoveryApiRef, useApi } from '@backstage/core-plugin-api';


const GitHubProxyComponent = () => {

  const discoveryApi = useApi(discoveryApiRef);
  
   const proxyBackendBaseUrl = discoveryApi.getBaseUrl('proxy');
   console.log(proxyBackendBaseUrl);
  
    const { value, loading, error } = useAsync(async () => {
      const response = await fetch (`${ await proxyBackendBaseUrl}/github/user`);
      console.log(response);
      const data = await response.json();
      return data;
    }, []);
  
    if (loading) {
      return <Progress />;
    } else if (error) {
      return <ResponseErrorPanel error={error} />;
    }
  
    return <div>Logged in user : {value.login}</div>;
  
  }



export const EntityOverviewCard = () => {

    const { entity } = useEntity();

return (

    <Content>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Information card">
            <Typography variant="body1">            
              You are on EntityPage of {entity.metadata.name}
            </Typography>
            <GitHubProxyComponent/>
          </InfoCard>
        </Grid>
      </Grid>
    </Content>
    );
};