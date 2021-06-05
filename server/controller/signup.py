from flask import Blueprint,request,session,current_app,jsonify
from model import signup
from common import * #공통
import random
import smtplib#메일모듈
from email.mime.text import MIMEText#메일제목본문설정모듈
from datetime import timedelta
import bcrypt#암호화

# 라우팅 기본경로 table을 가지는 블루프린터 객체를 생성
signup_ab = Blueprint('signup_ab', __name__)

# 애너테이션함수:클로저를이용하여해당함수실행전에실행됨
# 이 경우 /table/index 가 된다
@signup_ab.route('/register',methods=['PUT'])
def register():
    '''회원등록'''
    try:
        if request.method == 'PUT':
            args=request.get_json()['data']
            if args['auth']==session['emailKey']:
                #암호를 해시코드로 저장, 해시코드=hashpw(바이트코드,솔트) //매개변수 바이트코드만 가능 
                #encode(utf-8) // 문자열->utf-8바이트코드변환  decode(utf-8)//바이트코드->문자열
                args["pass"]=bcrypt.hashpw(args["pass"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

                #ID,EMAIL 중복체크
                if signup.checkMember(args):                
                    #멤버정보입력
                    result=signup.insertMember(args)

                    #세션제거
                    session.pop('emailKey')
                else:
                    return jsonify ({ "message": "すでに登録されたことがあります。",}), 400
                
                return result
            else:
                return jsonify ({ "message": "認証コードが一致しません。",}), 400
    except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify ({ "message": "システムエラー",}), 400

@signup_ab.route('/sendMail' ,methods=['POST'])
def sendMail():
    '''회원가입확인메일'''
    try:
        if request.method == 'POST':
            args=request.get_json()['data']

            #ID,EMAIL 중복체크
            if signup.checkMember(args):                

                #이메일환경설정파일읽어옴
                config = configparser.ConfigParser()
                config.read('{rootPath}/key.ini'.format(rootPath=current_app.root_path))
                secret_key = config['DEFAULT']['EMAIL_APP_KEY']
                
                #이메일전송
                verNum=str(random.randint(1,999999)).rjust(6,"0")#난수6자리,공백은0으로채움
                s = smtplib.SMTP('smtp.gmail.com', 587)#구글이메일세션연결,지메일587포트번호
                s.starttls()#TLS 보안 시작
                s.login('bluegmlduf2@gmail.com', secret_key)#IMAP사용설정필요
                msg = MIMEText(f'認証コードです : {verNum}')
                msg['Subject'] = 'BANGからの認証コードです。'
                s.sendmail("bluegmlduf2@gmail.com", args['email'], msg.as_string())
                s.quit()# 메일 세션 종료

                #인증번호 세션 저장
                session.permanent = True
                current_app.permanent_session_lifetime = timedelta(minutes=3)#세션유지 최대 시간 3분
                session['emailKey']=verNum
                print("SESSION_KEY:: "+session['emailKey'])

                return jsonify ({ "message": "認証コードを転送しました。",}), 200#나중에 성공 실패여부 보내야함
            else:
                return jsonify ({ "message": "すでに登録されたことがあります。",}), 400

    except Exception as e:
        traceback.print_exc()
        return jsonify ({ "message": "システムエラー",}), 400

@signup_ab.route('/info' ,methods=['GET','POST', 'PUT', 'DELETE'])
def info():
    if request.method == 'POST':
        #return "11"
        return signup.getTable()
