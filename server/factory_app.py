'''
Flask설정
'''
from flask import Flask, render_template, request, redirect, url_for, Blueprint
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

    CORS(app,resources={r'*': {'origins': ['http://localhost:3000','http://34.82.122.40/']}})
    # API server ,View server 같은 도메인에서 사용할때 발생하는 에러 방지
    # Same Origin / Cross Origin Policy 에러처리 .. origin이란 웹이 각 리소스를 받아오는 곳의 url
    # http://localhost:3000 = react view서버의 요청을 허락한다

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
