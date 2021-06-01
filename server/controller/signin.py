from flask import Blueprint,request,session,current_app,jsonify
from model import signin
from common import * #공통
import bcrypt#암호화

# 라우팅 기본경로 table을 가지는 블루프린터 객체를 생성
signin_ab = Blueprint('signin_ab', __name__)

# 애너테이션함수:클로저를이용하여해당함수실행전에실행됨
# 이 경우 /table/index 가 된다
@signin_ab.route('/login',methods=['POST'])
def login():
    '''로그인'''
    try:
        if request.method == 'POST':
            args=request.get_json()['data']     
            passFromView=args["pass"].encode('utf-8')
            passFromDB=signin.getPass(args)#[0]이메일존재여부,[1]비밀번호
            
            #이메일 존재여부
            if passFromDB[0] is False:
                raise UserError('存在しないIDです。')
            
            #암호일치 여부 checkpw(바이트코드,해시바이트코드) #바이트코드만 매개변수로 가능
            if bcrypt.checkpw(passFromView, passFromDB[1]["pass"].encode('utf-8')) is False:
                raise UserError('パスワードを確認してください。')

    except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify ({ "message": "システムエラー",}), 400
    else:
        return json.dumps((passFromDB[1]['id']))
