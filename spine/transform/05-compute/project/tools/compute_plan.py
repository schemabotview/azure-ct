"""The overnight job's compute on the Azure bill, a model with HYPOTHETICAL
prices. Each node is a Standard_D4ds_v5 VM (4 vCPUs) in the platform's own
subscription; the cluster policy puts workers on Spot, the driver on demand.
"""
VCPU, HOURS = 4, 2                       # per node; the run, 00:00-02:00
ON_DEMAND, SPOT = 0.20, 0.06             # USD per VM-hour (hypothetical)
QUOTA = 100                              # DDSv5 family vCPUs (assumed)

workers, driver = 16, 1
need = (workers + driver) * VCPU
print(f'vCPUs: {need} for the overnight job, quota {QUOTA}: '
      + ('fits' if need <= QUOTA else 'raise the quota first'))
print(f'by day: {18 * VCPU} for the intraday job and three engineers')

all_on_demand = (workers + driver) * HOURS * ON_DEMAND
spot_workers = workers * HOURS * SPOT + driver * HOURS * ON_DEMAND
print(f'VMs for one night, all on demand: {all_on_demand:5.2f} USD')
print(f'VMs for one night, workers Spot:  {spot_workers:5.2f} USD')
print('if Azure takes the Spot VMs back: the policy falls back to on demand')
