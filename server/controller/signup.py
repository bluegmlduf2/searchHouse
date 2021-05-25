import threading
from flask import Blueprint,request,session,current_app,jsonify
from model import signup
from email.mime.text import MIMEText#메일제목본문설정모듈
import smtplib#메일모듈
import random
import configparser#환경설정파일parser
from datetime import timedelta
from flask_bcrypt import Bcrypt#암호화

# 라우팅 기본경로 table을 가지는 블루프린터 객체를 생성
signup_ab = Blueprint('signup_ab', __name__)

# 애너테이션함수:클로저를이용하여해당함수실행전에실행됨
# 이 경우 /table/index 가 된다
@signup_ab.route('/register',methods=['PUT'])
def register():
    '''회원등록'''
    if request.method == 'PUT':
        args=request.get_json()['data']
        if args['auth']==session['emailKey']:
            #이메일환경설정파일읽어옴
            config = configparser.ConfigParser()
            config.read('./server/key.ini')
            bcrypt = Bcrypt(current_app)
            current_app.config['SECRET_KEY'] = config['DEFAULT']['BCRYPT_KEY']#세션키암호
            
            #암호를해시코드로변경
            passHash=bcrypt.generate_password_hash(args["pass"])
            session.pop('emailKey')
            pass
            
            
            #로그인부분.....................>
            #paaCheckResult=bcrypt.check_password_hash(passHash, '디비에서가져온패스워드')
            # #비밀번호가 일치할시 true
            # if paaCheckResult:
            #     #암호코드세션제거
            #     session.pop('emailKey')
            #     pass
            # else:
            #     return jsonify ({ "error": "パスワードを確認してください。",}), 403 
        else:
            return jsonify ({ "error": "認証コードが一致しません。",}), 403 

        return 'ok'

@signup_ab.route('/sendMail' ,methods=['POST'])
def sendMail():
    '''회원가입확인메일'''
    if request.method == 'POST':
        args=request.get_json()['data']

        #이메일환경설정파일읽어옴
        config = configparser.ConfigParser()
        config.read('./server/key.ini')
        secret_key = config['DEFAULT']['EMAIL_APP_KEY']
        
        #이메일전송
        verNum=str(random.randint(1,999999)).rjust(6,"0")#난수6자리,공백은0으로채움
        # s = smtplib.SMTP('smtp.gmail.com', 587)#구글이메일세션연결,지메일587포트번호
        # s.starttls()#TLS 보안 시작
        # s.login('bluegmlduf2@gmail.com', secret_key)#IMAP사용설정필요
        # msg = MIMEText(f'認証コードです : {verNum}')
        # msg['Subject'] = 'BANGからの認証コードです。'
        # s.sendmail("bluegmlduf2@gmail.com", args['email'], msg.as_string())
        # s.quit()# 메일 세션 종료

        #인증번호 세션 저장
        session.permanent = True
        current_app.permanent_session_lifetime = timedelta(minutes=3)#세션유지 최대 시간 3분
        session['emailKey']=verNum
        print(session['emailKey'])
        return 'Sent'#나중에 성공 실패여부 보내야함


@signup_ab.route('/info' ,methods=['GET','POST', 'PUT', 'DELETE'])
def info():
    if request.method == 'POST':
        #return "11"
        return signup.getTable()
