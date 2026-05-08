import { Card } from "../../Components/Card";
import { tokens } from "../../Themes";
import { Box, Typography, Skeleton } from "@mui/material";
import Tables from "../../Components/Tables";


type logs = {
    time: string;
    message: string;
}
type LiveScanProps = {
    logs?: logs[];
    loading: boolean;
}

export default function LiveScan({logs, loading}: LiveScanProps){
    const colors = tokens();
    type log = {
        id: string;
        msg: string;
        time: string;
    };
    const rows_1: log[] = [];
    logs?.map((log) => {
        rows_1.push({
            id: '[+]',
            msg: log.message,
            time: log.time
        });
    }
    );
    return(
        <>
            <Card sx ={{
                gridColumn: {xs:'span 4',sm:'span 2',md: 'span 4',lg: "span 6"},
                gridRow: {xs:'span 2',md: 'span 2', lg: "span 2"},
                color: colors.text[500]
                }}>
                <Box width={'100%'} display={'flex'} flexDirection={'column'} overflow={'auto'} gap={2}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant="h4" fontWeight={'bold'}>
                            Live Scan Log
                        </Typography>
                        <Typography color={`${colors.text[800]}`} variant="h5" fontWeight={'medium'}>
                           Today - {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                    </Box>
                    <Box display={'flex'} flex={1} sx={{
                        overflowY: 'auto',
                    }}>
                        {logs ? <Tables type="log" values={rows_1}/> : 
                            !loading ? 
                                <Typography variant="h6" color={colors.text[800]} fontStyle={'italic'}>
                                    No logs available. Start a scan to see live updates.
                                </Typography> : (
                                    <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={1}>
                                        <Skeleton variant="rectangular" width={'100%'} height={40} />
                                        <Skeleton variant="rectangular" width={'100%'} height={40} />
                                        <Skeleton variant="rectangular" width={'100%'} height={40} />
                                    </Box>
                                )

                            }
                    </Box>
                </Box>
            </Card>
        </>
    );
}