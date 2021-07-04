from flask import Blueprint, request, session, current_app, jsonify
from model import main
from common import *  # 공통
import bcrypt  # 암호화
import base64

# 라우팅 기본경로 table을 가지는 블루프린터 객체를 생성
main_ab = Blueprint('main_ab', __name__)

@main_ab.route('/getRooms', methods=['POST'])
def getRooms():
    '''메인화면에 표시할 방정보 4개 가져오기'''
    try:
        if request.method == 'POST':
            data=main.getRooms()

            '''이미지를 base64로변환'''
            for i,e in enumerate(data):
                #이미지->바이너리(base64)->utf-8문자열
                src =current_app.root_path+"/saveImage/"+e['fileNm1']
                with open(src, "rb") as image_file:
                    #b64encode함수는 바이트코드를만든다. decode는 문자열을 만든다.
                    data[i]['fileNm1']="data:image/jpeg;base64, "+base64.b64encode(image_file.read()).decode('utf-8')

    except UserError as e:
        return json.dumps({'status': False, 'message': e.msg}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "システムエラー", }), 400
    else:
        return jsonify (data), 200

@main_ab.route('/getInputRooms', methods=['POST'])
def getInputRooms():
    '''메인화면에서 검색한 결과 가져오기'''
    try:
        if request.method == 'POST':
            args=request.get_json()
            data=main.getInputRooms(args)
    except UserError as e:
        return json.dumps({'status': False, 'message': e.msg}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "システムエラー", }), 400
    else:
        return jsonify (data), 200

