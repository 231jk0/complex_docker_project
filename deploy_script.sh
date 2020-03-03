cd complex_docker_project;

echo 'test';

docker-compose down;
docker-compose pull;
docker-compose up --build;