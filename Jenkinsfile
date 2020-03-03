// for this file to work, you need to install following plugins:
// ssh agent
// and add following credentials:
// digital_ocean = ssh

def sshagentCommand(command) {
	// "ssh -o StrictHostKeyChecking=no -l <user_name> <ip_address_of_the_server_you_are_connecting_to> ${command}"
	sh "ssh -o StrictHostKeyChecking=no -l root 134.209.241.123 ${command}"
}

node {
	def commit_id;

	properties([
		pipelineTriggers([
			[$class: "GitHubPushTrigger"]
		])
	])

	stage('preparation') {
		checkout scm;

		sh "git rev-parse --short HEAD > .git/commit-id";
		commit_id = readFile('.git/commit-id').trim();
	}

	stage('test') {
		sh 'docker build -t zdjuric/docker-react -f Dockerfile.dev .';
		sh 'docker run zdjuric/docker-react npm run my-test';
	}

	stage('deploy') {
		sshagent (credentials: ['digital_ocean']) {
			sshagentCommand('./deploy_script.sh');
		}
	}
}