import json, requests
from prettytable import PrettyTable

url = "https://api.github.com/repos/angular/angular.js?access_token="
resp = requests.get(url=url, params=[])
resp.json()

data = json.loads(resp.text);
size = 0
for i in data:
	if i == "size":
		size =data[i];
print(size)

resultTable = PrettyTable(['Full Name', 'Stars', 'Forks', "Pushed", "Branches"])
sortedResultTable = PrettyTable(['Full Name', 'Stars', 'Forks', "Pushed", "Branches"])
table = []

avgStarsFork = 0

class InterestingFork:
	def __init__(self):
		self.name = ""
		self.stargazers = 0
		self.forks = 0
		self.magic = 0
		self.date = 0
		self.size = 0
		self.branches = 0
ii = 1
while ii < 9:
	print(ii)
	url = "https://api.github.com/repos/angular/angular.js/forks?per_page=100&page=" + str(ii) + "&sort=stargazers&access_token="
	resp = requests.get(url=url, params=[])
	resp.json()

	data = json.loads(resp.text);
	ii += 1
	for i in data:
		fork = InterestingFork()
		for u in i:
			if u == "full_name":
				fork.name = i[u]
			if u == "stargazers_count":
				fork.stargazers = i[u]
			if u == "forks_count":
				fork.forks = i[u]
			if u == "pushed_at":
				fork.date = i[u]
			if u == "size":
				fork.size = i[u]
			if u == "branches_url":
				response = requests.get(url=i[u][:-9] + "?access_token=", params=[])
				response.json()
				d = json.loads(response.text);
				fork.branches = len(d)
		avgStarsFork += fork.stargazers
		avgStarsFork += fork.forks
		fork.magic = fork.stargazers + fork.forks
		table.append(fork)

table.sort(key=lambda InterestingFork: InterestingFork.date, reverse=True)
for x in table:
	resultTable.add_row([x.name, x.stargazers, x.forks, x.date, x.branches])
print(resultTable)
	#print('{} \t\t\t {} \t\t {}'.format(x.name, x.stargazers, x.forks))




finalList = []
print("Average Fork+Star Sum ")
for item in table:
	sumForkStar = item.stargazers + item.forks
	if item.magic >= 1 and item.branches > 15 :
		finalList.append(item)

print("New List Stars+Fork > ")
for y in finalList:
	sortedResultTable.add_row([y.name, y.stargazers, y.forks, y.date, y.branches])
print(sortedResultTable)
	#print('{} \t\t\t {} \t\t {}'.format(y.name, y.stargazers, y.forks))
