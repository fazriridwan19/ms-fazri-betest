deploy-dev:
    docker pull fazriridwan/ms-fazri-betest:latest
	docker stop ms-fazri-betest || true
    docker rm ms-fazri-betest || true
    docker run -d --name ms-fazri-betest -p 8080:8080 --env-file /home/ursklap/config/ms-fazri-betest/.env fazriridwan/ms-fazri-betest:latest
