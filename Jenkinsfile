// for this file to work, you need to install following plugins:
// ssh agent
// and add following credentials:
// digital_ocean = ssh

// for this file to work, you need to add environment variables DOCKER_PASSWORD and DOCKER_USERNAME
// manage jenkins -> configure system -> environment variables

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

	stage('test react app') {
		sh 'docker build -t zdjuric/react-test -f ./client/Dockerfile.dev ./client';
		sh 'docker run zdjuric/react-test npm run test';
	}

	stage('build images') {
		sh 'docker build -t zdjuric/complex-client ./client';
		sh 'docker build -t zdjuric/complex-nginx ./nginx';
		sh 'docker build -t zdjuric/complex-server ./server';
		sh 'docker build -t zdjuric/complex-worker ./worker';
	}

	stage('push images to docker hub') {
		sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin";
		sh "docker push zdjuric/complex-client";
		sh "docker push zdjuric/complex-nginx";
		sh "docker push zdjuric/complex-server";
		sh "docker push zdjuric/complex-worker";
	}

	stage('deploy') {
		sshagent (credentials: ['digital_ocean']) {
			sshagentCommand('rm -rf complex_docker_project');
			sshagentCommand('git clone https://github.com/231jk0/complex_docker_project.git');
			sshagentCommand('./complex_docker_project/deploy_script.sh');
		}
	}
}