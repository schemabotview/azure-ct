import type { Section } from '../types'

export const whatANightCosts: Section = {
  id: 'what-a-night-costs',
  title: 'What a night costs',
  scene: 'night-cost',
  narration:
    "Databricks sends two bills for every node hour, and both are needed to know what a night costs. The first table on the right names them. The virtual machine, billed by Azure, at the hypothetical rate card's twenty cents an hour, or six cents on Spot. And D B Us, Databricks Units, billed for the software: a number of units per node hour for each machine size, here an assumed nought point seven five, at a hypothetical fifteen cents each. Disks and network are left out. The editor shows tools slash night cost dot py, which adds them up for the two jobs, and the terminal shows the answer. The overnight job runs sixteen workers and a driver for two hours: thirty four node hours. Its machines cost two dollars thirty two with Spot workers, its D B Us three dollars eighty two, so six dollars fourteen a run, and a hundred and eighty four thirty five over thirty nights. The intraday job runs two workers and a driver for ten hours: thirty node hours, all on demand. Its machines cost six dollars, its D B Us three thirty eight, nine thirty eight a run, two hundred and six twenty five over twenty two working days. The total is three hundred and ninety dollars sixty a month, hypothetically. Course one's ten dollars forty a day counted only the workers' machines. The list underneath is what the numbers say. The intraday job costs more than the night, because it runs ten hours. Spot cut the night's machines by two thirds. D B Us do not fall with Spot. And tags on every cluster let the bill be split by job. That completes Databricks' Azure side. Next, Course eleven serves the results.",
}
