import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton
} from '@backstage/core-components';



export const ExampleComponent = () => {
  const [tableData, setTableData] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:7007/api/my-plugin/developer-portal').then((res) => res.json())

    setTableData(response.data.data)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log(tableData);

  }, [tableData])

  return <Page themeId="tool">
    <Header title="Welcome to ABB Developer Portal! ">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Plugin title">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">OpenShift MS name</TableCell>
                  <TableCell align="right">Creation date</TableCell>
                  <TableCell align="right">Last activity date</TableCell>
                  <TableCell align="right">Sonar status</TableCell>
                  <TableCell align="right">Tribe</TableCell>
                  <TableCell align="right">Web url</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((data: any) => (
                  <TableRow
                    key={data.id}
                  >
                    <TableCell component="th" scope="row">
                      {data.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.name}
                    </TableCell>
                    <TableCell align="right">{data.msNameOpenShift}</TableCell>
                    <TableCell align="right">{data.createdAt}</TableCell>
                    <TableCell align="right">{data.lastActivityAt}</TableCell>
                    <TableCell align="right">{data.sonarStatus}</TableCell>
                    <TableCell align="right">{data.tribe}</TableCell>
                    <TableCell align="right">{data.webUrl}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item>

        </Grid>
      </Grid>
    </Content>
  </Page>
};
