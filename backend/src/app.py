from flask import Flask, request,jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/PollMeUp'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.users
db2 = mongo.db.polls
db3 = mongo.db.res

#USERS

@app.route('/users', methods=['POST'])
def createUser():    
    id =db.insert({
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    })
    return jsonify(str(ObjectId(id)))
    

@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(users)

@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'email': user['email'],
        'password': user['password']
    })

@app.route('/userA/<email>', methods=['GET'])
def getUserA(email):
    user = db.find_one({'email': email})
    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'email': user['email'],
        'password': user['password']
    })

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'User deleted'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']   
    }})
    return jsonify({'msg': 'User updated'})

#POLLS

@app.route('/polls', methods=['POST'])
def createPoll():    
    id =db2.insert({
        'user_id': request.json['user_id'],
        'titulo': request.json['titulo'],
        'contenido': request.json['contenido'],
        'fechaInicio': request.json['fechaInicio'],
        'fechaFinal': request.json['fechaFinal']
    })
    return jsonify(str(ObjectId(id)))
    

@app.route('/polls', methods=['GET'])
def getPolls():
    polls = []
    for doc in db2.find():
        polls.append({
            '_id': str(ObjectId(doc['_id'])),
            'user_id': str(ObjectId(doc['user_id'])),
            'titulo': doc['titulo'],
            'contenido': doc['contenido'],
            'fechaInicio': str(doc['fechaInicio']),
            'fechaFinal': str(doc['fechaFinal'])
        })
    return jsonify(polls)

@app.route('/poll/<id>', methods=['GET'])
def getPoll(id):
    poll = db2.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(poll['_id'])),
        'user_id': str(ObjectId(poll['user_id'])),
        'titulo': poll['titulo'],
        'contenido': poll['contenido'],
        'fechaInicio': poll['fechaInicio'],
        'fechaFinal': poll['fechaFinal']
    })

@app.route('/pollA/<user_id>', methods=['GET'])
def getPollA(user_id):
    poll = db2.find({'user_id': user_id})
    return jsonify({
        '_id': str(ObjectId(poll['_id'])),
        'user_id': str(ObjectId(poll['user_id'])),
        'titulo': poll['titulo'],
        'contenido': poll['contenido'],
        'fechaInicio': poll['fechaInicio'],
        'fechaFinal': poll['fechaFinal']
    })

@app.route('/polls/<id>', methods=['DELETE'])
def deletePoll(id):
    db2.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'Poll deleted'})

@app.route('/polls/<id>', methods=['PUT'])
def updatePoll(id):
    db2.update_one({'_id': ObjectId(id)}, {'$set': {
        'titulo': request.json['titulo'],
        'contenido': request.json['contenido'],
        'fechaFinal': request.json['fechaFinal']  
    }})
    return jsonify({'msg': 'Poll updated'})

#RESPUESTAS

@app.route('/res', methods=['POST'])
def createRes():    
    id =db3.insert({
        'user_id': request.json['user_id'],
        'poll_id': request.json['poll_id'],
        'res': request.json['res'],
        'fechaRes': request.json['fechaRes']
    })
    return jsonify(str(ObjectId(id)))
    

@app.route('/res/<poll_id>', methods=['GET'])
def getRes(poll_id):
    ress = []
    for doc in db3.find( {'poll_id': poll_id}):
        ress.append({
            '_id': str(ObjectId(doc['_id'])),
            'user_id': request.json['user_id'],
            'poll_id': request.json['poll_id'],
            'res': request.json['res'],
            'fechaRes': request.json['fechaRes']
        })
    return jsonify(ress)

if __name__ == '__main__':
    app.run(debug=True)
    