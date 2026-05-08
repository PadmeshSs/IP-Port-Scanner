import { tokens } from "../../Themes";
import { Card } from "../../Components/Card";
import { Box, Typography, Input } from "@mui/material";
import Scanprogress from "./Scanprogress";
import type { logs, scantypes } from "../Types/Scantype";
import CustomizedMenus from "../../Components/Menu";

type ProgressbarProps = {
    isloading: boolean;
    Status: 'running' | 'completed' | 'error';
    progress?: logs[];
    target: string;
    scantype?: 'Quick' | 'Standard' | 'Full';
    settarget: (target: string) => void;
    handlestartscan: (target: string, scantype: scantypes) => void;
}

const getProgress = (logs: logs[] = []) => {
  if (logs.some(l => l.message.includes("completed")) || logs.some(l => l.message.includes('Ending'))) return 100;
  if (logs.some(l => l.message.includes("Scanning host"))) return 70;
  if (logs.some(l => l.message.includes("Found"))) return 40;
  if (logs.some(l => l.message.includes("Discovering"))) return 20;

  return 10;
};



const isValidTarget = (input: string) => {
  const trimmed = input.trim();

  return (
    trimmed.length > 3 &&
    !trimmed.includes(" ") &&
    !trimmed.includes("!")
  );
};

export default function Progressbar({isloading, Status, progress, handlestartscan, target, settarget, scantype}: ProgressbarProps){
    const colors = tokens();
    const handleonclick = (target: string, scantype: scantypes) => {
        if(isValidTarget(target)){
            handlestartscan(target, scantype);
        }
        else{
            alert("Invalid target. Please enter a valid IP address or hostname.");
        }
    }
    return(
        <>
            <Card sx ={{
                gridColumn: {xs:'span 4', md: 'span 5', lg: "span 6"},
                color: colors.text[500]
                }}>
                    <Box display={'flex'} width={'100%'} flexDirection={'column'}>
                        <Box display={'flex'} flexDirection={'column'} flex={1}>
                                {isloading || Status === 'completed' ? (
                                    <Typography variant="h4" fontWeight="medium">
                                        Target: {target} - {scantype} | Status:{" "}
                                        <Box component="span" sx={{ color: Status === "running" ? "yellow" : Status === "completed" ? "lightgreen" : "OrangeRed" }}>
                                        {Status}
                                        </Box>
                                    </Typography>
                                    ):                                     
                                    <Typography variant="h4" fontWeight="medium">
                                        Start Scanning
                                    </Typography>}
                        </Box>
                        <Box>
                            {isloading || Status === 'completed' ? (
                                
                                <Scanprogress status={Status} progress={getProgress(progress)}/>) : 
                            <Box display={'flex'} gap={3}>
                                <Input
                                    placeholder="Enter target IP"
                                    value={target}
                                    onChange={(e)=> {
                                        settarget(e.target.value);
                                    }}
                                    sx={{
                                        flex: 1,
                                        color: "white",
                                        "& input::placeholder": {
                                            color: "white",
                                            opacity: 0.3,
                                        },
                                        "&:before": {
                                            borderBottom: "2px solid white",
                                            opacity: 0.8,
                                        },
                                        "&:hover:not(.Mui-disabled):before": {
                                            borderBottom: "2px solid white",
                                            opacity: 1,
                                        },
                                        "&:after": {
                                            borderBottom: "2px solid white",
                                        },
                                        "&.Mui-focused:after": {
                                            borderBottom: "2px solid white",
                                        },
                                    }}
                                />
                                <CustomizedMenus sx={{backgroundColor: 'lightgreen'}} startscan={handleonclick} target={target}/>
                            </Box>
                              }
                            
                        </Box>
                    </Box>
            </Card>
        </>  
    ); 
}