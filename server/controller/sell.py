from flask import Blueprint, jsonify,request
from common import *  # 공통

sell_ab = Blueprint('sell_ab', __name__)

@sell_ab.route('/imageUploadTemp', methods=['POST'])
def imageUploadTemp():
    '''이미지업로드'''
    try:
        if request.method == 'POST':
            print(1111)

    except UserError as e:
        return json.dumps({'status': False, 'message': e.msg}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "システムエラー", }), 400
    else:
        return json.dumps(reVal)

# @signin_ab.route('/checkToken', methods=['POST'])
# @jwt_required()
# def checkToken():
#     '''로그인토큰체크'''
#     try:
#         if request.method == 'POST':
#             current_user = get_jwt_identity()#토큰체크 후 앞서 발급한 토큰이 맞으면 아이디 반환
#     except Exception as e:
#         traceback.print_exc()
#         return jsonify({"message": "システムエラー", }), 400
#     else:
#         return json.dumps(current_user)
