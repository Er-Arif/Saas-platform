import uuid

from pydantic import BaseModel, EmailStr, Field


class ContactRequestCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    company_name: str | None = Field(default=None, max_length=255)
    message: str = Field(min_length=10, max_length=5000)


class DemoRequestCreate(BaseModel):
    product_id: uuid.UUID | None = None
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    company_name: str | None = Field(default=None, max_length=255)
    preferred_date: str | None = Field(default=None, max_length=64)
    notes: str | None = Field(default=None, max_length=5000)


class SupportTicketCreate(BaseModel):
    product_id: uuid.UUID | None = None
    subject: str = Field(min_length=4, max_length=255)
    category: str = Field(min_length=2, max_length=100)
    priority: str = Field(min_length=3, max_length=16)
    message: str = Field(min_length=10, max_length=5000)
