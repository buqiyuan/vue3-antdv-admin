// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** 此处后端没有提供注释 GET /api/health/database */
export async function healthCheckDatabase(options?: RequestOptions) {
  return request<{
    status?: string;
    info?: Record<string, any>;
    error?: Record<string, any>;
    details?: Record<string, any>;
  }>('/api/health/database', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/health/disk */
export async function healthCheckDisk(options?: RequestOptions) {
  return request<{
    status?: string;
    info?: Record<string, any>;
    error?: Record<string, any>;
    details?: Record<string, any>;
  }>('/api/health/disk', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/health/memory-heap */
export async function healthCheckMemoryHeap(options?: RequestOptions) {
  return request<{
    status?: string;
    info?: Record<string, any>;
    error?: Record<string, any>;
    details?: Record<string, any>;
  }>('/api/health/memory-heap', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/health/memory-rss */
export async function healthCheckMemoryRss(options?: RequestOptions) {
  return request<{
    status?: string;
    info?: Record<string, any>;
    error?: Record<string, any>;
    details?: Record<string, any>;
  }>('/api/health/memory-rss', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/health/network */
export async function healthCheckNetwork(options?: RequestOptions) {
  return request<{
    status?: string;
    info?: Record<string, any>;
    error?: Record<string, any>;
    details?: Record<string, any>;
  }>('/api/health/network', {
    method: 'GET',
    ...(options || {}),
  });
}
