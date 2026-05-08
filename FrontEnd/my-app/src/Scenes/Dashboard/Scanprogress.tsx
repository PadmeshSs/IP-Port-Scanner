import { LinearProgress, Box, Typography } from "@mui/material";
import { tokens } from "../../Themes";
type ProgressProps = {
    progress: number;
    status:  'running' | 'completed' | 'error';
}

export default function Scanprogress({progress, status}: ProgressProps) {
    const colors = tokens();
    const getcolor = (status: 'running' | 'completed' | 'error') => {
        if(status === 'running') return 'yellow';
        if(status === 'completed') return 'lightgreen';
        if(status === 'error') return 'red';
        return colors.text[500];
    }
    return(
        <Box display={'flex'} flexDirection={'column'} gap={2} sx={{color: colors.text[500]}}>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                height: 20,
                backgroundColor: "#1e293b",
                "& .MuiLinearProgress-bar": {
                    backgroundColor: getcolor(status),
                },
                }}
            />
        </Box>

    );
}