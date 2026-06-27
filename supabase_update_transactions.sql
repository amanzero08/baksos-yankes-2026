-- 1. Create kartu_sahabat_payments table to store multiple transactions per card
CREATE TABLE IF NOT EXISTS kartu_sahabat_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kartu_sahabat_id UUID NOT NULL REFERENCES kartu_sahabat(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL DEFAULT 0,
  received_at DATE NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Migrate existing payments (if collected_amount > 0 and no payment yet exists)
INSERT INTO kartu_sahabat_payments (kartu_sahabat_id, amount, received_at, photo_url)
SELECT id, collected_amount, COALESCE(received_at, CURRENT_DATE), photo_url
FROM kartu_sahabat
WHERE collected_amount > 0 
  AND id NOT IN (SELECT DISTINCT kartu_sahabat_id FROM kartu_sahabat_payments);

-- 3. Enable RLS
ALTER TABLE kartu_sahabat_payments ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies
DROP POLICY IF EXISTS "Public can view kartu_sahabat_payments" ON kartu_sahabat_payments;
CREATE POLICY "Public can view kartu_sahabat_payments" ON kartu_sahabat_payments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin can manage kartu_sahabat_payments" ON kartu_sahabat_payments;
CREATE POLICY "Admin can manage kartu_sahabat_payments" ON kartu_sahabat_payments FOR ALL USING (true);

-- 5. Create Trigger function to automatically update collected_amount in kartu_sahabat
CREATE OR REPLACE FUNCTION update_kartu_sahabat_collected()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE kartu_sahabat
    SET collected_amount = COALESCE((
      SELECT SUM(amount) FROM kartu_sahabat_payments WHERE kartu_sahabat_id = OLD.kartu_sahabat_id
    ), 0)
    WHERE id = OLD.kartu_sahabat_id;
    RETURN OLD;
  ELSE
    UPDATE kartu_sahabat
    SET collected_amount = COALESCE((
      SELECT SUM(amount) FROM kartu_sahabat_payments WHERE kartu_sahabat_id = NEW.kartu_sahabat_id
    ), 0)
    WHERE id = NEW.kartu_sahabat_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_kartu_sahabat_collected ON kartu_sahabat_payments;
CREATE TRIGGER trigger_update_kartu_sahabat_collected
AFTER INSERT OR UPDATE OR DELETE ON kartu_sahabat_payments
FOR EACH ROW
EXECUTE FUNCTION update_kartu_sahabat_collected();

NOTIFY pgrst, 'reload schema';
