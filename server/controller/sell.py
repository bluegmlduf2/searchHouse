from flask import Blueprint, jsonify,request,current_app
from werkzeug.utils import secure_filename
from common import *  # 공통
import random
from datetime import datetime
from PIL import Image#이미지사이즈변경 pip install image

sell_ab = Blueprint('sell_ab', __name__)

@sell_ab.route('/imageUploadTemp', methods=['POST'])
def imageUploadTemp():
    '''이미지업로드'''
    try:
        if request.method == 'POST':
            f = request.files['imageFile']
            
            if f.filename=='':
                raise UserError('ファイルアップロード失敗しました。')
            
            #파일명변경
            time=datetime.today().strftime("%Y%m%d%H%M%S")# YYYYmmddHHMMSS 형태의 시간 출력
            ranNum=str(random.randint(1,999999)).rjust(4,"0")#난수4자리,공백은0으로채움
            resize_image_fileNm=time+ranNum+".jpg" #파일명변경

            #리사이즈
            image = Image.open(f)
            resize_image = image.resize((286,180))#286,180사이즈변경
            
            #저장할 경로 + 파일명
            resize_image.save(current_app.root_path+'/temp/' + resize_image_fileNm)
    except UserError as e:
        return json.dumps({'status': False, 'message': e.msg}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify({"message": "システムエラー", }), 400
    else:
        return jsonify ({ "message": "イメージを登録しました。","fileName":resize_image_fileNm}), 200
