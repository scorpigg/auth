declare namespace NodeJS {
  export interface ProcessEnv {
    PORT:string
    API_KEY:string
    AUTH_DOMAIN:string
    DATABASE_URL:string
    PROJECT_ID:string
    STORAGE_BUCKET:string
    MESSAGING_SENDER_ID:string
    APP_ID:string
    JWT_ACCESS_SECRET:string
    JWT_REFRESH_SECRET:string
    SMTP_HOST:string
    SMTP_PORT:string
    SMTP_USER:string
    SMTP_PASSWORD:string
    API_URL:string
    CLIENT_URL:string
  }
}
