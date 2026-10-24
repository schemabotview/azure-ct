"""What the credit officer is told when a group goes over its limit."""
OFFICERS = {'G-WW': 'sam', 'G-FAB': 'sam', 'G-CON': 'sam',
            'G-TAIL': 'sam', 'G-NW': 'sam'}


def alert_for(breach):
    used = breach['net_musd'] / breach['limit_musd']
    deal = breach['deal']
    return {
        'officer': OFFICERS[breach['group_id']],
        'group_id': breach['group_id'],
        'deal_id': deal['deal_id'],
        'reservation': deal['reservation'],
        'text': (f"{breach['group_name']} is over its limit: net "
                 f"{breach['net_musd']:.2f} against {breach['limit_musd']:.2f}"
                 f" ({used:.0%}). {deal['deal_id']}, {deal['amount_musd']:.2f},"
                 f" booked {deal['booked_at'][11:16]} for "
                 f"{deal['counterparty']}. Approve the excess or reject the"
                 ' deal within 30 minutes.'),
    }
