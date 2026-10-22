-- What happened in TradeBook on 13 October: a new deal, an amendment, and a
-- cancelled deal that its clean-up job deleted outright.
INSERT INTO trade.deals VALUES
    ('LC-2041', 'C-101', 'letter of credit', 2.00, '2026-10-13 14:05+00');
UPDATE trade.deals SET amount_musd = 1.50, updated_at = '2026-10-13 11:20+00'
    WHERE deal_id = 'LC-1995';
DELETE FROM trade.deals WHERE deal_id = 'LC-2007';
