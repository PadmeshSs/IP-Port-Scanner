import { Box, Typography } from "@mui/material";
import { Card } from "../../Components/Card";
import { tokens } from "../../Themes";
import Tables from "../../Components/Tables";
import type { Node, results } from "../Types/Scantype";
import { Skeleton } from "@mui/material";


type ScanresultProps = {
    loading: boolean;
    node?: Node[];
}

export default function Scanresult({loading, node}: ScanresultProps) {
    const colors = tokens();


    const rows_3: results[] = node && node.flatMap((n) => n.ports.map((port) => ({
        port: port.port,
        service: port.service,
        version: port.version ? port.version : 'Unknown',
        risk: port.risk
    }))) || [];


    return(
            <Card sx={{
                gridColumn: {xs:'span 4',md: 'span 8',lg: 'span 5'},
                gridRow: {xs:'span 3',md: 'span 2',lg: 'span 2'}
            }}>
                <Box display={'flex'} flexDirection={'column'} gap={2} sx={{
                    overflow: 'auto',
                    color: colors.text[500]
                }}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant="h4" fontWeight={'bold'}>
                            Scan Result
                        </Typography>                                
                    </Box>
                        {rows_3.length > 0 ? <Tables type="results" values={rows_3 as results[]}/> : 
                                !loading ? 
                                    <Typography variant="h6" color={colors.text[800]} fontStyle={'italic'}>
                                        No scan results available. Start a scan to see the results here.
                                    </Typography> : (
                                        <Box width={'100%'} display={'flex'} flexDirection={'column'} gap={1}>
                                            <Skeleton variant="rectangular" width={'100%'} height={40} />
                                            <Skeleton variant="rectangular" width={'100%'} height={40} />
                                            <Skeleton variant="rectangular" width={'100%'} height={40} />
                                        </Box>
                                    )

                        }
                </Box>
            </Card>
    );}