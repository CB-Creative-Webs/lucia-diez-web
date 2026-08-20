CREATE TABLE IF NOT EXISTS purchases (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  gateway TEXT NOT NULL CHECK (gateway IN ('mercadopago', 'paypal')),
  currency TEXT NOT NULL CHECK (currency IN ('ARS', 'USD')),
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'pending', 'approved', 'delivered', 'rejected', 'cancelled', 'refunded')),
  gateway_order_id TEXT UNIQUE,
  gateway_payment_id TEXT UNIQUE,
  download_token_hash TEXT UNIQUE,
  download_expires_at TEXT,
  download_count INTEGER NOT NULL DEFAULT 0,
  delivered_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(customer_email);
CREATE INDEX IF NOT EXISTS idx_purchases_gateway_order ON purchases(gateway_order_id);
CREATE INDEX IF NOT EXISTS idx_purchases_download_token ON purchases(download_token_hash);

CREATE TABLE IF NOT EXISTS payment_events (
  id TEXT PRIMARY KEY,
  gateway TEXT NOT NULL,
  event_type TEXT NOT NULL,
  gateway_event_id TEXT,
  purchase_id TEXT,
  received_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (purchase_id) REFERENCES purchases(id)
);
