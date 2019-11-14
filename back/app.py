import os
import requests
import http
from flask import Flask, request, jsonify, make_response

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

def mapping_function(data):
    '''
    Funcion que crea el objeto respuesta
    '''
    obj = {
            'name': data['local_nombre'],
            'address':data['local_direccion'],
            'telephone': data['local_telefono'],
            'position' :{
            'lat': data['local_lat'],
            'lng': data['local_lng']
            }
          }
    return obj

@app.route('/obtenerFarmaciasDeTurno', methods=['POST'])
def getFarmacias():
    '''
    Definicion del Endpoint
    Pendiente Generar un token para seguridad y manejo de otras posibles EXCEPCIONES
    '''
    try:
        payload = request.get_json()
        comunaId = (payload.get('idComuna'))
        nombreLocal = payload.get('nombreLocal')
        #Validaciones basicas
        if not comunaId:
            return make_response(jsonify(message='Bad Request'), 400)

        if not nombreLocal:
            return make_response(jsonify(message='Bad Request'), 400)
        
        '''
        Aqui obtengo los options del formulario como multipart
        url = "https://midastest.minsal.cl/farmacias/maps/index.php/utilidades/maps_obtener_comunas_por_regiones"
        comunasRegiones = requests.post(url,files={'reg_id':(None,'7')})
        comunasRegiones = comunasRegiones.text
        '''

        url = 'https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion?id_region=7'
        farmaciasDeTurno = requests.get(url).json()
        farmaciasFilterComunas = list(filter(lambda f: f['fk_comuna'] == str(comunaId), farmaciasDeTurno))
        farmaciasFilterNombre = list(filter(lambda f: f['local_nombre'] == nombreLocal, farmaciasFilterComunas))
        farmaciasMap = list(map(lambda p : mapping_function(p),farmaciasFilterNombre))
        #Utilizando los filter/map y funciones lambda agilizamos los procesos de filtro, por conceptos de orden y legibilidad prefiero utilizar por separado

        return jsonify(farmaciasMap), 200
    except: 
        return jsonify('nada'), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0')