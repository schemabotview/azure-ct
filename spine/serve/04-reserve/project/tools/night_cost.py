"""What the Databricks jobs cost, a model with HYPOTHETICAL prices. Two bills
for every node-hour: the VM, from Azure, and DBUs, Databricks' unit of
processing, for the software. Course 1's 10.40 a day counted worker VMs only.
"""
VM = {'on demand': 0.20, 'spot': 0.06}   # USD per D4ds_v5-hour (hypothetical)
DBU_PER_NODE_HOUR = 0.75                 # D4ds_v5 on jobs compute (assumed)
DBU_PRICE = 0.15                         # USD per DBU (hypothetical)

JOBS = {  # name: (workers, hours, workers on Spot?, runs a month)
    'overnight': (16, 2, True, 30),
    'intraday': (2, 10, False, 22),
}
total = 0
print(f"{'job':10}{'node-h':>7}{'VMs':>7}{'DBUs':>7}{'a run':>8}{'a month':>9}")
for name, (workers, hours, spot, runs) in JOBS.items():
    node_hours = (workers + 1) * hours            # and a driver
    vms = (workers * (VM['spot'] if spot else VM['on demand'])
           + VM['on demand']) * hours
    dbus = node_hours * DBU_PER_NODE_HOUR * DBU_PRICE
    total += (vms + dbus) * runs
    print(f'{name:10}{node_hours:7}{vms:7.2f}{dbus:7.2f}{vms + dbus:8.2f}'
          f'{(vms + dbus) * runs:9.2f}')
print(f"{'total':39}{total:9.2f} USD a month")
