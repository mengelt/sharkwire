import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Container,
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

const now = new Date();

const Page = () => {
  const settings = useSettings();


  return (
    <>
      <Seo title="Dashboard: Overview" />
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
                    Overview
                  </Typography>
                </div>
                <div>
                  <Stack
                    direction="row"
                    spacing={4}
                  >
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.upload}
                  underline="none"
                >
                    
                    <Button
                      startIcon={(
                        <SvgIcon>
                          <PlusIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                    >
                      Upload PCAP
                    </Button>
                    </Link>                    
                  </Stack>
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
                    title="About SharkWire"
                    subheader="SharkWire reads WireShark .pcap files to simplify forensics around Indicators of Compromise"
                    
                  />
                  <CardContent>
                  <strong>Capabilties:</strong>
                  <ul>
                    <li>Parsing WireShark .pcap files (v2.4), (.pcapng not supported)</li>
                    <li>Visually represent packet size over time</li>
                    <li>Identify when packets come from certain countries</li>
                    <li>Identify activity on suspicious ports</li>
                  </ul>
                  </CardContent>

                </Card>
        </Grid>

        </Container>
      </Box>
    </>
  );
};

export default Page;
