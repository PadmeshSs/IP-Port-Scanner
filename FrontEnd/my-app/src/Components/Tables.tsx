import {
  colors,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tokens } from '../Themes';
import { useEffect, useRef } from "react";
import type { results } from "../Scenes/Types/Scantype";

// history must not be hc
type History = {
  target: string,
  type: string,
  status: string
}

type Hosts = {
    ip: string,
    ports: number,
    OS: string,
    risk: 'Warning' | 'Safe' | 'Danger'
}

type log = {
    id: string;
    msg: string;
    time: string;
};

type Props =
  | { type: "history"; values: History[] }
  | { type: "results"; values: results[] }
  | { type: "log"; values: log[] }
  | { type: "Hosts"; values: Hosts[] }
  ;



export default function Tables(props: Props) {
  const colors = tokens();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    if(containerRef.current){
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [props.values]);
  return (
    <TableContainer ref={containerRef} sx={{ 
      backgroundColor: colors.box[500],
      "&::-webkit-scrollbar": {
        display: "none",
      }
    }}>
      <Table sx={{
        "& .MuiTableCell-root": {
      color: colors.text[500],
      },
      }} >
        <TableHead>
          <TableRow sx={{
            backgroundColor: colors.box[600]
          }}>
            {props.type === "history" && (
              <>
                <TableCell>Target</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
              </>
            )}
            {props.type === "Hosts" && (
              <>
                <TableCell>IP</TableCell>
                <TableCell>Ports</TableCell>
                <TableCell>OS</TableCell>
                <TableCell>Risk</TableCell>
              </>
            )}

            {props.type === "results" && (
              <>
                <TableCell>Port</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Risk</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.type === "history" &&
            props.values.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.target}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}

          {props.type === "results" &&
            props.values.map((row, i) => (
              <TableRow key={i} sx={{

              }}>
                <TableCell>{row.port}</TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell>{row.version}</TableCell>
                <TableCell sx={{
                  color: (row.risk === 'high' ? 'OrangeRed' : row.risk === 'medium' ? 'orange' : 'lightgreen' )+ ' !important',
                  fontWeight: 'bold',
                  "&::before": {
                      content: '""',
                      position: "absolute",
                      bottom: '50%',
                      left: 0,
                      transform: 'translateY(50%)',
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: row.risk === 'high' ? 'OrangeRed ' : row.risk === 'medium' ? 'orange' : 'lightgreen' ,
                  },
                  position: 'relative'
                }}>{row.risk}</TableCell>
              </TableRow>
            ))}
            {props.type === "Hosts" &&
            props.values.map((row, i) => (
              <TableRow key={i} sx={{

              }}>
                <TableCell>{row.ip}</TableCell>
                <TableCell>{row.ports}</TableCell>
                <TableCell>{row.OS}</TableCell>
                <TableCell sx={{
                  color: (row.risk === 'Danger' ? 'OrangeRed' : row.risk === 'Warning' ? 'orange' : 'lightgreen' )+ ' !important',
                  fontWeight: 'bold',
                  "&::before": {
                      content: '""',
                      position: "absolute",
                      bottom: '50%',
                      left: 0,
                      transform: 'translateY(50%)',
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: row.risk === 'Danger' ? 'OrangeRed ' : row.risk === 'Warning' ? 'orange' : 'lightgreen' ,
                  },
                  position: 'relative'
                }}>{row.risk}</TableCell>
              </TableRow>
            ))}

          {props.type === "log" &&
            props.values.map((row, i) => (
              <TableRow  key={i}>
                <TableCell sx={{ color: 'lightgreen !important' }}>{row.id}</TableCell>
                <TableCell>{row.msg}</TableCell>
                <TableCell>{row.time}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}