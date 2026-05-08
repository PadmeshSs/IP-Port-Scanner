import { Box, Typography, Divider, Skeleton } from "@mui/material";
import {Card} from "../../Components/Card";
import { tokens } from "../../Themes";
import type { Node } from "../Types/Scantype";

type OsdetailsProps = {
    node?: Node;
    loading: boolean;
}
export const renderValue = (loading: boolean, value: string | number) => loading ? <Skeleton sx={{display: 'inline-block'}} width={80} /> : value;

export default function Osdetails({node, loading}: OsdetailsProps) {
    const colors = tokens();
    const derived = {
        os: node?.os || "Unknown",
        ip: node?.ip || "Unknown",
        osFamily:
        node?.os?.toLowerCase().includes("linux")
            ? "Linux"
            : node?.os?.toLowerCase().includes("windows")
            ? "Windows"
            : node?.os?.toLowerCase().includes("mac")
            ? "MacOS"
            : "Unknown",

        confidence:
        node?.os === "Unknown"
            ? 40
            : node?.ports && node?.ports.length > 3
            ? 85
            : 70,

        http: node?.ports?.some(p => p.port === 80 || p.port === 443),
        ssh: node?.ports?.some(p => p.port === 22),

        openPorts: node?.ports?.length
    };

    
        return(
                        <Card
                            sx={{   
                            gridColumn: {xs:'span 4', md: 'span 3', lg: "span 3" },
                            gridRow: {xs:'span 3', md: 'span 3',lg: "span 3" },
                            overflow: 'auto',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            }}
                        >
                            <Box display={'flex'} flexDirection={'column'} sx={{color: colors.text[500]}} gap={2}>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Typography variant="h4" fontWeight={'bold'}>
                                        OS Details:
                                    </Typography>
                                    <Typography variant="h4" fontWeight={'light'}sx={{
                                        letterSpacing: '2px'
                                    }}>
                                        {renderValue(loading,derived.ip)}
                                    </Typography>
                                    
                                </Box>
                                <Divider sx={{
                                    backgroundColor: colors.text[800]
                                }}/>
                                <Box>
                                    <Typography variant="h2" fontWeight={'medium'}>
                                        {renderValue(loading,derived.os)}
                                    </Typography>
                                </Box>
                                <Box display={'flex'} mt={4} flexDirection={'column'} justifyContent={'cetner'} flexGrow={1}>
                                    <Box display={'flex'} flexDirection={'column'} gap={1}>
                                        <Box display={'flex'} justifyContent={'space-between'}>
                                            <Box>
                                                <Typography variant="h6" fontWeight={'medium'}>
                                                    Confidence:
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h5" fontWeight={'medium'} color={'lightgreen'}>
                                                    {renderValue(loading,derived.confidence)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box display={'flex'} justifyContent={'space-between'}>
                                            <Box>
                                                <Typography variant="h6" fontWeight={'medium'}>
                                                    Device Type: 
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h5" fontWeight={'medium'}>
                                                    {renderValue(loading,derived.osFamily)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ mt: '1rem', mb: '1rem', backgroundColor: colors.text[800]}}/>
                                    <Box display={'flex'} flexDirection={'column'} gap={1}>
                                        <Box display={'flex'} justifyContent={'space-between'}>
                                            <Box>
                                                <Typography variant="h6" fontWeight={'medium'}>
                                                    Web Services: 
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h5" fontWeight={'medium'}>
                                                    {loading ? (
                                                        <Skeleton width={60} />
                                                    ) : derived.http ? (
                                                        "Detected"
                                                    ) : (
                                                        "Not Detected"
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box display={'flex'} justifyContent={'space-between'}>
                                            <Box>
                                                <Typography variant="h6" fontWeight={'medium'}>
                                                    SSH: 
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h5" fontWeight={'medium'}>
                                                    {loading ? (
                                                        <Skeleton width={60} />
                                                    ) : derived.ssh ? (
                                                        "Enabled"
                                                    ) : (
                                                        "Not Available"
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box display={'flex'} justifyContent={'space-between'}>
                                            <Box>
                                                <Typography variant="h6" fontWeight={'medium'}>
                                                    Active Network Ports: 
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h5" fontWeight={'medium'}>
                                                    {renderValue(loading, derived.openPorts ?? 0)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    
                                </Box>
                                
                            </Box>
                        </Card>
        );
}