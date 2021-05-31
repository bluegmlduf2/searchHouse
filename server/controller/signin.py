from flask import Blueprint,request,session,current_app,jsonify
from model import signin
from common import * #공통
import configparser#환경설정파일parser
from flask_bcrypt import Bcrypt#암호화

# 라우팅 기본경로 table을 가지는 블루프린터 객체를 생성
signin_ab = Blueprint('signin_ab', __name__)

# 애너테이션함수:클로저를이용하여해당함수실행전에실행됨
# 이 경우 /table/index 가 된다
@signin_ab.route('/login',methods=['POST'])
def login():
    '''로그인'''
    try:
        if request.method == 'POST':
            #암호화설정파일읽어옴
            config = configparser.ConfigParser()
            config.read('{rootPath}/key.ini'.format(rootPath=current_app.root_path))
            bcrypt = Bcrypt(current_app)
            current_app.config['SECRET_KEY'] = config['DEFAULT']['BCRYPT_KEY']#세션키암호
            args=request.get_json()['data']     
        
            passFromDb=signin.getPass(args)#[0]이메일존재여부,[1]비밀번호
            
            #이메일 존재여부
            if passFromDb[0] is False:
                raise UserError('存在しないIDです。')

            hashPass = bcrypt.generate_password_hash(args["pass"]).decode('utf-8')
            #암호일치 여부
            if bcrypt.check_password_hash(hashPass,passFromDb[1]) is False:
                raise UserError('パスワードを確認してください。')

            print(11111111111)
            if True:
                pass
            else:
                return jsonify ({ "error": "パスワードを確認してください。",}), 400
    except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify ({ "message": "システムエラー",}), 400

