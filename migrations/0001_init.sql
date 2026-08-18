CREATE TABLE IF NOT EXISTS checks (
  month_key TEXT NOT NULL,
  field_key TEXT NOT NULL,
  value INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (month_key, field_key)
);
