import { Box, Skeleton, Typography } from "@mui/material";
import { Card } from "../../Components/Card";
import { tokens } from "../../Themes";
import Tables from "../../Components/Tables";
import type { Node, Hosts, Port } from "../Types/Scantype";

type HostoverviewProps = {
    loading?: boolean,
    node?: Node[]
};


export default function Hostoverview({ loading, node }: HostoverviewProps) {
    const colors = tokens();
    const getHostRisk = (ports: Port[]): "Safe" | "Warning" | "Danger" => {
        if (ports.some(p => p.risk === "high")) return "Danger";
        if (ports.some(p => p.risk === "medium")) return "Warning";
        return "Safe";
    };
    const derivedHosts: Hosts[] = node && node.map((n) => ({
        ip: n.ip,
        ports: n.ports.length,
        OS: n.os,
        risk: getHostRisk(n.ports) // Replace with actual risk assessment logic
    })) || [];


    return(
            <Card sx={{
                gridColumn: {xs:'span 4',md:'span 6', lg: 'span 4'},
                gridRow: {xs:'span 3',md: 'span 2',lg: 'span 2'}
            }}>
                <Box display={'flex'} flexDirection={'column'} gap={2} sx={{
                    overflow: 'auto',
                    color: colors.text[500]
                }}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant="h4" fontWeight={'bold'}>
                            Host Overview
                        </Typography>                                
                    </Box>
                    {derivedHosts.length > 0 ? <Tables type="Hosts" values={derivedHosts as Hosts[]}/> : 
                        !loading ? 
                            <Typography variant="h6" color={colors.text[800]} fontStyle={'italic'}>
                                No host data available. Start a scan to see the host overview here.
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