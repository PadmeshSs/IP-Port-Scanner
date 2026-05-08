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

// history must not be hc
type History = {
  target: string,
  type: string,
  status: string
}

// results must not be hc
type results = {
    port: number,
    service: string,
    version: string,
    risk: 'High' | 'Medium' | 'Normal'
}

type log = {
    id: string;
    msg: string;
    time: string;
};

const rows_2: History[] = [
  {
    target: '192.168.1.1',
    type: 'Full Scan',
    status: 'Completed'
  },
  {
    target: '192.168.0.0.0724',
    type: 'Web Scan',
    status: 'Completed'
  },
  {
    target: 'example.com/web',
    type: 'Web Scan',
    status: 'Completed'
  },
  {
    target: '192.168.1.1',
    type: 'Quick Scan',
    status: 'Completed'
  },
];



type TableType = "history" | "results" | "log";

type Props =
  | { type: "history"; values: History[] }
  | { type: "results"; values: results[] }
  | { type: "log"; values: log[] };



export default function Tables(props: Props) {
  const colors = tokens();

  return (
    <TableContainer sx={{ 
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
                  color: (row.risk === 'High' ? 'OrangeRed' : row.risk === 'Medium' ? 'orange' : 'lightgreen' )+ ' !important',
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
                      backgroundColor: row.risk === 'High' ? 'OrangeRed ' : row.risk === 'Medium' ? 'orange' : 'lightgreen' ,
                  },
                  position: 'relative'
                }}>{row.risk}</TableCell>
              </TableRow>
            ))}

          {props.type === "log" &&
            props.values.map((row, i) => (
              <TableRow key={i}>
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