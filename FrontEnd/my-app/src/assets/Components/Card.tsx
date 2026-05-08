import { Box } from '@mui/material';
import { tokens } from '../Themes';

export function Card({ children, ...props }: any) {
    const colors = tokens();
  return (
    <Box
      bgcolor={colors.box[500]}
      p={2}
      display={'grid'}
      {...props}
    >
      {children}
    </Box>
  );
}