export const ENVIRONMENT: string = process.env.NODE_ENV || 'development';
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1');
export const IS_CLIENT: boolean = typeof window !== 'undefined';
export const ALCHEMY_KEY: string = process.env.NEXT_PUBLIC_ALCHEMY_KEY || '';
