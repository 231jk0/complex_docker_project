// for this file to work, you need to install following plugins:
// ssh agent
// EnvInject Plugin
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

	stage('test environment variables') {
		sh "echo ${environment_variable_1}";
	}

	stage('test react app') {
		// sh 'docker build -t zdjuric/react-test -f ./client/Dockerfile.dev ./client';
		// sh 'docker run zdjuric/react-test npm run test';
	}

	stage('test react app') {
		// sh 'docker build -t zdjuric/complex-client ./client';
		// sh 'docker build -t zdjuric/complex-nginx ./nginx';
		// sh 'docker build -t zdjuric/complex-server ./server';
		// sh 'docker build -t zdjuric/complex-worker ./worker';
		// sh 'docker run zdjuric/react-test npm run test';
	}

	stage('deploy') {
		/* sshagent (credentials: ['digital_ocean']) {
			sshagentCommand('./deploy_script.sh');
		} */
	}
}