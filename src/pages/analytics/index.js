import { useState, useEffect } from 'react';
import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import numeral from 'numeral';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { OverviewBanner } from 'src/sections/dashboard/overview/overview-banner';
import { OverviewDoneTasks } from 'src/sections/dashboard/overview/overview-done-tasks';
import { OverviewEvents } from 'src/sections/dashboard/overview/overview-events';
import { OverviewInbox } from 'src/sections/dashboard/overview/overview-inbox';
import { OverviewTransactions } from 'src/sections/dashboard/overview/overview-transactions';
import { OverviewPendingIssues } from 'src/sections/dashboard/overview/overview-pending-issues';
import { OverviewSubscriptionUsage } from 'src/sections/dashboard/overview/overview-subscription-usage';
import { OverviewHelp } from 'src/sections/dashboard/overview/overview-help';
import { OverviewJobs } from 'src/sections/dashboard/overview/overview-jobs';
import { OverviewOpenTickets } from 'src/sections/dashboard/overview/overview-open-tickets';
import { OverviewTips } from 'src/sections/dashboard/overview/overview-tips';
import { useLocation } from 'react-router-dom';
import { AnalyticsStats } from 'src/sections/dashboard/analytics/analytics-stats';
import { bytesToSize } from 'src/utils/bytes-to-size';
import { UDP_PORTS } from 'src/consts';

const Page = (stuffers) => {

  const [avgPacketSize, setAvgPacketSize] = useState([0,0,0,0,0,0,0,0,0]);
  const [totalPacketSize, setTotalPacketSize] = useState(0);

  const [totalFrameCount, setTotalFrameCount] = useState(0);
  const [susPortFrames, setSusPortFrames] = useState([]);
  const [togglePorts, setTogglePorts] = useState(false);

  let { state } = useLocation()
  const settings = useSettings();

  

  useEffect(() => {    
    averagePacketSize();
    suspiciousUdpPorts();
  }, [])

  const togglePortsTable = () => {
    setTogglePorts(!togglePorts)
  }

  function suspiciousUdpPorts() {

    let commonUdpPorts = UDP_PORTS.map(m => m.port);

    let filteredFrames = state.filter(f => f !== null);

    let udpFrames = filteredFrames.filter(f => 'udp' in f);

    let seenPorts = [...new Set(udpFrames.map(m => m.udp.destinationPort))];

    let susPorts = seenPorts.filter(f => commonUdpPorts.includes(f) === false);
    
    let susFrames = udpFrames.filter(f => susPorts.includes(f.udp.destinationPort));

  
    setSusPortFrames(susFrames)

  }

  function averageByGroupSize(data, groupSize) {
    if (groupSize <= 0) {
      throw new Error('Group size must be a positive integer.');
    }
  
    if (data.length === 0) {
      throw new Error('Data array must not be empty.');
    }
  
    const numberOfGroups = Math.ceil(data.length / groupSize);
    const result = [];
  
    
    for (let i = 0; i < numberOfGroups; i++) {
      const startIndex = i * groupSize;
      const endIndex = Math.min(startIndex + groupSize, data.length);
      const currentGroup = data.slice(startIndex, endIndex);
      
      const groupSum = currentGroup.reduce((acc, val) => acc + val, 0);
      const groupAverage = groupSum / currentGroup.length;
  
      result.push(groupAverage);
    }
    
    return result;
  }

  const averagePacketSize = () => {
    if ( Array.isArray(state) === false || state.length === 0 ) {
      return [0,0,0,0,0,0,0,0];
    } else {
      
      // some frames do not have a length
      let filteredFrames = state.filter(f => f !== null && 'length' in f);
      let badFilteredFrames = state.filter(f => f == null);
            
      let data = filteredFrames.map(m => m.length);
      
      let dataPoints = averageByGroupSize( data, parseInt(data.length/10) );
      
      let totalSize = filteredFrames.reduce( (prev, curr) => prev + curr.length, 0);

      setTotalPacketSize(totalSize);

      setAvgPacketSize(dataPoints);
      setTotalFrameCount(filteredFrames.length + badFilteredFrames.length);



    }

  }

  const showUdpTable = () => {
    return (
      <Card>
      <CardHeader
        title="Suspicious Inbound UDP Ports"
      />

        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                Frame #
              </TableCell>
              <TableCell>
                Dest. Port
              </TableCell>
              <TableCell>
                Payload Size
              </TableCell>
              <TableCell>
                Reference
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {susPortFrames.map((frame, idx) => {
              
              return (
                <TableRow
                  key={`_${idx}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    {frame.id}
                  </TableCell>
                  <TableCell>
                    {frame.udp.destinationPort}
                  </TableCell>
                  <TableCell>
                    {frame.udp.payload === null ? '0' : frame.udp.payload.length }
                  </TableCell>
                  <TableCell>
                    <a href={`https://www.speedguide.net/port.php?port=${frame.udp.destinationPort}`} target="_blank" rel="noreferrer">Look Up</a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      
    </Card>

    )
  }

  return (
    <>
      <Seo title="Dashboard: Upload" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Analytics
                  </Typography>
                </div>

              </Stack>
            </Grid>

            <Grid
              xs={12}
              md={4}
            >
              <AnalyticsStats
                action={(
                  <Button
                    color="inherit"
                    endIcon={(
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    )}                    
                    size="small"
                  >
                    See details
                  </Button>
                )}
                chartSeries={[
                  {
                    data: [0, 170, 242, 98, 63, 56, 85, 171, 209, 163, 204, 21, 264, 0]
                  }
                ]}
                title="Frames"
                value={totalFrameCount}
              />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <AnalyticsStats
                action={(
                  <Button
                    color="inherit"
                    endIcon={(
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    )}
                    size="small"
                  >
                    See details
                  </Button>
                )}
                chartSeries={[
                  {
                    data: avgPacketSize
                  }
                ]}
                title="Data Transfer"
                value={`${bytesToSize(totalPacketSize)}`}
              />
            </Grid>            

            <Grid
              xs={12}
              md={4}
            >
              <AnalyticsStats
                action={(
                  <Button
                    color="inherit"
                    endIcon={(
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    )}
                    size="small"
                    onClick={togglePortsTable}
                  >
                    See details
                  </Button>
                )}
                chartSeries={[]}
                title="Suspicious Ports"
                value={`${[...new Set(susPortFrames.map(m => m.udp.destinationPort))].length} Ports`}
              />
              
            </Grid>            
            <Grid
              xs={12}
              md={4}
            >
              <AnalyticsStats
                action={(
                  <Button
                    color="inherit"
                    endIcon={(
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    )}
                    size="small"
                  >
                    See details
                  </Button>
                )}
                chartSeries={[]}
                title="Suspicious Countries"
                value="1 Country"
              />
            </Grid>  
          </Grid>

          <br />
          {togglePorts && showUdpTable()}

        </Container>
      </Box>
    </>
  );
};

export default Page;
