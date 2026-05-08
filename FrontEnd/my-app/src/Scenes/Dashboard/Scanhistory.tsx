import { Box, Skeleton, Typography } from "@mui/material";
import { Card } from "../../Components/Card";
import { tokens } from "../../Themes";
import Tables from "../../Components/Tables";
import type { ScanData, History } from "../Types/Scantype";
import { useEffect, useState } from "react";


type Scanhistoryprops={
    data: ScanData | null;
    loading: boolean;
}

export default function Scanhistory({data, loading}: Scanhistoryprops) {
    const colors = tokens();
    const [localdata, setlocaldata] = useState<History[]>(() => {
    const stored = localStorage.getItem("data");
    return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        if (!data) return;

        if (data.status === "running") return; 

        setlocaldata((prev) => [
            ...prev,
            {
            target: data.target,
            type: data.scan_type,
            status: data.status,
            },
        ]);
    }, [data]);

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(localdata));
    }, [localdata]);

    return(
            <Card
                sx={{
                gridColumn: {xs:'span 4',sm:'span 2',md: 'span 4', lg: "span 3" },
                gridRow: {xs:'span 2',md: 'span 2', lg: "span 2" }
                }}
            >
                <Box display={'flex'} flexDirection={'column'} gap={2} sx={{
                    overflowX: 'auto',
                    iverflowY: 'hidden',
                    color: colors.text[500]
                }}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant="h4" fontWeight={'bold'}>
                            Scan History
                        </Typography>                                
                    </Box>
                    {localdata.length > 0 ? <Tables type="history" values={localdata as History[]}/> : 
                                !loading ? 
                                    <Typography variant="h6" color={colors.text[800]} fontStyle={'italic'}>
                                        No scan history available. Start a scan to see the results here.
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