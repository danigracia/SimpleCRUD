# Esqueleto de una aplicación web tipo CRUD mínima con NodeJS

# 0) BBDD encendida

	# Y que el servidor de bases de datos de mongo esté funcionando:
		sudo systemctl status mongod

	# Para poner en marcha:
		sudo systemctl start mongod


# 1) Para testear esta aplicación, es necesario que exista la bbdd 'videoJuegos':
	mongorestore -d videoJuegos ./bbdd_data/db_videoJuegos/
	

# 2) Recuerde que el nodejs requiere que hayan los paquetes instalados:
	npm install


# 3) Ejecutar
	./bin/www
	http://localhost:3000
