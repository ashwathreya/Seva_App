-- SEVA marketplace schema (PostgreSQL 15+)
-- Focus: customers + providers + bookings + trust + payments

create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text,
  password_hash text not null,
  role text not null check (role in ('customer','provider','admin')),
  created_at timestamptz not null default now()
);

create table if not exists providers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  bio text,
  profile_image text,
  rating numeric(3,2) not null default 0,
  total_jobs integer not null default 0,
  is_verified boolean not null default false,
  location_lat double precision,
  location_lng double precision,
  avg_response_minutes integer not null default 60,
  created_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  base_price numeric(10,2) not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists provider_services (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references providers(id) on delete cascade,
  service_id uuid not null references services(id) on delete cascade,
  price_override numeric(10,2),
  experience_years integer not null default 0,
  unique(provider_id, service_id)
);

create table if not exists availability (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references providers(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_available boolean not null default true,
  check (start_time < end_time)
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  provider_id uuid not null references providers(id) on delete restrict,
  service_id uuid not null references services(id) on delete restrict,
  status text not null check (status in ('pending','confirmed','completed','cancelled')),
  scheduled_at timestamptz not null,
  location_address text not null,
  location_lat double precision,
  location_lng double precision,
  price numeric(10,2) not null,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  sender_id uuid not null references users(id) on delete cascade,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references bookings(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  provider_id uuid not null references providers(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references bookings(id) on delete cascade,
  amount numeric(10,2) not null,
  status text not null check (status in ('pending','paid','refunded')),
  stripe_payment_id text unique,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_provider_services_service on provider_services(service_id);
create index if not exists idx_availability_provider_day on availability(provider_id, day_of_week);
create index if not exists idx_bookings_status_time on bookings(status, scheduled_at);
create index if not exists idx_messages_booking_time on messages(booking_id, created_at);
create index if not exists idx_notifications_user_read on notifications(user_id, is_read, created_at desc);
