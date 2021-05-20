'''
Flask설정
'''
from flask import Flask, render_template, request, redirect, url_for, Blueprint,session
import traceback
from controller import table 
from controller import order 
from controller import pay
from controller import resv
from controller import chart
from controller import signup
from flask_cors import CORS


dict_confmode = {
    'test': 'setting.TestMode',
    'dev': 'setting.DevMode'
}

# Application Factories (it can have instances of the application with different settings)
def create_app(config_mode="test"):
    # Flask실행파일을 읽음
    app = Flask(__name__)
    # Flask의 환경설정 파알을 읽음
    confmode = dict_confmode[config_mode]
    app.config.from_object(confmode)#매개변수:경로와 파일의 클래스명

    CORS(app,resources={r'*': {'origins': "*"}},supports_credentials=True)
    # API server ,View server 다른 도메인에서 사용할때 발생하는 에러 방지
    # console.log(location.origin) : 클라이언트의 오리진확인가능
    # origin이란 특정 페이지에 접근할 때 사용되는 URL의 Scheme(프로토콜), host(도메인), 포트를 말한다
    # 해당 url들(['http://127..])에 대해선 해당 path(r'*')의 cors체크를 하지않음 
    # http://localhost:3000 = react view서버의 요청을 허락한다 
    # get,post요청을 보내기 전 option(preflight)이라는 요청을 보내는데 이는 클라이언트의 origin(http://local..)을 보낸다. 
    # 이 origin을 서버에서 받고 서버는 access-controlr-allow-origin(http://local..)을 반환하는데 이 origin이 서로 같다면 같은 출처라 판단하고 요청을 허가한다. 
    # 여기서 cors위반이 되는 이유는 클라이언트에서 서버로 보낼땐 localhost:5000인데 access-cont..origin 으로 반환할땐 localhost:3000을 반환하기때문에 정책위반이 되어 브라우저에서 걸린다
    # supports_credentials :사용자가 인증된 요청을 할수있게함(쿠키,세션)

    #매개변수로 bluePrint객체를 받는다. 그러나 import해서 해당 컨트롤러에 blueprint객체를 가져와서 사용
    app.register_blueprint(table.table_ab, url_prefix='/table')
    app.register_blueprint(order.order_ab, url_prefix='/order')
    app.register_blueprint(pay.pay_ab, url_prefix='/pay')
    app.register_blueprint(resv.resv_ab, url_prefix='/resv')
    app.register_blueprint(chart.chart_ab, url_prefix='/chart')
    app.register_blueprint(signup.signup_ab, url_prefix='/signup-data')

    return app


# @app.errorhandler(404)
# def page_not_found(error):
#     return "페이지가 없습니다. URL를 확인 하세요", 404


# # flask run & python app.py
# # if __name__ == '__main__':
# app.run(debug=True)
