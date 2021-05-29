from common import *

def checkMember(args):
    conn = Connection()
    if conn:
        try:
            #등록이력체크
            sql='''SELECT COUNT(*) AS CNT
            FROM house.`member`
            WHERE id="{id}"
            OR email="{email}"'''.format(
                id=args['id']
                ,email=args['email']
            )

            data = conn.executeAll(sql)
            #1건이상 있을 경우
            if data[0]['CNT']>0:
                return False
            
        except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 200
        except Exception as e:
            traceback.print_exc()
            conn.rollback()
            return json.dumps({'message': '관리자에게 문의해주세요.'}), 400
        else:
            conn.commit()
            return True
        finally:
            conn.close()


def insertMember(args):
    conn = Connection()
    if conn:
        try:
            reMsg = '会員登録しました。\nログインしてください。'# return Msg

            #회원등록
            sql='''INSERT INTO house.`member`
            (id,email,pass, regDate)
            VALUES("{id}","{email}", "{passWd}", CURRENT_TIMESTAMP)'''.format(
                id=args['id']
                ,email=args['email']
                ,passWd=args['pass'])

            #raise UserError('사용자에러 테스트')
            data = conn.execute(sql)
        except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 200
        except Exception as e:
            traceback.print_exc()
            conn.rollback()
            return json.dumps({'message': '관리자에게 문의해주세요.'}), 400
        else:
            conn.commit()
            return json.dumps({'status': True, 'message': reMsg}), 200
        finally:
            conn.close()

