from flask import Blueprint,request,session,current_app
from model import signup
from email.mime.text import MIMEText#메일제목본문설정모듈
import smtplib#메일모듈
import random
import configparser#환경설정파일parser
from datetime import timedelta

# 라우팅 기본경로 table을 가지는 블루프린터 객체를 생성
signup_ab = Blueprint('signup_ab', __name__)

# 애너테이션함수:클로저를이용하여해당함수실행전에실행됨
# 이 경우 /table/index 가 된다
@signup_ab.route('/register',methods=['PUT'])
def register():
    '''회원등록'''
    if request.method == 'PUT':
        args=request.get_json()
        # print(session['emailKey'])
        # if args['emailKey']:
        #     print(True)
        # else:
        #     print(False)

        return 'ok'

@signup_ab.route('/sendMail' ,methods=['POST'])
def sendMail():
    '''회원가입확인메일'''
    if request.method == 'POST':
        #이메일환경설정파일읽어옴
        config = configparser.ConfigParser()
        config.read('./server/key.ini')
        #secret_key = config['DEFAULT']['EMAIL_APP_KEY']
        
        #이메일전송
        verNum=str(random.randint(1,999999)).rjust(6,"0")#난수6자리,공백은0으로채움
        # s = smtplib.SMTP('smtp.gmail.com', 587)#구글이메일세션연결,지메일587포트번호
        # s.starttls()#TLS 보안 시작
        # s.login('bluegmlduf2@gmail.com', secret_key)#IMAP사용설정필요
        # msg = MIMEText(f'認証コードです : {verNum}')
        # msg['Subject'] = 'BANGからの認証コードです。'
        # s.sendmail("bluegmlduf2@gmail.com", "bluegmlduf2@naver.com", msg.as_string())
        # s.quit()# 메일 세션 종료

        #인증번호 세션 저장
        session.permanent = True
        current_app.permanent_session_lifetime = timedelta(minutes=3)#세션유지 최대 시간 3분
        session['emailKey']=verNum

        return 'Sent'#나중에 성공 실패여부 보내야함

@signup_ab.route('/info' ,methods=['GET','POST', 'PUT', 'DELETE'])
def info():
    if request.method == 'POST':
        return signup.getTable()
