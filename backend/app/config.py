from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "sqlite:///./astradesk.db"
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"
    max_upload_mb: int = 5
    cors_origins: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
