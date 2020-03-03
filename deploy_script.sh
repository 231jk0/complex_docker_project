cd complex_docker_project;

chmod +x deploy_script;

docker-compose down;
docker-compose pull;
docker-compose up -d --build;