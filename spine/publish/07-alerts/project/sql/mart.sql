-- The risk mart: what the API and the risk team read, loaded from gold each
-- morning. Exposure as of 13 October 2026, USD millions.
CREATE SCHEMA mart;
CREATE TABLE mart.groups (
    group_id   text PRIMARY KEY,
    group_name text NOT NULL,
    limit_musd numeric(9, 2) NOT NULL
);
CREATE TABLE mart.exposure (
    group_id      text PRIMARY KEY REFERENCES mart.groups,
    business_date date NOT NULL,
    net_musd      numeric(9, 2) NOT NULL
);
CREATE TABLE mart.reservations (        -- headroom held for a deal in progress
    reservation_id text PRIMARY KEY,
    group_id       text NOT NULL REFERENCES mart.groups,
    amount_musd    numeric(9, 2) NOT NULL CHECK (amount_musd > 0)
);
CREATE VIEW mart.headroom AS
SELECT g.group_id, g.limit_musd, e.net_musd,
       coalesce(sum(r.amount_musd), 0) AS reserved_musd,
       g.limit_musd - e.net_musd
           - coalesce(sum(r.amount_musd), 0) AS headroom_musd
  FROM mart.groups g
  JOIN mart.exposure e USING (group_id)
  LEFT JOIN mart.reservations r USING (group_id)
 GROUP BY g.group_id, g.limit_musd, e.net_musd;

INSERT INTO mart.groups VALUES
    ('G-WW', 'Wide World Group', 10.00), ('G-FAB', 'Fabrikam Holdings', 8.00),
    ('G-CON', 'Contoso Shipping', 6.00), ('G-TAIL', 'Tailspin Traders', 4.00),
    ('G-NW', 'Northwind Group', 5.00);
INSERT INTO mart.exposure VALUES
    ('G-WW', '2026-10-13', 8.40), ('G-FAB', '2026-10-13', 3.70),
    ('G-CON', '2026-10-13', 1.30), ('G-TAIL', '2026-10-13', 3.30),
    ('G-NW', '2026-10-13', 1.85);
