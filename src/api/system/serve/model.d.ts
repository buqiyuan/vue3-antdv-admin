declare namespace API {
  export interface Runtime {
    os: string;
    arch: string;
    nodeVersion: string;
    npmVersion: string;
  }

  export interface CoresLoad {
    rawLoad: number;
    rawLoadIdle: number;
  }

  export interface Cpu {
    manufacturer: string;
    brand: string;
    physicalCores: number;
    model: string;
    speed: number;
    rawCurrentLoad: number;
    rawCurrentLoadIdle: number;
    coresLoad: CoresLoad[];
  }

  export interface Disk {
    size: number;
    used: number;
    available: number;
  }

  export interface Memory {
    total: number;
    available: number;
  }

  export interface SysServeStat {
    runtime: Runtime;
    cpu: Cpu;
    disk: Disk;
    memory: Memory;
  }
}
