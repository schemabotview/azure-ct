-- A stand-in for TradeBook, the bank's deal system (PostgreSQL 16): its
-- open trade-finance deals as they stood on 12 October 2026, in USD millions.
CREATE SCHEMA trade;
CREATE TABLE trade.deals (
    deal_id         text PRIMARY KEY,
    counterparty_id text NOT NULL,
    product         text NOT NULL,
    amount_musd     numeric(9, 2) NOT NULL CHECK (amount_musd > 0),
    updated_at      timestamptz NOT NULL
);
INSERT INTO trade.deals VALUES
    ('LC-1987', 'C-101', 'letter of credit', 3.00, '2026-09-14 10:12+00'),
    ('LC-1990', 'C-201', 'letter of credit', 4.00, '2026-09-15 09:40+00'),
    ('LC-1995', 'C-202', 'letter of credit', 1.20, '2026-09-21 15:05+00'),
    ('GT-2001', 'C-301', 'guarantee',        5.50, '2026-09-24 11:30+00'),
    ('LC-2003', 'C-102', 'letter of credit', 2.50, '2026-09-28 08:55+00'),
    ('LC-2007', 'C-302', 'letter of credit', 0.90, '2026-10-01 13:20+00'),
    ('TL-2010', 'C-401', 'trade loan',       3.30, '2026-10-05 16:45+00'),
    ('LC-2011', 'C-101', 'letter of credit', 2.00, '2026-10-06 10:00+00'),
    ('LC-2015', 'C-501', 'letter of credit', 2.20, '2026-10-08 14:10+00'),
    ('LC-2020', 'C-502', 'letter of credit', 1.80, '2026-10-12 09:25+00');
