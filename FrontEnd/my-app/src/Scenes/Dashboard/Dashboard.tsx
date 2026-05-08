import { Box, Button } from "@mui/material";
import { tokens } from "../../Themes";
import { Card } from "../../Components/Card";
import Progressbar from "./Progress";
import LiveScan from "./LiveScan";
import Osdetails from "./Osdetails";
import Scansummary from "./Scansummary";
import Scanresult from "./Scanresult";
import Scanhistory from "./Scanhistory";
import Hostoverview from "./Hostoverview";
import { useState, useEffect } from "react";
import { startscan, getscan } from "../Api/Scan";
import type { Node, ScanData, scantypes } from "../Types/Scantype";
import { exportCSV, exportJSON } from "../../Components/Export";


export default function Dashboard() {

    type ProgressStatus = 'running' | 'completed' | 'error';
    const [Status, setstatus] = useState<ProgressStatus>('running');
    const colors = tokens();
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [target, setTarget] = useState<string>('');
    const [scanId, setScanId] = useState<string | null>(null);
    const [scanData, setScanData] = useState<ScanData | null>(null);

    const handlestartscan = async (target: string, scantype: scantypes) => {
        setIsLoading(true);
        setTarget(target);
        const res = await startscan(target, scantype);
        if ('error' in res) {
            alert(res.error);
            setIsLoading(false);
            return;
        }
        setScanId(res.scan_id);
    }

    useEffect(() => {
        if (!scanId) return;
        const interval = setInterval(async () => {
            const data: ScanData = await getscan(scanId);
            setScanData(data);
            console.log("Fetched scan data:", data);
            if(data.status === "completed" || data.status === "error"){
                clearInterval(interval);
                setstatus(data.status);
                setIsLoading(false);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [scanId]);

    const node: Node | undefined = scanData?.nodes?.[0];
    
  return (
        <Box p="20px" display="flex" flexDirection="column" flex={1}>
        <Box
            display="grid"
            gridTemplateColumns={{
            xs: "repeat(4, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(8, 1fr)",
            lg : "repeat(12, 1fr)",
            }}
            gridAutoRows={{
                xs: 'auto',
                md: '100px'
            }}
            gap="20px"
            flex={1}
        >

            {/* Progress bar */}
            <Progressbar scantype={scanData?.scan_type} handlestartscan={handlestartscan} progress={scanData?.logs} Status={Status} isloading={isloading} target={target} settarget={setTarget}/>

            {/* OS details */}
            <Osdetails node={node} loading={isloading}/>

            {/* Scan Summary */}
            <Scansummary scantype={scanData?.scan_type} summary={scanData?.summary} loading={isloading}/>


            {/* Live Scan */}
            <LiveScan loading={isloading} logs={scanData?.logs}/>

            {/* Scan History */}
            <Scanhistory data={scanData} loading={isloading}/>

            {/* Scan result */}
            <Scanresult loading={isloading} node={scanData?.nodes}/>

            {/* Host overview */}
            <Hostoverview loading={isloading} node={scanData?.nodes}/>

            <Card sx={{
                gridColumn: {xs:'span 4',md: 'span 2',lg: 'span 3'},
                gridRow: {xs:'span 2',md: 'span 2',lg: 'span 1'},

            }}>
                <Box display={'flex'} height={'100%'} color={colors.text[500]} flexDirection={'column'} gap={2} justifyContent={'center'}>
                        <Button variant="contained" sx={{
                            backgroundColor: 'lightgreen',
                            border: '1px solid lightgreen',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: 'lightgreen',
                                opacity: 0.8,
                            }
                        }} size="small" onClick={() => exportJSON(scanData!)}>
                            Export as JSON
                        </Button>
                         <Button variant="contained" sx={{
                            backgroundColor: 'transparent',
                            color: 'lightgreen',
                            border: '1px solid lightgreen',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'lightgreen',
                                color: 'black',
                                opacity: 0.8,
                            }
                        }} size="small" onClick={() => exportCSV(scanData!)}>
                            Export as CSV
                        </Button>
                </Box>
            </Card>
        </Box>           
        </Box>
  );
}