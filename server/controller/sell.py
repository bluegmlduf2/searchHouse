from flask import Blueprint, jsonify,request,current_app
from werkzeug.utils import secure_filename
from common import *  # 공통
from model import sell
import random
from datetime import datetime
from PIL import Image#이미지사이즈변경 pip install image
import shutil
import base64
import os.path

sell_ab = Blueprint('sell_ab', __name__)

@sell_ab.route('/imageUploadTemp', methods=['POST'])
def imageUploadTemp():
    '''이미지업로드'''
    if request.method == 'POST':
        try:
            
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
            
            source=current_app.root_path+'/temp/'+resize_image_fileNm#임시파일저장경로
            # dest =current_app.root_path+"/saveImage/"+resize_image_fileNm#최종저장경로

            #저장할 경로 + 파일명
            resize_image.save(source)

            # 파일이동
            # savedImageFile=shutil.move(source,dest)
            
            #이미지->바이너리(base64)->utf-8문자열
            with open(source, "rb") as image_file:
                data = base64.b64encode(image_file.read())
        except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 400
        except Exception as e:
            traceback.print_exc()
            return jsonify({"message": "システムエラー", }), 400
        else:
            return jsonify ({ "message": "イメージを登録しました。","fileNm":resize_image_fileNm,"fileBase64":data.decode('utf-8')}), 200

@sell_ab.route('/insertRoom' ,methods=['PUT'])
def insertRoom():
    try:
        if request.method == 'PUT':
            args=request.get_json()['data']
            #파일이동
            for i in range(1,3):
                source=current_app.root_path+'/temp/'+args['fileNm'+str(i)]#임시파일저장경로
                dest =current_app.root_path+"/saveImage/"+args['fileNm'+str(i)]#최종저장경로
                savedImageFile=shutil.move(source,dest)# 파일이동
                args['fileNm'+str(i)]=savedImageFile

            '''방정보입력'''
            sell.insertRoom(args)

    except UserError as e:
        return json.dumps({'status': False, 'message': e.msg}), 400
    except FileNotFoundError:
        return jsonify ({ "message": "アップロードするファイルが存在しません。"}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify ({ "message": "システムエラー"}), 400
    else:
        return jsonify ({ "message": "お部屋情報を登録しました。"}), 200