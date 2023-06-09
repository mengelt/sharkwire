import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import { Avatar, Box, ButtonBase, SvgIcon } from '@mui/material';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';

export const AccountButton = () => {
  const user = useMockedUser();
  const popover = usePopover();

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'divider',
          height: 40,
          width: 40,
          borderRadius: '50%'
        }}
      >

      </Box>

    </>
  );
};
