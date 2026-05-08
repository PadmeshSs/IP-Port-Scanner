import { Box, Divider, Typography } from "@mui/material";
import { Card } from "../../Components/Card";
import { tokens } from "../../Themes";
import type { Summary } from "../Types/Scantype";
import { renderValue } from "./Osdetails";

type ScansummaryProps = {
    summary?: Summary;
    loading: boolean;
    scantype?: 'Quick' | 'Full' | 'Standard';
}

const formatTime = (timeStr: string): string => {
  const seconds = parseFloat(timeStr.replace("s", ""));

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }

  return `${secs}s`;
};

export default function Scansummary({ summary, loading, scantype }: ScansummaryProps) {
    const colors = tokens();
    return(
        <Card sx={{
            gridColumn: {xs:'span 4',md: 'span 5', lg: "span 3" },
            gridRow: {xs:'span 3',md: 'span 2',lg: "span 2" }
            }}>
            <Box display={'flex'} flexDirection={'column'} sx={{color: colors.text[500]}} gap={2}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{color: colors.text[500]}}>
                    <Typography variant="h4" fontWeight={'bold'}>
                        Scan Summary:
                    </Typography>             
                </Box>
                <Divider sx={{
                    height: '1px',
                    backgroundColor: colors.text[800]
                }}/>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} flexGrow={1} gap={2}>
                    <Box display={'flex'} flexDirection={'column'} >
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box>
                                <Typography variant="h6" fontWeight={'medium'}>
                                    Scan Type: 
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight={'medium'}>
                                    {renderValue(loading, scantype ?? 'N/A')}
                                </Typography>
                            </Box>
                        </Box>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box>
                                <Typography variant="h6" fontWeight={'medium'}>
                                    Hosts:
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight={'medium'}>
                                    {renderValue(loading, summary?.hosts ?? 0)}
                                </Typography>
                            </Box>
                        </Box>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box>
                                <Typography variant="h6" fontWeight={'medium'}>
                                    Open Ports: 
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight={'medium'}>
                                    {renderValue(loading, summary?.open_ports ?? 0)} / {renderValue(loading, summary?.total_ports ?? 0)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box>
                                <Typography variant="h6" fontWeight={'medium'}>
                                    Status:
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight={'medium'} color={summary?.status === "running" ? "yellow" : summary?.status === "completed" ? "lightgreen" : "OrangeRed"}>
                                    {renderValue(loading, summary?.status ?? 'N/A')}
                                </Typography>
                            </Box>
                        </Box>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box>
                                <Typography variant="h6" fontWeight={'medium'}>
                                    Time Taken: 
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight={'medium'}>
                                    {renderValue(loading, summary?.time_taken ? formatTime(summary.time_taken) : 'N/A')}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}