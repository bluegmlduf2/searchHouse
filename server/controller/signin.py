from flask import Blueprint,request,session,current_app,jsonify
from model import signin
import configparser#환경설정파일parser
from flask_bcrypt import Bcrypt#암호화

# 라우팅 기본경로 table을 가지는 블루프린터 객체를 생성
signin_ab = Blueprint('signin_ab', __name__)

# 애너테이션함수:클로저를이용하여해당함수실행전에실행됨
# 이 경우 /table/index 가 된다
@signin_ab.route('/login',methods=['PUT'])
def login():
    '''회원등록'''
    try:
        if request.method == 'PUT':
            args=request.get_json()['data']                
            #로그인부분
            paaCheckResult=bcrypt.check_password_hash(passHash, '디비에서가져온패스워드')
            #비밀번호가 일치할시 true
            if paaCheckResult:
                #암호코드세션제거
                session.pop('emailKey')
                pass
            else:
                return jsonify ({ "error": "パスワードを確認してください。",}), 400
    except Exception as e:
        return jsonify ({ "message": "システムエラー",}), 400

