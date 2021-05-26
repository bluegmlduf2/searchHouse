from common import *

def insertMember(args):
    conn = Connection()
    if conn:
        try:
            reMsg = '会員登録しました。\nログインしてください。'# return Msg

            #회원등록
            sql='''INSERT INTO house.`member`
            (email,pass, regDate)
            VALUES("{email}", "{passWd}", CURRENT_TIMESTAMP)'''.format(
                email=args['email']
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
