    export type logs = {
        time: string;
        message: string;
     }
    
    
    export type ScanData = {
        status: "running" | "completed" | "error";
        logs: logs[];
        scan_type: 'Quick' | 'Full' | 'Standard';
        nodes: Node[];
        summary: Summary;
        target: string;
        error_Details?: string;
    };

    export type Port = {
        port: number;
        service: string;
        version: string;
        status?: string;
        risk: "low" | "medium" | "high";
    };
    
    export type Summary = {
        hosts: number;
        open_ports: number;
        status: "running" | "completed" | "error";
        total_ports: number;
        time_taken: string;
    };

    export type Node = {
        ip: string;
        os: string;
        ports: Port[];
        vulnerabilities: string[];
    };
    
    export type Scanid = {
        scan_id: string;
    };

    export type scantypes = "Quick" | "Full" | "Standard";

    export type results = {
        port: number,
        service: string,
        version: string,
        risk: 'high' | 'medium' | 'low'
    }

    export type Hosts = {
        ip: string,
        ports: number,
        OS: string,
        risk: 'Warning' | 'Safe' | 'Danger'
    }

    export type History = {
        target: string,
        type: string,
        status: string
    }