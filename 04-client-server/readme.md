# Arrancar el servidor de datos

```
cd server
python flask-server.py
```

# arranclar el servidor de contenidos estáticos

Llamando simplemente a http.server, levanta un servidor de contenidos estáticos ofreciendo los ficheros que están en la misma carpeta donde se ha ejecutado el comando.

Si además el fichero se llama index.html, no hace falta especificar el nombre lo coge por defecto

```
cd client
# para python 2
python -m SimpleHTTPServer 8000

# para python 3
python3 -m http.server 8000
```