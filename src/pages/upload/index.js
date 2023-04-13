import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import axios from 'axios';
import React, { useState } from 'react';
import { RouterLink } from 'src/components/router-link';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
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
import { wait } from 'src/utils/wait';
import { parseFile } from 'src/parser/frameParser';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';

const now = new Date();

const Page = () => {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [frames, setFrames] = useState([])
  const [error, setError] = useState("");
  const router = useRouter();

  const settings = useSettings();

  
  const handleFileProcess = async (e) => {

    setStatus("Loading file...")
    await wait(1500);
    
    if (!e.target.files) {
      console.info('no fails, bailing')
      return;
    }
    const file = e.target.files[0];
    const { name } = file;

    const form = new FormData();
    form.append('name', name);
    form.append('file', file);
  
    setFrames([]);
    setBusy(true);
    await wait(1000);
    await axios.post('http://localhost:5000/upload', form, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(serverResponse => {

      setFrames(serverResponse.data)
      setSuccess(true);
      setStatus("Frame data parsed!")
      console.info({serverResponse})

    }).catch((e) => {
      setStatus("An unexpected error occurred :(")
    }).finally(() => {
      setBusy(false);
    })
  
    

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
                    Upload PCAP
                  </Typography>
                </div>

              </Stack>
            </Grid>
          </Grid>
          
<br />

          <Grid 
              xs={12}
              md={7}>
                <Card  elevation={16}>
                  <CardHeader
                    title="File Upload"
                    subheader="Please note that pcapng files can not be parsed at this time."
                    
                  />
                  <CardContent>
                    
                    <span style={{fontSize: '0.9em', fontWeight: 'bold'}}>{status}</span><br />
                    {busy === true && <LinearProgress />}
                    <br />
                    
                        {!success && 
                            <Button
                              disabled={busy}
                              variant="contained"
                              component="label"
                            >
                            Select File
                            <input
                              type="file"
                              accept=".pcap"
                              onChange={handleFileProcess}
                              hidden
                            />
                          </Button>
                        }
                        {success &&
                            
                            <Link
                              to={paths.dashboard.analytics}
                              state={frames}>

                            <Button
                              
                              variant="contained"
                                                            
                          >
                          View Analysis
                        </Button>                        
                        </Link>
                        }

                  </CardContent>

                </Card>
        </Grid>

        </Container>
      </Box>
    </>
  );
};

export default Page;
