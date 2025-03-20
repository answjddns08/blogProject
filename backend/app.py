from flask import Flask, request, jsonify, g
import pymysql
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'/api/*': {'origins': ['https://notebook.o-r.kr', 'http://localhost:5173'], 'methods': ['GET', 'POST', 'DELETE', 'PUT']}})

# MySQL 연결을 매 요청마다 새로 만들기 위해, Flask의 g 객체를 사용
def get_db():
    if not hasattr(g, 'db'):
        g.db = pymysql.connect(
            host='localhost',
            user='flask_user',
            password='0808',
            database='blog_db',
            cursorclass=pymysql.cursors.DictCursor
        )
    return g.db

# 데이터베이스 연결 종료
@app.teardown_appcontext
def close_db(error):
    db = getattr(g, 'db', None)
    if db:
        db.close()

# 여러 포스트 가져오기
@app.route('/api/posts', methods=['GET'])
def get_posts():
    try:

        search = request.args.get('search')

        db = get_db()
        with db.cursor() as cursor:

            if search:
                cursor.execute("SELECT * FROM post_table WHERE title LIKE %s OR content LIKE %s", (f"%{search}%", f"%{search}%"))
            else:
                cursor.execute("SELECT * FROM post_table")
            
            posts = cursor.fetchall()

        if posts:
            return jsonify(posts)
        else:
            return jsonify({"message": "No posts found"}), 404
    except pymysql.MySQLError as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500

# 특정 포스트 가져오기
@app.route('/api/post/<int:id>', methods=['GET'])
def get_post(id):
    try:
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute("SELECT * FROM post_table WHERE id = %s", (id,))
            post = cursor.fetchone()

        if post:
            return jsonify(post)
        else:
            return jsonify({"message": "Post not found"}), 404
    except pymysql.MySQLError as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500

# 포스트 추가
@app.route('/api/post', methods=['POST'])
def add_post():
    data = request.get_json()

    try:
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute("INSERT INTO post_table (title, content, author, tag) VALUES (%s, %s, %s ,%s)", (data['title'], data['content'], data['author'], data['tag']))
            db.commit()
            return jsonify({'message': 'Post created successfully'}), 201
    except pymysql.MySQLError as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500

# 포스트 수정
@app.route('/api/post', methods=['PUT'])
def edit_post():
    data = request.get_json()

    try:
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute("UPDATE post_table SET title = %s, content = %s, tag = %s WHERE id = %s", (data['title'], data['content'], data['tag'], data['id']))
            db.commit()
        return jsonify({'message': 'Post updated successfully'})
    except pymysql.MySQLError as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500

# 포스트 제거
@app.route('/api/post/<int:id>', methods=['DELETE'])
def delete_post(id):
    try:
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute("DELETE FROM post_table WHERE id = %s", (id,))
            db.commit()
            return jsonify({'message': 'Post deleted successfully'})
    except pymysql.MySQLError as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500

# 로그인
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    try:
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute("SELECT * FROM user_table WHERE uid = %s AND upw = %s",(data['id'],data['password']))
            response = cursor.fetchone()
            
            if response: #유저가 존재하면
                return jsonify(response) # 상태 코드 200과 함께 유저 정보 보냄
            else: # 존재하지 않으면
                return jsonify({'error': 'User not found or Invalid credentials',}), 401
    except pymysql.MySQLError as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500

# 유저 정보 가져오기
@app.route('/api/user/<string:id>', methods=['GET'])
def get_user(id):
    try:
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute("SELECT * FROM user_table WHERE uid = %s", (id,))
            user = cursor.fetchone()

        if user:
            return jsonify(user)
        else:
            return jsonify({"message": "User not found"}), 404
    except pymysql.MySQLError as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500

# 회원가입
@app.route('/api/signUp', methods=['POST'])
def signUp():
    data = request.get_json()
    try:
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute("INSERT INTO user_table (uid, upw, name) VALUES (%s, %s, %s)", (data['id'], data['password'], data['name']))
            db.commit()
            return jsonify({'message': 'User created successfully'}), 201
    except pymysql.MySQLError as e:
        return jsonify({"message": f"Database error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)